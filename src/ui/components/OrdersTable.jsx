import React from 'react';

const OrdersTable = ({ headers, rows }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-night-200">
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={index} className="py-2 px-4 border-b border-night-200 text-night-700 text-center font-semibold uppercase tracking-wider">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {headers.map((header, colIndex) => (
                <td key={colIndex} className="py-2 px-4 border-b border-night-200 capitalize text-center">
                  {row[header]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersTable;
