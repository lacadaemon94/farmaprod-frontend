import React from 'react';
import { Button } from '../components/index';

const OrderView = ({ selectedOrder, branchesProducts, onClose }) => {
    // Find the product name based on order.producto_id
    const product = branchesProducts.find(product => product.id === selectedOrder.producto_id);

    // Find the regente sucursal (employee with rol_id === 1)
    const regenteSucursal = selectedOrder.sucursal.empleados.find(emp => emp.empleado.rol_id === 1);

    // Filter all other employees as dependientes sucursal
    const dependientesSucursal = selectedOrder.sucursal.empleados.filter(emp => emp.empleado.rol_id !== 1);

    return (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 max-h-[80%] overflow-y-auto">
            <div className="bg-light p-6 rounded-lg shadow-lg w-full max-w-lg">
                <div className="mb-4">
                    <label className="block text-night-700 mb-2">ID:</label>
                    <div>{selectedOrder.id}</div>
                </div>
                <div className="mb-4">
                    <label className="block text-night-700 mb-2">Sucursal:</label>
                    <div>{selectedOrder.sucursal.nombre}</div>
                </div>

                <div className="mb-4">
                    <label className="block text-night-700 mb-2">Producto:</label>
                    <div>{product.nombre}</div>
                </div>

                <div className="mb-4">
                    <label className="block text-night-700 mb-2">Fecha Realizada:</label>
                    <div>{selectedOrder.fechaRealizada}</div>
                </div>

                <div className="mb-4">
                    <label className="block text-night-700 mb-2">Cantidad:</label>
                    <div>{selectedOrder.cantidad}</div>
                </div>

                <div className="mb-4">
                    <label className="block text-night-700 mb-2">Estado:</label>
                    <div>{selectedOrder.estado}</div>
                </div>

                <div className="mb-4">
                    <label className="block text-night-700 mb-2">Regente Sucursal:</label>
                    <div>{regenteSucursal.empleado.nombre}</div>
                </div>
                <div className="mb-4">
                    <label className="block text-night-700 mb-2">Dependientes Sucursal:</label>
                    <ul>
                        {dependientesSucursal.map((emp, index) => (
                            <li key={index}>{emp.empleado.nombre}</li>
                        ))}
                    </ul>
                </div>
                <div className="flex justify-end gap-4 mt-4">
                    <Button className="mr-2" onClick={onClose}>
                        Cerrar
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default OrderView;
