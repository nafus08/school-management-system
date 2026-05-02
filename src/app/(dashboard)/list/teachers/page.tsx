import FormContainer from "@/components/FormContainer";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { query } from "@/lib/db";
import { getSession } from "@/lib/auth";
import Image from "next/image";
import Link from "next/link";
import { ITEM_PER_PAGE } from "@/lib/settings";

type TeacherList = {
  id: string;
  username: string;
  name: string;
  surname: string;
  email: string | null;
  phone: string | null;
  address: string;
  img: string | null;
  subjects: string[];
  classes: string[];
};

const TeacherListPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const session = await getSession();
  const role = session?.role || "student";
  const columns = [
    {
      header: "Info",
      accessor: "info",
    },
    {
      header: "Teacher ID",
      accessor: "teacherId",
      className: "hidden md:table-cell",
    },
    {
      header: "Subjects",
      accessor: "subjects",
      className: "hidden md:table-cell",
    },
    {
      header: "Classes",
      accessor: "classes",
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

  const renderRow = (item: TeacherList) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
    >
      <td className="flex items-center gap-4 p-4">
        <Image
          src={item.img || "/noAvatar.png"}
          alt=""
          width={40}
          height={40}
          className="md:hidden xl:block w-10 h-10 rounded-full object-cover"
        />
        <div className="flex flex-col">
          <h3 className="font-semibold">{item.name}</h3>
          <p className="text-xs text-gray-500">{item?.email}</p>
        </div>
      </td>
      <td className="hidden md:table-cell">{item.username}</td>
      <td className="hidden md:table-cell">{item.subjects.join(",")}</td>
      <td className="hidden md:table-cell">{item.classes.join(",")}</td>
      <td className="hidden md:table-cell">{item.phone}</td>
      <td className="hidden md:table-cell">{item.address}</td>
      <td>
        <div className="flex items-center gap-2">
          <Link href={`/list/teachers/${item.id}`}>
            <button
              aria-label="View teacher"
              title="View"
              className="w-7 h-7 flex items-center justify-center rounded-full bg-lamaSky"
            >
              <Image
                src="/view.png"
                alt="View teacher"
                width={16}
                height={16}
              />
            </button>
          </Link>
          {role === "admin" && (
            // <button className="w-7 h-7 flex items-center justify-center rounded-full bg-lamaPurple">
            //   <Image src="/delete.png" alt="" width={16} height={16} />
            // </button>
            <FormContainer table="teacher" type="delete" id={item.id} />
          )}
        </div>
      </td>
    </tr>
  );
  const { page, ...queryParams } = searchParams;

  const p = page ? parseInt(page) : 1;

  const filters: string[] = [];
  const params: any[] = [];

  if (queryParams.classId) {
    filters.push("l.classId = ?");
    params.push(parseInt(queryParams.classId));
  }

  if (queryParams.search) {
    filters.push("t.name LIKE ?");
    params.push(`%${queryParams.search}%`);
  }

  const where = filters.length ? `WHERE ${filters.join(" AND ")}` : "";

  const dataRows: any[] = await query(
    `SELECT
        t.id,
        t.username,
        t.name,
        t.surname,
        t.email,
        t.phone,
        t.address,
        t.img,
        COALESCE(GROUP_CONCAT(DISTINCT s.name ORDER BY s.name SEPARATOR ','), '') AS subjectNames,
        COALESCE(GROUP_CONCAT(DISTINCT c.name ORDER BY c.name SEPARATOR ','), '') AS classNames
      FROM Teacher t
      LEFT JOIN _SubjectToTeacher st ON st.B = t.id
      LEFT JOIN Subject s ON s.id = st.A
      LEFT JOIN Lesson l ON l.teacherId = t.id
      LEFT JOIN Class c ON c.id = l.classId
      ${where}
      GROUP BY t.id
      ORDER BY t.id
      LIMIT ?
      OFFSET ?`,
    [...params, ITEM_PER_PAGE, ITEM_PER_PAGE * (p - 1)],
  );

  const countRows: any[] = await query(
    `SELECT COUNT(DISTINCT t.id) AS count
      FROM Teacher t
      LEFT JOIN Lesson l ON l.teacherId = t.id
      ${where}`,
    params,
  );

  const data: TeacherList[] = dataRows.map((row) => ({
    id: row.id,
    username: row.username,
    name: row.name,
    surname: row.surname,
    email: row.email,
    phone: row.phone,
    address: row.address,
    img: row.img,
    subjects: row.subjectNames ? row.subjectNames.split(",") : [],
    classes: row.classNames ? row.classNames.split(",") : [],
  }));

  const count = countRows[0]?.count || 0;

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">All Teachers</h1>
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
            {role === "admin" && (
              <FormContainer table="teacher" type="create" />
            )}
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

export default TeacherListPage;
