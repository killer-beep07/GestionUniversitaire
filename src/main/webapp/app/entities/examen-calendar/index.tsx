import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';
import ExamenCalendar from './examen-calendar';

const ExamenCalendarRoutes = () => (
  <Routes>
    <Route path="/" element={<ExamenCalendar />} />
    <Route path="/bientot" element={<div>Bientôt</div>} />
    <Route
      path="/examen-calendar" // Utilisez "/*" pour attraper toutes les routes qui ne correspondent pas aux routes ci-dessus
      element={<Navigate to="/bientot" />} // Redirige vers la page "bientôt" si la route est accédée directement
    />
  </Routes>
);

export default ExamenCalendarRoutes;
