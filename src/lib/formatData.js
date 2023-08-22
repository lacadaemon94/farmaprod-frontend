import { format } from 'date-fns';

export const productHeadersAndRows = (data) => {
    if (!data || data.length === 0) return { headers: [], rows: [] };

    // Define headers
    const headers = ["nombre", "descripcion", "envase", "e_descripcion", "material", "volumen(mL)", "dimensiones(cm)", "ingredientes"];

    // Extract rows
    const rows = data.map(item => {
        const dimensions = item.envase_id && item.envase_id.dimension_id
            ? `${item.envase_id.dimension_id.largo}, ${item.envase_id.dimension_id.ancho}, ${item.envase_id.dimension_id.alto}`
            : null;

        return {
            nombre: item.nombre,
            descripcion: item.descripcion,
            envase: item.envase_id ? item.envase_id.nombre : null,
            e_descripcion: item.envase_id ? item.envase_id.descripcion : null,
            material: item.envase_id ? item.envase_id.material : null,
            "volumen(mL)": item.envase_id ? item.envase_id.volumen : null,
            "dimensiones(cm)": dimensions,
            ingredientes: item.ingredientes ? item.ingredientes.map(ing => ing.nombre).join(', ') : null,
        };
    });

    return { headers, rows };
};


export const inventoryHeadersAndRows = (data) => {
    if (!data || data.length === 0) return { headers: [], rows: [] };

    // Define headers
    const headers = ["tipo", "nombre", "descripcion", "envase", "ingredientes", "cantidad", "expiracion"];

    // Extract rows
    const rows = data.map(item => {
        return {
            tipo: item.tipoId ? item.tipoId.tipo : null,
            nombre: item.productoId ? item.productoId.nombre : null,
            descripcion: item.productoId ? item.productoId.descripcion : null,
            envase: item.productoId && item.productoId.envaseId ? item.productoId.envaseId.nombre : null,
            ingredientes: item.productoId && item.productoId.ingredientes ? item.productoId.ingredientes.map(ing => ing.nombre).join(', ') : null,
            cantidad: item.cantidad,
            expiracion: format(new Date(item.expiracion), 'yyyy-MM-dd')
        };
    });

    return { headers, rows };
};

export const mapFormDataToProduct = (originalProduct, formData) => {
    // Extracting dimensions from formData
    const [largo, ancho, alto] = formData["dimensiones(cm)"].split(',').map(dim => parseFloat(dim.trim()));

    // Extracting ingredient names from formData
    const ingredientNames = formData.ingredientes.split(',').map(name => name.trim());

    // Constructing the updated product structure
    const updatedProduct = {
        id: originalProduct.id,
        nombre: formData.nombre,
        descripcion: formData.descripcion,
        envase: {
            nombre: formData.envase,
            descripcion: formData.e_descripcion,
            material: formData.material,
            volumen: formData["volumen(mL)"],
            unidadVol: 'mL',
            dimensiones: {
                largo: largo,
                ancho: ancho,
                alto: alto,
                unidad: 'cm' // Fixed
            }
        },
        ingredientes: ingredientNames.map((name, index) => {
            // If the original ingredient exists, use its description, otherwise use formData
            const originalIngredient = originalProduct.ingredientes[index];
            return {
                nombre: name,
                descripcion: originalIngredient ? originalIngredient.descripcion : formData[`ingredientDesc_${index}`]
            };
        })
    };

    return updatedProduct;
};

export const mapAddProductFormData = (formData) => {
    // Extracting dimensions directly from formData
    const largo = parseFloat(formData["largo(cm)"]);
    const ancho = parseFloat(formData["ancho(cm)"]);
    const alto = parseFloat(formData["alto(cm)"]);

    // Constructing the updated product structure
    const addProduct = {
        nombre: formData.nombre,
        descripcion: formData.descripcion,
        envase: {
            nombre: formData.envase,
            descripcion: formData.e_descripcion,
            material: formData.material,
            volumen: formData["volumen(mL)"],
            unidadVol: 'mL', // Fixed
            dimensiones: {
                largo: largo,
                ancho: ancho,
                alto: alto,
                unidad: 'cm' // Fixed
            }
        },
        ingredientes: formData.ingredientes.map((ing) => {
            return {
                nombre: ing.nombre,
                descripcion: ing.descripcion
            };
        })
    };

    return addProduct;
};

export const mapAddToBodegaFormData = (formData) => {
    // Extracting the necessary fields from formData
    const { producto_id, cantidad, expiracion } = formData;

    // Constructing the desired JSON structure
    const addproduct = {
        tipo_id: 1,  // This is fixed
        producto_id: producto_id,
        cantidad: parseInt(cantidad, 10),  // Convert string to integer
        expiracion: expiracion
    };

    return addproduct;
};

export const mapTransferToInventoryFormData = (formData) => {
    // Extracting the necessary fields from formData
    const { producto_id, origen_tipo_id, destino_tipo_id, cantidad, fecha, expiracion } = formData;

    // Constructing the desired JSON structure
    const transferproduct = {
        producto_id: producto_id,  // This is fixed
        origen_tipo_id: origen_tipo_id,
        destino_tipo_id: destino_tipo_id,
        cantidad: cantidad,
        fecha: fecha,
        expiracion: expiracion
    };

    return transferproduct;
};

export const branchInventoryHeadersAndRows = (data) => {
    if (!data || data.length === 0) return { headers: [], rows: [] };

    // Define headers
    const headers = ["id", "tipo", "nombre", "descripcion", "precio", "cantidad"];

    // Extract rows
    const rows = data.map(item => {
        return {
            id: item ? item.producto_id : null,
            tipo: item ? (item.tipo === 1 ? 'Bodega' : item.tipo === 2 ? 'Venta' : item.tipo === 3 ? 'Devolucion' : null) : null,
            nombre: item ? item.nombre : null,
            descripcion: item ? item.descripcion : null,
            precio: item ? item.precio : null,
            cantidad: item ? item.cantidad : null,
        };
    });

    return { headers, rows };
};

export const mapTransferToBranchInventoryFormData = (formData) => {
    // Extracting the necessary fields from formData
    const { producto_id, inventario_origen, inventario_destino, cantidad, fechaRealizada, sucursal_id } = formData;

    // Constructing the desired JSON structure
    const transferproduct = {
        sucursal_id: sucursal_id,
        producto_id: producto_id,
        inventario_origen: inventario_origen,
        inventario_destino: inventario_destino,
        cantidad: cantidad,
        fechaRealizada: fechaRealizada,
    };

    return transferproduct;
};

export const branchProductHeadersAndRows = (data) => {
    if (!data || data.length === 0) return { headers: [], rows: [] };

    // Define headers
    const headers = ["id", "nombre", "descripcion", "precio_unitario"];

    // Extract rows
    const rows = data.map(item => {
        return {
            id: item.id,
            nombre: item.nombre,
            descripcion: item.descripcion,
            precio_unitario: item.precio_unitario,
        };
    });

    return { headers, rows };
};

export const branchOrdersHeadersAndRows = (data, products) => {
    if (!data || !data.length) {
        return { headers: [], rows: [] };
    }

    const getBadgeForEstado = (estado) => {
        let bgColor, textColor, ringColor;

        switch (estado) {
            case 'ingresado':
                bgColor = 'bg-risdblue-200';
                textColor = 'text-risdblue-800';
                ringColor = 'ring-risdblue-600';
                break;
            case 'en proceso':
                bgColor = 'bg-green-50';
                textColor = 'text-green-600';
                ringColor = 'ring-green-500/10';
                break;
            case 'finalizado':
                bgColor = 'bg-red-50';
                textColor = 'text-red-600';
                ringColor = 'ring-red-500/10';
                break;
            default:
                bgColor = 'bg-gray-50';
                textColor = 'text-gray-600';
                ringColor = 'ring-gray-500/10';
                break;
        }

        return (
            <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ${bgColor} ${textColor} ring-1 ring-inset ${ringColor}`}>
                {estado}
            </span>
        );
    };

    // Define headers
    const headers = ["id", "sucursal", "producto", "cantidad", "estado", "fecha_realizada"];

    // Extract rows
    const rows = data.map(item => {
        const productName = products.find(product => product.id === item.producto_id)?.nombre || "Unknown Product";
        return {
            id: item.id,
            sucursal: item.sucursal.nombre,
            producto: productName,
            cantidad: item.cantidad,
            estado: getBadgeForEstado(item.estado),
            fecha_realizada: item.fechaRealizada,
        };
    });

    return { headers, rows };
};

export const mapCreateOrderFormData = (formData) => {
    // Extracting the necessary fields from formData
    const { sucursal_id, producto_id, fechaRealizada, cantidad, estado } = formData;

    // Constructing the desired JSON structure
    const order = {
        sucursal_id: sucursal_id,
        producto_id: producto_id,
        fechaRealizada: fechaRealizada,
        cantidad: cantidad,
        estado: estado,
    };

    return order;
};