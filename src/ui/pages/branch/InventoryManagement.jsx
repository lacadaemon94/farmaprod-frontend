import React, { useState, useContext, useEffect } from 'react'
import { InventoryTable, Button } from '../../components/index';
import SessionContext from '../../../lib/SessionContext';
import { branchInventoryHeadersAndRows } from '../../../lib/formatData'
import { filterByTipoId } from '../../../lib/useFilter'

import FunnelIcon from '@heroicons/react/24/outline/FunnelIcon'
import ArrowsRightLeftIcon from '@heroicons/react/24/outline/ArrowsRightLeftIcon'
import BranchInventoryTransfer from '../../components/BranchInventoryTransfer';

const InventoryManagement = () => {
    const { branch, branchInventory, branchesProducts } = useContext(SessionContext);
    const [headers, setHeaders] = useState([]);
    const [rows, setRows] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const [selectedFilter, setSelectedFilter] = useState(null);
    const [transferToInventory, settransferToInventory] = useState(null);
    const [filteredByTipoProducts, setfilteredByTipoProducts] = useState(null);

    useEffect(() => {
        const products = filterByTipoId(selectedFilter, branchInventory, branchesProducts, branch);
        const { headers, rows } = branchInventoryHeadersAndRows(products);
        setHeaders(headers);
        setRows(rows);
        setfilteredByTipoProducts(products)
    }, [branch, branchInventory, branchesProducts, selectedFilter]);

    const handleFilterInventory = () => {
        setShowDropdown(!showDropdown);
    };

    const handleFilterSelect = (filterId) => {
        setSelectedFilter(filterId);
        setShowDropdown(false);
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
                {selectedFilter && (
                    <Button onClick={handleTransferAction} ariaLabel="Transfer Item" className="ml-2">
                        <ArrowsRightLeftIcon className="w-6 h-6" />
                    </Button>
                )}
                {showDropdown && (
                    <div className="absolute right-0 mt-12 w-48 bg-light border rounded shadow-lg">
                        <button onClick={() => handleFilterSelect(1)} className="block w-full text-left px-4 py-2 hover:bg-night-200">Bodega</button>
                        <button onClick={() => handleFilterSelect(2)} className="block w-full text-left px-4 py-2 hover:bg-night-200">Venta</button>
                        <button onClick={() => handleFilterSelect(3)} className="block w-full text-left px-4 py-2 hover:bg-night-200">Devolucion</button>
                        <button onClick={() => handleFilterSelect(null)} className="block w-full text-left px-4 py-2 hover:bg-night-200">Todo</button>
                    </div>
                )}
            </div>
            <InventoryTable headers={headers} rows={rows} />
            {transferToInventory && (
                <BranchInventoryTransfer onClose={() => settransferToInventory(null)} onSave={handleTransferedToInventory} inventory={filteredByTipoProducts} currentFilter={selectedFilter} branch={branch} />
            )}
        </div>
    )
}

export default InventoryManagement