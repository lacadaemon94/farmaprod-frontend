import React, { useState, useContext, useEffect } from 'react';
import { ProductTable, ProductView, AddProduct, Button } from '../../components/index';
import SessionContext from '../../../lib/SessionContext';
import { productHeadersAndRows } from '../../../lib/formatData'

import PlusIcon from '@heroicons/react/24/outline/PlusIcon'

const ProductManagement = () => {
    const { products } = useContext(SessionContext);
    const [headers, setHeaders] = useState([]);
    const [rows, setRows] = useState([]);
    const [originalProduct, setOriginalProduct] = useState(null);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [addProduct, setAddProduct] = useState(null);

    useEffect(() => {
        const data = products;

        const { headers, rows } = productHeadersAndRows(data);
        setHeaders(headers);
        setRows(rows);
    }, [products]);

    const handleViewDetails = (product) => {
        // Find the original product object using the stored id
        const origin = products.find(p => p.nombre === product.nombre && p.descripcion === product.descripcion);
        setOriginalProduct(origin)
        setSelectedProduct(product);
    };

    const handleEditedProduct = (editedData) => {
        const { headers, rows } = productHeadersAndRows([editedData]);
        setHeaders(headers);
        setRows(rows);
    };

    return (
        <div className="p-4">
            <div className="flex justify-end mb-4">
                <Button onClick={() => setAddProduct(true)} ariaLabel="Add new product">
                    <PlusIcon className="w-6 h-6" />
                </Button>
            </div>
            <ProductTable headers={headers} rows={rows} onViewDetails={handleViewDetails} />
            {selectedProduct && (
                <ProductView originalProduct={originalProduct} product={selectedProduct} headers={headers} onEdit={handleEditedProduct} onClose={() => setSelectedProduct(null)} />
            )}
            {addProduct && (
                <AddProduct onClose={() => setAddProduct(null)} onSave={handleEditedProduct} />
            )}
        </div>
    );
};

export default ProductManagement;