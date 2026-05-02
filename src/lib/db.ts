import mysql from "mysql2/promise";

declare global {
  // allow storing the pool on global to avoid creating multiple pools in dev HMR
  // eslint-disable-next-line no-var
  var __mysqlPool: mysql.Pool | undefined;
}

const createPool = () =>
  mysql.createPool({
    host: process.env.DB_HOST || "127.0.0.1",
    port: parseInt(process.env.DB_PORT || "3306"),
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "mydb",
    waitForConnections: true,
    // be conservative in dev to avoid exhausting DB connections
    connectionLimit: parseInt(process.env.DB_CONN_LIMIT || "1"),
    queueLimit: 0,
  });

const pool: mysql.Pool = global.__mysqlPool || createPool();
if (!global.__mysqlPool) global.__mysqlPool = pool;

export async function query(sql: string, values?: any[]) {
  // retry on transient "Too many connections" errors, but serialize queries
  const maxRetries = 5;
  let attempt = 0;

  // Simple global queue to serialize queries and avoid many simultaneous socket attempts.
  if (!(global as any).__dbQueue) {
    (global as any).__dbQueue = { queue: [] as Function[], running: false };
  }

  const enqueue = (job: () => Promise<void>) => {
    (global as any).__dbQueue.queue.push(job);
    if (!(global as any).__dbQueue.running) processQueue();
  };

  const processQueue = async () => {
    (global as any).__dbQueue.running = true;
    while ((global as any).__dbQueue.queue.length) {
      const job = (global as any).__dbQueue.queue.shift();
      try {
        await job();
      } catch (e) {
        // job handles rejection via promise; swallow here to continue queue
      }
    }
    (global as any).__dbQueue.running = false;
  };

  return await new Promise<any[]>((resolve, reject) => {
    const job = async () => {
      while (true) {
        try {
          const [rows] = (await pool.execute(sql, values || [])) as any;
          resolve(rows as any[]);
          return;
        } catch (err: any) {
          const message = err?.message || "";
          const code = err?.code || "";
          if (
            (code === "ER_CON_COUNT_ERROR" ||
              /too many connections/i.test(message)) &&
            attempt < maxRetries
          ) {
            attempt++;
            const backoff = 50 * attempt;
            await new Promise((r) => setTimeout(r, backoff));
            continue;
          }
          reject(err);
          return;
        }
      }
    };

    enqueue(job);
  });
}

export async function getConnection() {
  return await pool.getConnection();
}

export default pool;
