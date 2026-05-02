import FormContainer from "@/components/FormContainer";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { query } from "@/lib/db";
import { ITEM_PER_PAGE } from "@/lib/settings";
import Image from "next/image";
import { getSession } from "@/lib/auth";

type ResultList = {
  id: number;
  title: string;
  studentName: string;
  studentSurname: string;
  studentId: string;
  teacherName: string;
  teacherSurname: string;
  score: number;
  className: string;
  startTime: Date;
  examId: number | null;
  assignmentId: number | null;
};

const ResultListPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const session = await getSession();
  const role = session?.role;
  const currentUserId = session?.id;

  const columns = [
    {
      header: "Title",
      accessor: "title",
    },
    {
      header: "Student",
      accessor: "student",
    },
    {
      header: "Score",
      accessor: "score",
      className: "hidden md:table-cell",
    },
    {
      header: "Teacher",
      accessor: "teacher",
      className: "hidden md:table-cell",
    },
    {
      header: "Class",
      accessor: "class",
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

  const renderRow = (item: ResultList) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
    >
      <td className="flex items-center gap-4 p-4">{item.title}</td>
      <td>{item.studentName + " " + item.studentSurname}</td>
      <td className="hidden md:table-cell">{item.score}</td>
      <td className="hidden md:table-cell">
        {item.teacherName + " " + item.teacherSurname}
      </td>
      <td className="hidden md:table-cell">{item.className}</td>
      <td className="hidden md:table-cell">
        {new Intl.DateTimeFormat("en-US").format(item.startTime)}
      </td>
      <td>
        <div className="flex items-center gap-2">
          {(role === "admin" || role === "teacher") && (
            <>
              <FormContainer table="result" type="update" data={item} />
              <FormContainer table="result" type="delete" id={item.id} />
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

  if (queryParams.studentId) {
    filters.push("r.studentId = ?");
    params.push(queryParams.studentId);
  }

  if (queryParams.search) {
    filters.push("(e.title LIKE ? OR s.name LIKE ?)");
    params.push(`%${queryParams.search}%`, `%${queryParams.search}%`);
  }

  if (role === "teacher" && currentUserId) {
    filters.push("l.teacherId = ?");
    params.push(currentUserId);
  }

  if (role === "student" && currentUserId) {
    filters.push("r.studentId = ?");
    params.push(currentUserId);
  }

  if (role === "parent" && currentUserId) {
    filters.push("s.parentId = ?");
    params.push(currentUserId);
  }

  const where = filters.length ? `WHERE ${filters.join(" AND ")}` : "";

  const dataRows: any[] = await query(
    `SELECT
        r.id,
        r.score,
        r.studentId,
        r.examId,
        r.assignmentId,
        s.name AS studentName,
        s.surname AS studentSurname,
        e.title AS examTitle,
        e.startTime AS examStartTime,
        a.title AS assignmentTitle,
        a.startDate AS assignmentStartDate,
        cl.name AS className,
        t.name AS teacherName,
        t.surname AS teacherSurname
      FROM Result r
      JOIN Student s ON s.id = r.studentId
      LEFT JOIN Exam e ON e.id = r.examId
      LEFT JOIN Assignment a ON a.id = r.assignmentId
      LEFT JOIN Lesson l ON l.id = COALESCE(e.lessonId, a.lessonId)
      LEFT JOIN Teacher t ON t.id = l.teacherId
      LEFT JOIN Class cl ON cl.id = l.classId
      ${where}
      ORDER BY r.id
      LIMIT ?
      OFFSET ?`,
    [...params, ITEM_PER_PAGE, ITEM_PER_PAGE * (p - 1)],
  );

  const countRows: any[] = await query(
    `SELECT COUNT(*) AS count
      FROM Result r
      JOIN Student s ON s.id = r.studentId
      LEFT JOIN Exam e ON e.id = r.examId
      LEFT JOIN Assignment a ON a.id = r.assignmentId
      LEFT JOIN Lesson l ON l.id = COALESCE(e.lessonId, a.lessonId)
      ${where}`,
    params,
  );

  const data: ResultList[] = dataRows.map((row) => ({
    id: row.id,
    title: row.examTitle || row.assignmentTitle,
    studentName: row.studentName,
    studentSurname: row.studentSurname,
    studentId: row.studentId,
    teacherName: row.teacherName,
    teacherSurname: row.teacherSurname,
    score: row.score,
    className: row.className,
    startTime: row.examStartTime || row.assignmentStartDate,
    examId: row.examId,
    assignmentId: row.assignmentId,
  }));

  const count = countRows[0]?.count || 0;

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">All Results</h1>
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
              <FormContainer table="result" type="create" />
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

export default ResultListPage;
