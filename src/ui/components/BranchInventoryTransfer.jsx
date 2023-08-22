import React, { useState } from 'react';
import { Button } from '../components/index';
import { transferInventory } from '../../api/branch';
import { mapTransferToBranchInventoryFormData } from '../../lib/formatData'

const BranchInventoryTransfer = ({ inventory, currentFilter, onSave, onClose, branch }) => {
    const [formData, setFormData] = useState({
        sucursal_id: branch.id,
        producto_id: "",
        inventario_origen: currentFilter,
        inventario_destino: "",
        cantidad: "",
        fechaRealizada: new Date().toISOString().split('T')[0], // Set to current date
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleTransfer = async () => {
        try {
            const product = mapTransferToBranchInventoryFormData(formData);
            const responseData = await transferInventory(product);
            onSave(responseData);
            onClose()
        } catch (error) {
            console.error("Error while transfering product:", error);
        }
    };

    const getMaxQuantity = () => {
        const selectedProductId = parseInt(formData.producto_id, 10);
        const selectedProduct = inventory.find(product => product.producto_id === selectedProductId);
        return selectedProduct ? selectedProduct.cantidad : '';
    };

    return (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 max-h-[80%] overflow-y-auto">
            <div className="bg-light p-6 rounded-lg shadow-lg w-full max-w-lg">
                <div className="mb-4">
                    <label className="block text-night-700 mb-2">Sucursal</label>
                    <input type="text" value={branch ? branch.nombre : null} disabled className="border rounded w-full py-2 px-3" />
                </div>

                <div className="mb-4">
                    <label className="block text-night-700 mb-2">Producto</label>
                    <select name="producto_id" onChange={handleChange} className="border rounded w-full py-2 px-3">
                        <option value="">Seleccione un producto</option>
                        {inventory.map(product => (
                            <option key={`${branch.id}+${product.tipo}+${product.nombre}`} value={product.producto_id}>
                                {product.nombre}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="mb-4">
                    <label className="block text-night-700 mb-2">Origen</label>
                    <input type="text" value={currentFilter} disabled className="border rounded w-full py-2 px-3" />
                </div>

                <div className="mb-4">
                    <label className="block text-night-700 mb-2">Destino</label>
                    <select name="inventario_destino" onChange={handleChange} className="border rounded w-full py-2 px-3">
                        <option value="">Seleccione un destino</option>
                        {[1, 2, 3].filter(id => id !== currentFilter).map(id => (
                            <option key={id} value={id}>
                                {id === 1 ? "Bodega" : id === 2 ? "Venta" : "Devolucion"}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="mb-4">
                    <label className="block text-night-700 mb-2">Cantidad</label>
                    <input type="number" name="cantidad" onChange={handleChange} className="border rounded w-full py-2 px-3" max={getMaxQuantity()} min={1} />
                </div>

                <div className="mb-4">
                    <label className="block text-night-700 mb-2">Fecha</label>
                    <input
                        type="date"
                        name="expiracion"
                        value={new Date().toISOString().split('T')[0]}
                        className="border rounded w-full py-2 px-3"
                        disabled
                    />
                </div>

                <div className="flex justify-end gap-4 mt-4">
                    <Button className="mr-2" onClick={onClose}>
                        Cancelar
                    </Button>
                    <Button onClick={handleTransfer}>Transferir</Button>
                </div>
            </div>
        </div>
    );
};

export default BranchInventoryTransfer;
