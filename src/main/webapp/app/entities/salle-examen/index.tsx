import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import SalleExamen from './salle-examen';
import SalleExamenDetail from './salle-examen-detail';
import SalleExamenUpdate from './salle-examen-update';
import SalleExamenDeleteDialog from './salle-examen-delete-dialog';

const SalleExamenRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<SalleExamen />} />
    <Route path="new" element={<SalleExamenUpdate />} />
    <Route path=":id">
      <Route index element={<SalleExamenDetail />} />
      <Route path="edit" element={<SalleExamenUpdate />} />
      <Route path="delete" element={<SalleExamenDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default SalleExamenRoutes;
