// src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Layout from './ui/components/Layout';

// Import indexed pages
import {
  Role,
  Branch,
  NotFound,
  DrugstoreInventoryManagement,
  DrugstoreOrdersManagement,
  DrugstoreProductManagement,
  BranchInventoryManagement,
  BranchOrdersManagement,
  BranchProductManagement
} from './ui/pages';

function App() {
  return (
      <Router>
        <Routes>
          {/* Role selection route */}
          <Route path="/" element={<Role />} />

          {/* Branch selection route */}
          <Route path="/select-branch" element={<Branch />} />

          {/* Drugstore routes */}
          <Route path="/drugstore/*" element={<Layout>
            <Routes>
              <Route path="inventory" element={<DrugstoreInventoryManagement />} />
              <Route path="orders" element={<DrugstoreOrdersManagement />} />
              <Route path="products" element={<DrugstoreProductManagement />} />
            </Routes>
          </Layout>} />

          {/* Branch routes */}
          <Route path="/branch/*" element={<Layout>
            <Routes>
              <Route path="inventory" element={<BranchInventoryManagement />} />
              <Route path="orders" element={<BranchOrdersManagement />} />
              <Route path="products" element={<BranchProductManagement />} />
            </Routes>
          </Layout>} />

          {/* 404 Not Found route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
  );
}

export default App;
