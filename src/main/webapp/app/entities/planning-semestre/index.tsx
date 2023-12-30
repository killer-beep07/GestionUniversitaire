import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';
import Planning from './planning';

const PlanningRoutes = () => (
  <Routes>
    <Route path="/" element={<Planning />} />
    <Route path="/bientot" element={<div>Bientôt</div>} />
    <Route
      path="/planning"
      element={<Navigate to="/bientot" />} // Redirige vers la page "bientôt" si la route est accédée directement
    />
  </Routes>
);

export default PlanningRoutes;
