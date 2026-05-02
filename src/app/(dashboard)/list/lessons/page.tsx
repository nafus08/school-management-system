import FormContainer from "@/components/FormContainer";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { query } from "@/lib/db";
import { ITEM_PER_PAGE } from "@/lib/settings";
import { Class, Lesson, Subject, Teacher } from "@/lib/db-types";
import Image from "next/image";
import { getSession } from "@/lib/auth";

type LessonList = {
  id: number;
  name: string;
  day: string;
  startTime: Date;
  endTime: Date;
  subjectId: number;
  classId: number;
  teacherId: string;
  subject: { name: string };
  class: { name: string };
  teacher: { name: string; surname: string };
};

const LessonListPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const session = await getSession();
  const role = session?.role;

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
    ...(role === "admin"
      ? [
          {
            header: "Actions",
            accessor: "action",
          },
        ]
      : []),
  ];

  const renderRow = (item: LessonList) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
    >
      <td className="flex items-center gap-4 p-4">{item.subject.name}</td>
      <td>{item.class.name}</td>
      <td className="hidden md:table-cell">
        {item.teacher.name + " " + item.teacher.surname}
      </td>
      <td>
        <div className="flex items-center gap-2">
          {role === "admin" && (
            <>
              <FormContainer table="lesson" type="update" data={item} />
              <FormContainer table="lesson" type="delete" id={item.id} />
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
    filters.push("(s.name LIKE ? OR t.name LIKE ?)");
    params.push(`%${queryParams.search}%`, `%${queryParams.search}%`);
  }

  const where = filters.length ? `WHERE ${filters.join(" AND ")}` : "";

  const dataRows: any[] = await query(
    `SELECT l.id, l.name, l.day, l.startTime, l.endTime, l.subjectId, l.classId, l.teacherId, s.name AS subjectName, c.name AS className, t.name AS teacherName, t.surname AS teacherSurname
      FROM Lesson l
      JOIN Subject s ON s.id = l.subjectId
      JOIN Class c ON c.id = l.classId
      JOIN Teacher t ON t.id = l.teacherId
      ${where}
      ORDER BY l.id
      LIMIT ?
      OFFSET ?`,
    [...params, ITEM_PER_PAGE, ITEM_PER_PAGE * (p - 1)],
  );

  const countRows: any[] = await query(
    `SELECT COUNT(*) AS count
      FROM Lesson l
      JOIN Subject s ON s.id = l.subjectId
      JOIN Teacher t ON t.id = l.teacherId
      ${where}`,
    params,
  );

  const data: LessonList[] = dataRows.map((row) => ({
    id: row.id,
    name: row.name,
    day: row.day,
    startTime: row.startTime,
    endTime: row.endTime,
    subjectId: row.subjectId,
    classId: row.classId,
    teacherId: row.teacherId,
    subject: { name: row.subjectName },
    class: { name: row.className },
    teacher: { name: row.teacherName, surname: row.teacherSurname },
  }));

  const count = countRows[0]?.count || 0;

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">All Lessons</h1>
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
            {role === "admin" && <FormContainer table="lesson" type="create" />}
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

export default LessonListPage;
