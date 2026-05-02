import FormContainer from "@/components/FormContainer";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { query } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { ITEM_PER_PAGE } from "@/lib/settings";
import Image from "next/image";

type ClassList = {
  id: number;
  name: string;
  capacity: number;
  gradeId: number;
  supervisorId: string | null;
  supervisorName: string;
  supervisorSurname: string;
};

const ClassListPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const session = await getSession();
  const role = session?.role || "student";

  const columns = [
    {
      header: "Class Name",
      accessor: "name",
    },
    {
      header: "Capacity",
      accessor: "capacity",
      className: "hidden md:table-cell",
    },
    {
      header: "Grade",
      accessor: "grade",
      className: "hidden md:table-cell",
    },
    {
      header: "Supervisor",
      accessor: "supervisor",
      className: "hidden md:table-cell",
    },
    ...(role === "admin"
      ? [
          {
            header: "Actions",
            accessor: "action",
          },
        ]
      : []),
  ];

  const renderRow = (item: ClassList) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
    >
      <td className="flex items-center gap-4 p-4">{item.name}</td>
      <td className="hidden md:table-cell">{item.capacity}</td>
      <td className="hidden md:table-cell">{item.name[0]}</td>
      <td className="hidden md:table-cell">
        {item.supervisorName + " " + item.supervisorSurname}
      </td>
      <td>
        <div className="flex items-center gap-2">
          {role === "admin" && (
            <>
              <FormContainer table="class" type="update" data={item} />
              <FormContainer table="class" type="delete" id={item.id} />
            </>
          )}
        </div>
      </td>
    </tr>
  );

  const { page, ...queryParams } = searchParams;

  const p = page ? parseInt(page) : 1;

  const filters: string[] = [];
  const params: any[] = [];

  if (queryParams.supervisorId) {
    filters.push("c.supervisorId = ?");
    params.push(queryParams.supervisorId);
  }

  if (queryParams.search) {
    filters.push("c.name LIKE ?");
    params.push(`%${queryParams.search}%`);
  }

  const where = filters.length ? `WHERE ${filters.join(" AND ")}` : "";

  const dataRows: any[] = await query(
    `SELECT
        c.id,
        c.name,
        c.capacity,
        c.gradeId,
        c.supervisorId,
        t.name AS supervisorName,
        t.surname AS supervisorSurname
      FROM Class c
      LEFT JOIN Teacher t ON t.id = c.supervisorId
      ${where}
      ORDER BY c.id
      LIMIT ?
      OFFSET ?`,
    [...params, ITEM_PER_PAGE, ITEM_PER_PAGE * (p - 1)],
  );

  const countRows: any[] = await query(
    `SELECT COUNT(*) AS count FROM Class c ${where}`,
    params,
  );

  const data: ClassList[] = dataRows.map((row) => ({
    id: row.id,
    name: row.name,
    capacity: row.capacity,
    gradeId: row.gradeId,
    supervisorId: row.supervisorId,
    supervisorName: row.supervisorName || "N/A",
    supervisorSurname: row.supervisorSurname || "",
  }));

  const count = countRows[0]?.count || 0;

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">All Classes</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button
              aria-label="Filter"
              title="Filter"
              className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow"
            >
              <Image src="/filter.png" alt="Filter" width={14} height={14} />
            </button>
            <button
              aria-label="Sort"
              title="Sort"
              className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow"
            >
              <Image src="/sort.png" alt="Sort" width={14} height={14} />
            </button>
            {role === "admin" && <FormContainer table="class" type="create" />}
          </div>
        </div>
      </div>
      {/* LIST */}
      <Table columns={columns} renderRow={renderRow} data={data} />
      {/* PAGINATION */}
      <Pagination page={p} count={count} />
    </div>
  );
};

export default ClassListPage;
