// index.tsx
import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import Calendrier from './Calendrier';

const CalendrierRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<Calendrier />} />
  </ErrorBoundaryRoutes>
);

export default CalendrierRoutes;
