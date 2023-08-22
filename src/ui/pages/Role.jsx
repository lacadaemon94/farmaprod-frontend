import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import SessionContext from '../../lib/SessionContext';

const Role = () => {
  const { setRole } = useContext(SessionContext);
  const navigate = useNavigate();

  const handleRoleSelection = (selectedRole) => {
    setRole(selectedRole);
    if (selectedRole === 'Farmacia') {
      navigate('/select-branch');
    } else if (selectedRole === 'Drogueria') {
        navigate('/drugstore/inventory')
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-night-50">
      <div className="flex flex-col space-y-4 bg-white p-16 rounded-lg shadow-md">
        <h2 className="text-3xl mb-4 font-bold">Seleccionar Rol:</h2>
        <Button onClick={() => handleRoleSelection('Drogueria')} className="mb-2">
          Drogueria
        </Button>
        <Button onClick={() => handleRoleSelection('Farmacia')}>
          Farmacia
        </Button>
      </div>
    </div>
  );
};

export default Role;