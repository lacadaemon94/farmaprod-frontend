import React, { useState } from 'react';
import Button from '../components/Button';
import { parseISO, format } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';
import { transferInventory } from '../../api/drugstore';
import { mapTransferToInventoryFormData } from '../../lib/formatData'

const TransferToInventory = ({ inventory, currentFilter, onSave, onClose }) => {
    const [formData, setFormData] = useState({
        producto_id: "",
        origen_tipo_id: currentFilter,
        destino_tipo_id: "",
        cantidad: "",
        fecha: new Date().toISOString().split('T')[0], // Set to current date
        expiracion: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        let expirationDate = '';
        if (name === 'producto_id') {
            const selectedProduct = availableProducts.find(item => item.tipoId.id === currentFilter && item.productoId.id === value);
            if (selectedProduct && selectedProduct.expiracion) {
                expirationDate = format(utcToZonedTime(parseISO(selectedProduct.expiracion), 'UTC'), 'yyyy-MM-dd');
            }
        }
        setFormData(prevData => ({
            ...prevData,
            [name]: value,
            ...(name === 'producto_id' && { expiracion: expirationDate })
        }));
    };

    const handleTransfer = async () => {
        try {
            const product = mapTransferToInventoryFormData(formData);
            const responseData = await transferInventory(product);
            onSave(responseData);
            onClose()
        } catch (error) {
            console.error("Error while transfering product:", error);
        }
    };

    const availableProducts = inventory.filter(item => item.tipoId.id === currentFilter);

    return (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 max-h-[80%] overflow-y-auto">
            <div className="bg-light p-6 rounded-lg shadow-lg w-full max-w-lg">
                <div className="mb-4">
                    <label className="block text-night-700 mb-2">Producto</label>
                    <select name="producto_id" onChange={handleChange} className="border rounded w-full py-2 px-3">
                        <option value="">Seleccione un producto</option>
                        {availableProducts.map(product => (
                            <option key={`${product.productoId.id}+${product.expiracion}`} value={product.productoId.id}>
                                {product.productoId.nombre}
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
                    <select name="destino_tipo_id" onChange={handleChange} className="border rounded w-full py-2 px-3">
                        <option value="">Seleccione un destino</option>
                        {[1, 2, 3].filter(id => id !== currentFilter).map(id => (
                            <option key={id} value={id}>
                                {id === 1 ? "Bodega" : id === 2 ? "Abastecimiento" : "Venta"}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="mb-4">
                    <label className="block text-night-700 mb-2">Cantidad</label>
                    <input type="number" name="cantidad" onChange={handleChange} className="border rounded w-full py-2 px-3" max={
                        formData.producto_id
                            ? (availableProducts.find(item => item.tipoId.id === currentFilter && item.productoId.id === formData.producto_id) || {}).cantidad
                            : ''
                    } min={1} />
                </div>

                <div className="mb-4">
                    <label className="block text-night-700 mb-2">Expiración</label>
                    <input
                        type="date"
                        name="expiracion"
                        value={
                            formData.producto_id && (availableProducts.find(item => item.tipoId.id === currentFilter && item.productoId.id === formData.producto_id) || {}).expiracion
                                ? format(
                                    utcToZonedTime(
                                        parseISO((availableProducts.find(item => item.tipoId.id === currentFilter && item.productoId.id === formData.producto_id) || {}).expiracion),
                                        'UTC'
                                    ),
                                    'yyyy-MM-dd'
                                )
                                : ''
                        }
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

export default TransferToInventory;
