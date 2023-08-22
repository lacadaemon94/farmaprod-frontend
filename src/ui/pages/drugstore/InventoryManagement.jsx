import React, { useState, useContext, useEffect } from 'react';
import { InventoryTable, TransferToInventory, AddToBodega, Button } from '../../components/index';
import SessionContext from '../../../lib/SessionContext';
import { inventoryHeadersAndRows } from '../../../lib/formatData'

import FunnelIcon from '@heroicons/react/24/outline/FunnelIcon'
import ArrowsRightLeftIcon from '@heroicons/react/24/outline/ArrowsRightLeftIcon'
import PlusIcon from '@heroicons/react/24/outline/PlusIcon'

const InventoryManagement = () => {
    const { inventory } = useContext(SessionContext);
    const [headers, setHeaders] = useState([]);
    const [rows, setRows] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const [selectedFilter, setSelectedFilter] = useState(null);
    const [addToBodega, setAddToBodega] = useState(null);
    const [transferToInventory, settransferToInventory] = useState(null);

    useEffect(() => {
        const filteredInventory = selectedFilter
            ? inventory.filter(item => item.tipoId.id === selectedFilter)
            : inventory;

        const { headers, rows } = inventoryHeadersAndRows(filteredInventory);
        setHeaders(headers);
        setRows(rows);
    }, [inventory, selectedFilter]);

    const handleFilterInventory = () => {
        setShowDropdown(!showDropdown);
    };

    const handleFilterSelect = (filterId) => {
        setSelectedFilter(filterId);
        setShowDropdown(false);
    };

    const handleAddAction = () => {
        setAddToBodega(true)
    };
    const handleAddedToBodega = (editedData) => {
        const { headers, rows } = inventoryHeadersAndRows([editedData]);
        setHeaders(headers);
        setRows(rows);
    };

    const handleTransferAction = () => {
        settransferToInventory(true);
    };

    const handleTransferedToInventory = (editedData) => {
        console.log(editedData)
    };

    return (
        <div className="p-4">
            <div className="flex justify-end mb-4 relative">
                <Button onClick={handleFilterInventory} ariaLabel="Filter Inventory">
                    <FunnelIcon className="w-6 h-6" />
                </Button>
                {selectedFilter === 1 && (
                    <>
                        <Button onClick={handleAddAction} ariaLabel="Add Item" className="ml-2">
                            <PlusIcon className="w-6 h-6" />
                        </Button>
                        <Button onClick={handleTransferAction} ariaLabel="Transfer Item" className="ml-2">
                            <ArrowsRightLeftIcon className="w-6 h-6" />
                        </Button>
                    </>
                )}
                {(selectedFilter === 2 || selectedFilter === 3) && (
                    <Button onClick={handleTransferAction} ariaLabel="Transfer Item" className="ml-2">
                        <ArrowsRightLeftIcon className="w-6 h-6" />
                    </Button>
                )}
                {showDropdown && (
                    <div className="absolute right-0 mt-12 w-48 bg-light border rounded shadow-lg">
                        <button onClick={() => handleFilterSelect(1)} className="block w-full text-left px-4 py-2 hover:bg-night-200">Bodega</button>
                        <button onClick={() => handleFilterSelect(2)} className="block w-full text-left px-4 py-2 hover:bg-night-200">Abastecimiento</button>
                        <button onClick={() => handleFilterSelect(3)} className="block w-full text-left px-4 py-2 hover:bg-night-200">Venta</button>
                        <button onClick={() => handleFilterSelect(null)} className="block w-full text-left px-4 py-2 hover:bg-night-200">Todo</button>
                    </div>
                )}
            </div>
            <InventoryTable headers={headers} rows={rows} />
            {addToBodega && (
                <AddToBodega onClose={() => setAddToBodega(null)} onSave={handleAddedToBodega} />
            )}
            {transferToInventory && (
                <TransferToInventory onClose={() => settransferToInventory(null)} onSave={handleTransferedToInventory} inventory={inventory} currentFilter={selectedFilter} />
            )}
        </div>
    );
};

export default InventoryManagement;
