import FormContainer from "@/components/FormContainer";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { query } from "@/lib/db";
import { ITEM_PER_PAGE } from "@/lib/settings";
import Image from "next/image";
import { getSession } from "@/lib/auth";

type ParentList = {
  id: string;
  username: string;
  name: string;
  surname: string;
  email: string | null;
  phone: string | null;
  address: string;
  studentNames: string[];
};

const ParentListPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const session = await getSession();
  const role = session?.role;

  const columns = [
    {
      header: "Info",
      accessor: "info",
    },
    {
      header: "Student Names",
      accessor: "students",
      className: "hidden md:table-cell",
    },
    {
      header: "Phone",
      accessor: "phone",
      className: "hidden lg:table-cell",
    },
    {
      header: "Address",
      accessor: "address",
      className: "hidden lg:table-cell",
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

  const renderRow = (item: ParentList) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
    >
      <td className="flex items-center gap-4 p-4">
        <div className="flex flex-col">
          <h3 className="font-semibold">{item.name}</h3>
          <p className="text-xs text-gray-500">{item?.email}</p>
        </div>
      </td>
      <td className="hidden md:table-cell">{item.studentNames.join(",")}</td>
      <td className="hidden md:table-cell">{item.phone}</td>
      <td className="hidden md:table-cell">{item.address}</td>
      <td>
        <div className="flex items-center gap-2">
          {role === "admin" && (
            <>
              <FormContainer table="parent" type="update" data={item} />
              <FormContainer table="parent" type="delete" id={item.id} />
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

  if (queryParams.search) {
    filters.push("p.name LIKE ?");
    params.push(`%${queryParams.search}%`);
  }

  const where = filters.length ? `WHERE ${filters.join(" AND ")}` : "";

  const dataRows: any[] = await query(
    `SELECT
        p.id,
        p.username,
        p.name,
        p.surname,
        p.email,
        p.phone,
        p.address,
        COALESCE(GROUP_CONCAT(DISTINCT s.name ORDER BY s.name SEPARATOR ','), '') AS studentNames
      FROM Parent p
      LEFT JOIN Student s ON s.parentId = p.id
      ${where}
      GROUP BY p.id
      ORDER BY p.id
      LIMIT ?
      OFFSET ?`,
    [...params, ITEM_PER_PAGE, ITEM_PER_PAGE * (p - 1)],
  );

  const countRows: any[] = await query(
    `SELECT COUNT(DISTINCT p.id) AS count
      FROM Parent p
      ${where}`,
    params,
  );

  const data: ParentList[] = dataRows.map((row) => ({
    id: row.id,
    username: row.username,
    name: row.name,
    surname: row.surname,
    email: row.email,
    phone: row.phone,
    address: row.address,
    studentNames: row.studentNames ? row.studentNames.split(",") : [],
  }));

  const count = countRows[0]?.count || 0;

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">All Parents</h1>
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
            {role === "admin" && <FormContainer table="parent" type="create" />}
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

export default ParentListPage;
