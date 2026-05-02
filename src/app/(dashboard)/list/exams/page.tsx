import FormContainer from "@/components/FormContainer";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { query } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { ITEM_PER_PAGE } from "@/lib/settings";
import Image from "next/image";

type ExamList = {
  id: number;
  title: string;
  startTime: Date;
  endTime: Date;
  lessonId: number;
  subjectName: string;
  className: string;
  teacherName: string;
  teacherSurname: string;
};

const ExamListPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const session = await getSession();
  const role = session?.role || "student";
  const currentUserId = session?.id;

  const columns = [
    {
      header: "Subject Name",
      accessor: "name",
    },
    {
      header: "Class",
      accessor: "class",
    },
    {
      header: "Teacher",
      accessor: "teacher",
      className: "hidden md:table-cell",
    },
    {
      header: "Date",
      accessor: "date",
      className: "hidden md:table-cell",
    },
    ...(role === "admin" || role === "teacher"
      ? [
          {
            header: "Actions",
            accessor: "action",
          },
        ]
      : []),
  ];

  const renderRow = (item: ExamList) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
    >
      <td className="flex items-center gap-4 p-4">{item.subjectName}</td>
      <td>{item.className}</td>
      <td className="hidden md:table-cell">
        {item.teacherName + " " + item.teacherSurname}
      </td>
      <td className="hidden md:table-cell">
        {new Intl.DateTimeFormat("en-US").format(item.startTime)}
      </td>
      <td>
        <div className="flex items-center gap-2">
          {(role === "admin" || role === "teacher") && (
            <>
              <FormContainer table="exam" type="update" data={item} />
              <FormContainer table="exam" type="delete" id={item.id} />
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

  if (queryParams.classId) {
    filters.push("l.classId = ?");
    params.push(parseInt(queryParams.classId));
  }

  if (queryParams.teacherId) {
    filters.push("l.teacherId = ?");
    params.push(queryParams.teacherId);
  }

  if (queryParams.search) {
    filters.push("s.name LIKE ?");
    params.push(`%${queryParams.search}%`);
  }

  if (role === "teacher" && currentUserId) {
    filters.push("l.teacherId = ?");
    params.push(currentUserId);
  }

  if (role === "student" && currentUserId) {
    filters.push("c.id IN (SELECT classId FROM Student WHERE id = ?)");
    params.push(currentUserId);
  }

  if (role === "parent" && currentUserId) {
    filters.push("c.id IN (SELECT classId FROM Student WHERE parentId = ?)");
    params.push(currentUserId);
  }

  const where = filters.length ? `WHERE ${filters.join(" AND ")}` : "";

  const dataRows: any[] = await query(
    `SELECT
        e.id,
        e.title,
        e.startTime,
        e.endTime,
        e.lessonId,
        s.name AS subjectName,
        c.name AS className,
        t.name AS teacherName,
        t.surname AS teacherSurname
      FROM Exam e
      JOIN Lesson l ON l.id = e.lessonId
      JOIN Subject s ON s.id = l.subjectId
      JOIN Class c ON c.id = l.classId
      JOIN Teacher t ON t.id = l.teacherId
      ${where}
      ORDER BY e.id
      LIMIT ?
      OFFSET ?`,
    [...params, ITEM_PER_PAGE, ITEM_PER_PAGE * (p - 1)],
  );

  const countRows: any[] = await query(
    `SELECT COUNT(*) AS count
      FROM Exam e
      JOIN Lesson l ON l.id = e.lessonId
      JOIN Subject s ON s.id = l.subjectId
      JOIN Class c ON c.id = l.classId
      ${where}`,
    params,
  );

  const data: ExamList[] = dataRows.map((row) => ({
    id: row.id,
    title: row.title,
    startTime: row.startTime,
    endTime: row.endTime,
    lessonId: row.lessonId,
    subjectName: row.subjectName,
    className: row.className,
    teacherName: row.teacherName,
    teacherSurname: row.teacherSurname,
  }));

  const count = countRows[0]?.count || 0;

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">All Exams</h1>
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
            {(role === "admin" || role === "teacher") && (
              <FormContainer table="exam" type="create" />
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

export default ExamListPage;
