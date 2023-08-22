// src/api/drugstore.js

import axios from 'axios';

const branchAPI = axios.create({
    timeout: 10000, // 10 Seconds
    headers: {
        'Content-Type': 'application/json',
    },
});

export const listBranches = async () => {
    try {
        const response = await branchAPI.get('http://localhost:8000/sucursal/list');
        return response.data;
    } catch (error) {
        console.error("Error listando sucursales:", error);
        throw error;
    }
};

export const listOrders = async () => {
    try {
        const response = await branchAPI.get('http://localhost:8000/orden/list');
        return response.data;
    } catch (error) {
        console.error("Error listando ordenes:", error);
        throw error;
    }
};

export const showProducts = async () => {
    try {
        const response = await branchAPI.get('http://localhost:8000/productos/show');
        return response.data;
    } catch (error) {
        console.error("Error listando productos:", error);
        throw error;
    }
};

export const getProductById = async (producto_id) => {
    try {
        const response = await branchAPI.get(`http://localhost:8000/productos/${producto_id}`);
        return response.data;
    } catch (error) {
        console.error("Error llamando producto por id:", error);
        throw error;
    }
};

export const addProduct = async (productData) => {
    try {
        const response = await branchAPI.post('http://localhost:8000/productos/add', productData);
        return response.data;
    } catch (error) {
        console.error("Error añadiendo producto:", error);
        throw error;
    }
};

export const deleteProduct = async (productId) => {
    try {
        const response = await branchAPI.post('http://localhost:8000/productos/delete', { id: productId });
        return response.data;
    } catch (error) {
        console.error("Error borrando producto:", error);
        throw error;
    }
};

export const transferInventory = async (transferData) => {
    try {
        const response = await branchAPI.post('http://localhost:8000/inventario/transfer', transferData);
        return response.data;
    } catch (error) {
        console.error("Error transfiriendo entre inventarios:", error);
        throw error;
    }
};

export const listBranchInventory = async (sucursalId) => {
    try {
        const response = await branchAPI.post('http://localhost:8000/inventario/list', {
            sucursal_id: sucursalId
        });
        return response.data;
    } catch (error) {
        console.error("Error listando inventario:", error);
        throw error;
    }
};

export const createOrder = async (orderData) => {
    try {
        const response = await branchAPI.post('http://localhost:8000/orden', orderData);
        return response.data;
    } catch (error) {
        console.error("Error creando orden:", error);
        throw error;
    }
};