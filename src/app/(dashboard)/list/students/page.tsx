import FormContainer from "@/components/FormContainer";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";

import { ITEM_PER_PAGE } from "@/lib/settings";
import { Student } from "@/lib/db-types";
import Image from "next/image";
import Link from "next/link";

import { query } from "@/lib/db";
import { getSession } from "@/lib/auth";

type StudentList = Student & { className: string };

const StudentListPage = async ({
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
      header: "Student ID",
      accessor: "studentId",
      className: "hidden md:table-cell",
    },
    {
      header: "Grade",
      accessor: "grade",
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

  const renderRow = (item: StudentList) => (
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
          <p className="text-xs text-gray-500">{item.className}</p>
        </div>
      </td>
      <td className="hidden md:table-cell">{item.username}</td>
      <td className="hidden md:table-cell">{item.className[0]}</td>
      <td className="hidden md:table-cell">{item.phone}</td>
      <td className="hidden md:table-cell">{item.address}</td>
      <td>
        <div className="flex items-center gap-2">
          <Link href={`/list/students/${item.id}`}>
            <button
              aria-label="View student"
              title="View"
              className="w-7 h-7 flex items-center justify-center rounded-full bg-lamaSky"
            >
              <Image
                src="/view.png"
                alt="View student"
                width={16}
                height={16}
              />
            </button>
          </Link>
          {role === "admin" && (
            // <button className="w-7 h-7 flex items-center justify-center rounded-full bg-lamaPurple">
            //   <Image src="/delete.png" alt="" width={16} height={16} />
            // </button>
            <FormContainer table="student" type="delete" id={item.id} />
          )}
        </div>
      </td>
    </tr>
  );

  const { page, ...queryParams } = searchParams;

  const p = page ? parseInt(page) : 1;

  const filters: string[] = [];
  const params: any[] = [];

  if (queryParams.teacherId) {
    filters.push("l.teacherId = ?");
    params.push(queryParams.teacherId);
  }

  if (queryParams.search) {
    filters.push("s.name LIKE ?");
    params.push(`%${queryParams.search}%`);
  }

  const where = filters.length ? `WHERE ${filters.join(" AND ")}` : "";

  const dataRows: any[] = await query(
    `SELECT
        s.id,
        s.username,
      s.createdAt,
        s.name,
        s.surname,
        s.email,
        s.phone,
        s.address,
        s.img,
        s.bloodType,
        s.gender,
        s.birthday,
        s.gradeId,
        s.classId,
        s.parentId,
        c.name AS className
      FROM Student s
      LEFT JOIN Class c ON c.id = s.classId
      LEFT JOIN Lesson l ON l.classId = c.id
      ${where}
      GROUP BY s.id
      ORDER BY s.id
      LIMIT ?
      OFFSET ?`,
    [...params, ITEM_PER_PAGE, ITEM_PER_PAGE * (p - 1)],
  );

  const countRows: any[] = await query(
    `SELECT COUNT(DISTINCT s.id) AS count
      FROM Student s
      LEFT JOIN Class c ON c.id = s.classId
      LEFT JOIN Lesson l ON l.classId = c.id
      ${where}`,
    params,
  );

  const data: StudentList[] = dataRows.map((row) => ({
    id: row.id,
    username: row.username,
    createdAt: row.createdAt ? new Date(row.createdAt) : new Date(),
    name: row.name,
    surname: row.surname,
    email: row.email,
    phone: row.phone,
    address: row.address,
    img: row.img,
    bloodType: row.bloodType,
    gender: row.gender,
    birthday: row.birthday,
    gradeId: row.gradeId,
    classId: row.classId,
    parentId: row.parentId,
    className: row.className || "N/A",
  }));

  const count = countRows[0]?.count || 0;

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">All Students</h1>
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
              // <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              //   <Image src="/plus.png" alt="" width={14} height={14} />
              // </button>
              <FormContainer table="student" type="create" />
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

export default StudentListPage;
