import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import NavButton from './NavButton';
import SessionContext from '../../lib/SessionContext';

const Layout = ({ children }) => {
    const navigate = useNavigate();
    const { role, setRole } = useContext(SessionContext);

    const getBaseRoute = () => {
        if (role === 'Drogueria') return '/drugstore';
        if (role === 'Farmacia') return '/branch';
        return '/';
    };

    const handleRoleChange = () => {
        if (role === 'Drogueria') {
            setRole('Farmacia');
            navigate('/select-branch');
        } else if (role === 'Farmacia') {
            setRole('Drogueria');
            navigate('/drugstore/inventory');
        }
    };

    const getChangeRoleButtonText = () => {
        return role === 'Drogueria' ? 'Cambiar a Farmacia' : 'Cambiar a Drogueria';
    };

    return (
        <div className="min-h-screen bg-night-50">
            <div className="bg-night-300 p-4">
                <div className="container mx-auto flex justify-between items-center">
                    <button
                        onClick={handleRoleChange}
                        className="px-4 py-2 bg-sinopia-500 text-night-950 font-bold rounded hover:bg-sinopia-800 hover:text-night-50 focus:outline-none focus:ring-2 focus:ring-sinopia-400"
                    >
                        {getChangeRoleButtonText()}
                    </button>
                    <div className="flex space-x-4">
                        <NavButton route={`${getBaseRoute()}/inventory`}>Inventario</NavButton>
                        <NavButton route={`${getBaseRoute()}/orders`}>Ordenes</NavButton>
                        <NavButton route={`${getBaseRoute()}/products`}>Productos</NavButton>
                    </div>
                </div>
            </div>
            <div className="container mx-auto p-4">
                {children}
            </div>
        </div>
    );
};

export default Layout;
