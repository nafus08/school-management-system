import { getPrismaClient } from "./prisma";

type QueryRow = Record<string, any>;

const camelCaseResultKeys = [
  "createdAt",
  "bloodType",
  "parentId",
  "classId",
  "gradeId",
  "supervisorId",
  "startTime",
  "endTime",
  "subjectId",
  "teacherId",
  "startDate",
  "dueDate",
  "examId",
  "assignmentId",
  "studentId",
  "lessonId",
  "subjectNames",
  "classNames",
  "studentNames",
  "teacherNames",
  "teacherSurname",
  "examStartTime",
  "assignmentStartDate",
  "studentCount",
  "subjectCount",
  "classCount",
  "lessonCount",
];

const resultKeyNames = new Map(
  camelCaseResultKeys.map((key) => [key.toLowerCase(), key]),
);

function normalizeResultKeys(rows: QueryRow[]) {
  return rows.map((row) =>
    Object.fromEntries(
      Object.entries(row).map(([key, value]) => [
        resultKeyNames.get(key) || key,
        typeof value === "bigint" ? Number(value) : value,
      ]),
    ),
  );
}

export async function query(
  sql: string,
  values: unknown[] = [],
): Promise<QueryRow[]> {
  let parameterIndex = 0;
  const parameterizedSql = sql.replace(/\?/g, () => {
    parameterIndex += 1;
    return `$${parameterIndex}`;
  });
  const postgresSql = parameterizedSql.replace(/\bLIKE\b/gi, "ILIKE");
  const returnsRows =
    /^\s*(SELECT|WITH)\b/i.test(postgresSql) ||
    /\bRETURNING\b/i.test(postgresSql);

  if (returnsRows) {
    const rows = await getPrismaClient().$queryRawUnsafe<QueryRow[]>(
      postgresSql,
      ...values,
    );
    return normalizeResultKeys(rows);
  }

  await getPrismaClient().$executeRawUnsafe(postgresSql, ...values);
  return [];
}
