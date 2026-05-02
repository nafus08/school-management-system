const Table = ({
  columns,
  renderRow,
  data,
}: {
  columns: { header: string; accessor: string; className?: string }[];
  renderRow: (item: any) => React.ReactNode;
  data: any[];
}) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full mt-4">
        <thead>
          <tr className="text-left text-gray-500 text-sm">
            {columns.map((col) => (
              <th
                key={col.accessor}
                className={col.className || ""}
                scope="col"
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="p-4 text-center text-gray-400"
              >
                No records found.
              </td>
            </tr>
          ) : (
            data.map((item) => renderRow(item))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
