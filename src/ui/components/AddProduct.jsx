import React, { useState } from 'react';
import { Button } from '../components/index';
import { mapAddProductFormData } from '../../lib/formatData'
import { createProduct } from '../../api/drugstore';

import PlusIcon from '@heroicons/react/24/outline/PlusIcon'

const CreateProduct = ({ onSave, onClose }) => {
    const [formData, setFormData] = useState({
        nombre: "",
        descripcion: "",
        envase: "",
        e_descripcion: "",
        material: "",
        "volumen(mL)": "",
        "largo(cm)": "",
        "ancho(cm)": "",
        "alto(cm)": "",
        ingredientes: [{ nombre: "", descripcion: "" }]
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleIngredientChange = (index, field, value) => {
        const newIngredientes = [...formData.ingredientes];
        newIngredientes[index][field] = value;
        setFormData(prevData => ({
            ...prevData,
            ingredientes: newIngredientes
        }));
    };

    const addIngredientField = () => {
        setFormData(prevData => ({
            ...prevData,
            ingredientes: [...prevData.ingredientes, { nombre: "", descripcion: "" }]
        }));
    };

    const handleSave = async () => {
        try {
            const product = mapAddProductFormData(formData);
            const responseData = await createProduct(product);
            onSave(responseData);
            onClose()
        } catch (error) {
            console.error("Error while saving product:", error);
        }
    };

    return (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 max-h-[80%] overflow-y-auto">
            <div className="bg-light p-6 rounded-lg shadow-lg w-full max-w-lg">
                {Object.keys(formData).map((header) => (
                    header !== "ingredientes" ? (
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
                    ) : (
                        formData.ingredientes.map((ing, index) => (
                            <div key={index} className="mb-4">
                                <label className="block text-night-700 mb-2 capitalize">ingrediente {index + 1}</label>
                                <input
                                    type="text"
                                    placeholder="Nombre"
                                    value={ing.nombre}
                                    onChange={(e) => handleIngredientChange(index, 'nombre', e.target.value)}
                                    className="border rounded w-full py-2 px-3 mb-2"
                                />
                                <input
                                    type="text"
                                    placeholder="Descripcion"
                                    value={ing.descripcion}
                                    onChange={(e) => handleIngredientChange(index, 'descripcion', e.target.value)}
                                    className="border rounded w-full py-2 px-3"
                                />
                            </div>
                        ))
                    )
                ))}
                <Button onClick={addIngredientField} ariaLabel="Add new ingredient">
                    <PlusIcon className="w-6 h-6" />
                </Button>
                <div className="flex justify-end gap-4 mt-4">
                    <Button className="mr-2" onClick={onClose}>
                        Cancelar
                    </Button>
                    <Button onClick={handleSave}>Crear</Button>
                </div>
            </div>
        </div>
    );
};

export default CreateProduct;