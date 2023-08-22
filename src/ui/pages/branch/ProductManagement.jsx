import React, { useState, useContext, useEffect } from 'react';
import { ProductTable } from '../../components/index';
import SessionContext from '../../../lib/SessionContext';
import { branchProductHeadersAndRows } from '../../../lib/formatData'


const ProductManagement = () => {
    const { branchesProducts } = useContext(SessionContext);
    const [headers, setHeaders] = useState([]);
    const [rows, setRows] = useState([]);

    useEffect(() => {
        const data = branchesProducts;

        const { headers, rows } = branchProductHeadersAndRows(data);
        setHeaders(headers);
        setRows(rows);
    }, [branchesProducts]);

    return (
        <div className="p-4">
            <ProductTable headers={headers} rows={rows} onViewDetails={false} />
        </div>
    );
};

export default ProductManagement;