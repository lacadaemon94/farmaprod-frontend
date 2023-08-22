import React, { useState, useContext, useEffect } from 'react';
import { AdminOrders, OrderView, Button } from '../../components/index';
import SessionContext from '../../../lib/SessionContext';
import { branchOrdersHeadersAndRows } from '../../../lib/formatData'

import FunnelIcon from '@heroicons/react/24/outline/FunnelIcon'


const ProductManagement = () => {
    const { orders, branchesProducts, branches } = useContext(SessionContext);
    const [headers, setHeaders] = useState([]);
    const [rows, setRows] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null)
    const [showDropdown, setShowDropdown] = useState(false);
    const [selectedFilter, setSelectedFilter] = useState(null);

    useEffect(() => {
        const filteredOrders = selectedFilter
            ? orders.ordenes.filter(item => item.sucursal.id === selectedFilter)
            : orders.ordenes;

        const { headers, rows } = branchOrdersHeadersAndRows(filteredOrders, branchesProducts);
        setHeaders(headers);
        setRows(rows);
    }, [orders, branchesProducts, selectedFilter]);

    const handleOnViewDEtails = (order) => {
        const fullOrder = orders.ordenes.find(item => item.id === order.id)
        setSelectedOrder(fullOrder)
    }

    const handleFilterOrders = () => {
        setShowDropdown(!showDropdown);
    };

    const handleFilterSelect = (filterId) => {
        setSelectedFilter(filterId);
        setShowDropdown(false);
    };

    return (
        <div className="p-4">
            <div className="flex justify-end mb-4 relative">
                <Button onClick={handleFilterOrders} ariaLabel="Filter Inventory">
                    <FunnelIcon className="w-6 h-6" />
                </Button>
                {showDropdown && (
                    <div className="absolute right-0 mt-12 w-48 bg-light border rounded shadow-lg">
                        {
                            branches.map((branch, index) => (
                                <button key={index} onClick={() => handleFilterSelect(branch.id)} className="block w-full text-left px-4 py-2 hover:bg-night-200">{branch.nombre}</button>
                            ))
                        }
                    </div>
                )}
            </div>
            <AdminOrders headers={headers} rows={rows} onViewDetails={handleOnViewDEtails} />
            {selectedOrder && (
                <OrderView selectedOrder={selectedOrder} branchesProducts={branchesProducts} onClose={() => setSelectedOrder(null)} />
            )}
        </div>
    );
};

export default ProductManagement;