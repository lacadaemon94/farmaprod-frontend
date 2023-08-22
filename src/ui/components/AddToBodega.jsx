import React, { useState, useContext } from 'react';
import { Button } from '../components/index';
import SessionContext from '../../lib/SessionContext';
import { addProductToBodega } from '../../api/drugstore';
import { mapAddToBodegaFormData } from '../../lib/formatData'

const AddToBodega = ({ onSave, onClose }) => {
    const { products } = useContext(SessionContext);
    const [formData, setFormData] = useState({
        tipo_id: 1,
        producto_id: "",
        cantidad: "",
        expiracion: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleAdd = async () => {
        try {
            const product = mapAddToBodegaFormData(formData);
            const responseData = await addProductToBodega(product);
            onSave(responseData);
            onClose()
        } catch (error) {
            console.error("Error while adding product:", error);
        }
    };

    return (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 max-h-[80%] overflow-y-auto">
            <div className="bg-light p-6 rounded-lg shadow-lg w-full max-w-lg">
                <div className="mb-4">
                    <label className="block text-night-700 mb-2">Producto</label>
                    <select
                        name="producto_id"
                        value={formData.producto_id}
                        onChange={handleChange}
                        className="border rounded w-full py-2 px-3"
                    >
                        <option value="">Seleccione un producto</option>
                        {products.map(product => (
                            <option key={product.id} value={product.id}>
                                {product.nombre}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-night-700 mb-2">Cantidad</label>
                    <input
                        type="number"
                        name="cantidad"
                        value={formData.cantidad}
                        onChange={handleChange}
                        className="border rounded w-full py-2 px-3"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-night-700 mb-2">Expiración</label>
                    <input
                        type="date"
                        name="expiracion"
                        value={formData.expiracion}
                        onChange={handleChange}
                        className="border rounded w-full py-2 px-3"
                    />
                </div>
                <div className="flex justify-end gap-4 mt-4">
                    <Button className="mr-2" onClick={onClose}>
                        Cancelar
                    </Button>
                    <Button onClick={handleAdd}>Agregar</Button>
                </div>
            </div>
        </div>
    );
};

export default AddToBodega;
