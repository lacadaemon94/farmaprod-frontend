import React from 'react';
import Button from './Button';

const AdminOrders = ({ headers, rows, onViewDetails }) => {
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
                        <th className="py-2 px-4 border-b border-night-200 text-night-700 text-center font-semibold uppercase tracking-wider" style={{ display: onViewDetails !== false ? '' : 'none' }}>
                            Acciones
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {headers.map((header, colIndex) => (
                                <td key={colIndex} className="py-2 px-4 border-b border-night-200 text-center">
                                    {row[header]}
                                </td>
                            ))}
                            <td className="py-2 px-4 border-b border-night-200 text-center" style={{ display: onViewDetails !== false ? '' : 'none' }}>
                                <Button onClick={() => onViewDetails(row)}>Ver</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminOrders;
