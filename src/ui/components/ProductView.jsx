import React, { useState } from 'react';
import { Button } from '../components/index';
import { editProduct } from '../../api/drugstore';
import { mapFormDataToProduct } from '../../lib/formatData'

const ProductView = ({ product, headers, onEdit, onClose, originalProduct }) => {
    const [formData, setFormData] = useState(product);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSave = async () => {
        try {
            const updatedProductData = mapFormDataToProduct(originalProduct, formData);
            const responseData = await editProduct(updatedProductData);
            onEdit(responseData);
            onClose()
        } catch (error) {
            console.error("Error while saving product:", error);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-light p-6 rounded-lg shadow-lg w-full max-w-lg">
                {headers.map((header) => (
                    <div key={header} className="mb-4">
                        <label className="block text-night-700 mb-2 capitalize">{header}</label>
                        <input
                            type="text"
                            name={header}
                            value={formData[header]}
                            onChange={handleChange}
                            className="border rounded w-full py-2 px-3"
                        />
                    </div>
                ))}
                <div className="flex justify-end gap-4">
                    <Button className="mr-2" onClick={onClose}>
                        Cancelar
                    </Button>
                    <Button onClick={handleSave}>Guardar</Button>
                </div>
            </div>
        </div>
    );
};

export default ProductView;
