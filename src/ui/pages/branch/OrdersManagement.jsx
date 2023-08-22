import React, { useState, useContext, useEffect } from 'react';
import { OrdersTable, Button, CreateOrder } from '../../components/index';
import SessionContext from '../../../lib/SessionContext';
import { branchOrdersHeadersAndRows } from '../../../lib/formatData'
import { filterByBranchId } from '../../../lib/useFilter'

import PlusIcon from '@heroicons/react/24/outline/PlusIcon'

const ProductManagement = () => {
    const { orders, branch, branchesProducts } = useContext(SessionContext);
    const [headers, setHeaders] = useState([]);
    const [rows, setRows] = useState([]);
    const [createOrder, setCreateOrder] = useState(null);

    useEffect(() => {
        const filteredOrders = filterByBranchId(orders, branch.id);
        const data = filteredOrders;

        const { headers, rows } = branchOrdersHeadersAndRows(data, branchesProducts);
        setHeaders(headers);
        setRows(rows);
    }, [orders, branch, branchesProducts]);

    const handleCreateOrder = () => {
        setCreateOrder(true)
    };

    const handleCreatedOrder = (editedData) => {
        console.log(editedData)
    };

    return (
        <div className="p-4">
            <div className="flex justify-end mb-4 relative">
                <Button onClick={handleCreateOrder} ariaLabel="Create Order">
                    <PlusIcon className="w-6 h-6" />
                </Button>
            </div>
            <OrdersTable headers={headers} rows={rows} onViewDetails={false} />
            {createOrder && (
                <CreateOrder onClose={() => setCreateOrder(null)} onSave={handleCreatedOrder} branchId={branch.id} branchName={branch.nombre} products={branchesProducts} />
            )}
        </div>
    );
};

export default ProductManagement;