import FormContainer from "@/components/FormContainer";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { query } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { ITEM_PER_PAGE } from "@/lib/settings";
import Image from "next/image";

type AnnouncementList = {
  id: number;
  title: string;
  description: string;
  date: Date;
  classId: number | null;
  className: string | null;
};

const AnnouncementListPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const session = await getSession();
  const role = session?.role || "student";
  const currentUserId = session?.id || "";

  const columns = [
    {
      header: "Title",
      accessor: "title",
    },
    {
      header: "Class",
      accessor: "class",
    },
    {
      header: "Date",
      accessor: "date",
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

  const renderRow = (item: AnnouncementList) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
    >
      <td className="flex items-center gap-4 p-4">{item.title}</td>
      <td>{item.className || "-"}</td>
      <td className="hidden md:table-cell">
        {new Intl.DateTimeFormat("en-US").format(item.date)}
      </td>
      <td>
        <div className="flex items-center gap-2">
          {role === "admin" && (
            <>
              <FormContainer table="announcement" type="update" data={item} />
              <FormContainer table="announcement" type="delete" id={item.id} />
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
    filters.push("a.title LIKE ?");
    params.push(`%${queryParams.search}%`);
  }

  // ROLE CONDITIONS
  if (role === "teacher" && currentUserId) {
    filters.push(
      "(a.classId IS NULL OR a.classId IN (SELECT DISTINCT classId FROM Lesson WHERE teacherId = ?))",
    );
    params.push(currentUserId);
  } else if (role === "student" && currentUserId) {
    filters.push(
      "(a.classId IS NULL OR a.classId IN (SELECT classId FROM Student WHERE id = ?))",
    );
    params.push(currentUserId);
  } else if (role === "parent" && currentUserId) {
    filters.push(
      "(a.classId IS NULL OR a.classId IN (SELECT classId FROM Student WHERE parentId = ?))",
    );
    params.push(currentUserId);
  }

  const where = filters.length ? `WHERE ${filters.join(" AND ")}` : "";

  const dataRows: any[] = await query(
    `SELECT
        a.id,
        a.title,
        a.description,
        a.date,
        a.classId,
        c.name AS className
      FROM Announcement a
      LEFT JOIN Class c ON c.id = a.classId
      ${where}
      ORDER BY a.date DESC
      LIMIT ?
      OFFSET ?`,
    [...params, ITEM_PER_PAGE, ITEM_PER_PAGE * (p - 1)],
  );

  const countRows: any[] = await query(
    `SELECT COUNT(*) AS count
      FROM Announcement a
      ${where}`,
    params,
  );

  const data: AnnouncementList[] = dataRows.map((row) => ({
    id: row.id,
    title: row.title,
    description: row.description,
    date: row.date,
    classId: row.classId,
    className: row.className,
  }));

  const count = countRows[0]?.count || 0;

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">
          All Announcements
        </h1>
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
              <FormContainer table="announcement" type="create" />
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

export default AnnouncementListPage;
