export default function DataTable({ columns, rows, onAction }) {
  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            {columns.map(c => <th key={c.key}>{c.label}</th>)}
            {onAction && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={row.id ?? i}>
              {columns.map(c => <td key={c.key}>{c.render ? c.render(row) : row[c.key]}</td>)}
              {onAction && <td>{onAction(row)}</td>}
            </tr>
          ))}
          {rows.length === 0 && (
            <tr>
              <td colSpan={columns.length + (onAction ? 1 : 0)} style={{ textAlign: "center", color: "var(--text-muted)", padding: 32 }}>
                No records found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
