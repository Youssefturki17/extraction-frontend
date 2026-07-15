export function Table({ headers, children, className = '' }) {
  return (
    <div className={`overflow-x-auto rounded-xl border border-gray-100 ${className}`}>
      <table className="w-full border-collapse">
        <thead>
          <tr>
            {headers.map((h, i) => (
              <th key={i} className="table-th whitespace-nowrap">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  )
}

export function Tr({ children, onClick }) {
  return (
    <tr onClick={onClick} className="table-row">
      {children}
    </tr>
  )
}

export function Td({ children, className = '' }) {
  return <td className={`table-td ${className}`}>{children}</td>
}
