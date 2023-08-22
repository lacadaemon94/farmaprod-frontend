// src/api/drugstore.js

import axios from 'axios';

const drugstoreAPI = axios.create({
    timeout: 10000, // 10 seconds
    headers: {
        'Content-Type': 'application/json',
    },
});

export const createProduct = async (productData) => {
    try {
        const response = await drugstoreAPI.post('http://localhost:8080/producto/create', productData);
        return response.data;
    } catch (error) {
        console.error("Error creando producto:", error);
        throw error;
    }
};

export const editProduct = async (productData) => {
    try {
        const response = await drugstoreAPI.post('http://localhost:8080/producto/edit', productData);
        return response.data;
    } catch (error) {
        console.error("Error editando producto:", error);
        throw error;
    }
};

export const deleteProduct = async (productId) => {
    try {
        const response = await drugstoreAPI.delete(`http://localhost:8080/producto/delete/${productId}`);
        return response.data;
    } catch (error) {
        console.error("Error borrando producto:", error);
        throw error;
    }
};

export const listProducts = async () => {
    try {
        const response = await drugstoreAPI.get('http://localhost:8080/producto/list');
        return response.data;
    } catch (error) {
        console.error("Error llamando lista de productos:", error);
        throw error;
    }
};

export const addProductToBodega = async (productData) => {
    try {
        const response = await drugstoreAPI.post('http://localhost:8080/bodega/add', productData);
        return response.data;
    } catch (error) {
        console.error("Error agregando productos a la bodega:", error);
        throw error;
    }
};

export const transferInventory = async (transferData) => {
    try {
        const response = await drugstoreAPI.post('http://localhost:8080/inventario/transfer', transferData);
        return response.data;
    } catch (error) {
        console.error("Error transfiriendo entre inventarios:", error);
        throw error;
    }
};

export const listInventory = async () => {
    try {
        const response = await drugstoreAPI.get('http://localhost:8080/inventario/list');
        return response.data;
    } catch (error) {
        console.error("Error listando inventario:", error);
        throw error;
    }
};