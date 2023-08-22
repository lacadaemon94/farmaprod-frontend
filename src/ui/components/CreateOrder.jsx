import React, { useState } from 'react';
import { Button } from '../components/index';
import { mapCreateOrderFormData } from '../../lib/formatData'
import { createOrder } from '../../api/branch';

const CreateOrder = ({ branchId, branchName, products, onSave, onClose }) => {
    const [formData, setFormData] = useState({
        sucursal_id: branchId,
        producto_id: "",
        fechaRealizada: new Date().toISOString().split('T')[0], // Set to current date
        cantidad: 1,
        estado: "ingresado"
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSave = async () => {
        try {
            const order = mapCreateOrderFormData(formData)
            const responseData = await createOrder(order)
            onSave(responseData);
            onClose();
        } catch (error) {
            console.error("Error while saving order:", error);
        }
    };

    return (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 max-h-[80%] overflow-y-auto">
            <div className="bg-light p-6 rounded-lg shadow-lg w-full max-w-lg">
                <div className="mb-4">
                    <label className="block text-night-700 mb-2">Sucursal</label>
                    <input type="text" value={branchName} disabled className="border rounded w-full py-2 px-3" />
                </div>

                <div className="mb-4">
                    <label className="block text-night-700 mb-2">Seleccionar Producto</label>
                    <select name="producto_id" onChange={handleChange} className="border rounded w-full py-2 px-3">
                        <option value="">Seleccione un producto</option>
                        {products.map(product => (
                            <option key={product.id} value={product.id}>
                                {product.nombre}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="mb-4">
                    <label className="block text-night-700 mb-2">Fecha Realizada</label>
                    <input type="date" value={formData.fechaRealizada} disabled className="border rounded w-full py-2 px-3" />
                </div>

                <div className="mb-4">
                    <label className="block text-night-700 mb-2">Cantidad</label>
                    <input type="number" name="cantidad" min="1" onChange={handleChange} className="border rounded w-full py-2 px-3" />
                </div>

                <div className="flex justify-end gap-4 mt-4">
                    <Button className="mr-2" onClick={onClose}>
                        Cancelar
                    </Button>
                    <Button onClick={handleSave}>Crear Orden</Button>
                </div>
            </div>
        </div>
    );
};

export default CreateOrder;
