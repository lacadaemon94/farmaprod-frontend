export const filterByTipoId = (tipoId, branchInventory, branchesProducts, branch) => {
    // Filter branchInventory based on the given tipo_id or all if tipoId is null
    const filteredInventoryItems = branchInventory
        .filter(item => (tipoId === null || item.tipo_id === tipoId) && item.sucursal_id === branch.id);

    // Filter branchesProducts based on the producto_ids from filteredInventoryItems
    const filteredProducts = branchesProducts
        .filter(product => filteredInventoryItems.some(item => item.producto_id === product.id));

    // Map over the filtered products to create the desired structure
    const result = filteredProducts.map(product => {
        const inventoryItem = filteredInventoryItems.find(item => item.producto_id === product.id);
        return {
            tipo: inventoryItem.tipo_id,
            producto_id: inventoryItem.producto_id,
            nombre: product.nombre,
            descripcion: product.descripcion,
            precio: product.precio_unitario,
            cantidad: inventoryItem.cantidad
        };
    });

    return result;
};

export const filterByBranchId = (orders, branchId) => {
    if (!orders || !orders.ordenes) return null;
    return orders.ordenes.filter(order => order.sucursal_id === branchId);
};