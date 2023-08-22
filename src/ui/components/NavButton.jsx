import React from 'react';
import { NavLink } from 'react-router-dom';

const NavButton = ({ route, children }) => {
  return (
    <NavLink
      to={route}
      className="px-4 py-2 bg-risdblue-500 text-light font-semibold rounded hover:bg-risdblue-600 focus:outline-none focus:ring-2 focus:ring-risdblue-400"
      activeClassName="bg-risdblue-700"
    >
      {children}
    </NavLink>
  );
};

export default NavButton;