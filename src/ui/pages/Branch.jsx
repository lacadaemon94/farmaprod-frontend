import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/index';
import SessionContext from '../../lib/SessionContext';

const Branch = () => {
    const { branches, setBranch } = useContext(SessionContext);
    const navigate = useNavigate();

    const handleBranchSelection = (selectedBranch) => {
        setBranch(selectedBranch);
        navigate('/branch/inventory');
    };

    return (
        <div className="flex flex-col space-y-4 items-center justify-center min-h-screen bg-night-50">
            <div className="flex flex-col space-y-4 bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-3xl mb-4 font-bold">Seleccionar Sucursal:</h2>
                {branches.map((branchItem) => (
                    <Button
                        key={branchItem.id}
                        onClick={() => handleBranchSelection(branchItem)}
                        className="mb-2"
                    >
                        {branchItem.nombre}
                    </Button>
                ))}
            </div>
        </div>
    );
};

export default Branch;
