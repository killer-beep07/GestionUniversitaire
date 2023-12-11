// index.tsx
import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import Planning from './planning';

const PlanningRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<Planning />} />
  </ErrorBoundaryRoutes>
);

export default PlanningRoutes;
