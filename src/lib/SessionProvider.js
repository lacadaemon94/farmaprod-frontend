// src/providers/SessionProvider.js

import React, { useState, useEffect } from 'react';
import SessionContext from './SessionContext';
import { listProducts, listInventory } from '../api/drugstore';
import { listOrders, listBranches, listBranchInventory, showProducts } from '../api/branch';

const SessionProvider = ({ children }) => {
    const [branches, setBranches] = useState([]);
    const [branch, setBranch] = useState(() => {
        const savedBranch = localStorage.getItem('branch');
        return savedBranch ? JSON.parse(savedBranch) : null;
    });
    const [products, setProducts] = useState([]);
    const [branchesProducts, setbranchesProducts] = useState([]);
    const [inventory, setInventory] = useState([]);
    const [branchInventory, setbranchInventory] = useState([]);
    const [orders, setOrders] = useState([]);
    const [role, setRole] = useState(localStorage.getItem('role') || '')

    useEffect(() => {
        const fetchProducts = async () => {
            const data = await listProducts();
            setProducts(data);
        };

        const fetchInventory = async () => {
            const data = await listInventory();
            setInventory(data);
        };

        const fetchOrders = async () => {
            const data = await listOrders();
            setOrders(data);
        };

        const fetchBranches = async () => {
            const data = await listBranches();
            setBranches(data);
        };

        fetchBranches();
        fetchProducts();
        fetchInventory();
        fetchOrders();
    }, []);

    useEffect(() => {
        localStorage.setItem('role', role);
        localStorage.setItem('role', role);
    }, [role]);

    useEffect(() => {
        localStorage.setItem('branch', JSON.stringify(branch));

        const fetchBranchInventory = async () => {
            const data = await listBranchInventory(branch.id)
            setbranchInventory(data)
        }

        const fetchBranchesProducts = async () => {
            const data = await showProducts()
            setbranchesProducts(data)
        }


        fetchBranchInventory()
        fetchBranchesProducts()
    }, [branch]);


    return (
        <SessionContext.Provider value={{ branches, products, inventory, orders, role, setRole, branch, setBranch, branchInventory, setbranchInventory, branchesProducts, setbranchesProducts, setOrders }}>
            {children}
        </SessionContext.Provider>
    );
};

export default SessionProvider;
