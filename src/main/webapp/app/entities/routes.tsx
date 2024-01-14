import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import Etudiant from './etudiant';
import Niveau from './niveau';
import Filiere from './filiere';
import Groupe from './groupe';
import SalleExamen from './salle-examen';
import Examen from './examen';
import Planning from './planning-semestre';
import Calendrier from './Calendrier';
import { AUTHORITIES } from 'app/config/constants';
import { useAppSelector } from 'app/config/store';
import { hasAnyAuthority } from 'app/shared/auth/private-route';
import ExamenCalendar from './examen-calendar';

/* jhipster-needle-add-route-import - JHipster will add routes here */
// const isAdmin = useAppSelector(state => hasAnyAuthority(state.authentication.account.authorities, [AUTHORITIES.ADMIN]));
export default () => {
  return (
    <div>
      <ErrorBoundaryRoutes>
        {/* prettier-ignore
        {isAdmin && (
          <> */}
        <Route path="etudiant/*" element={<Etudiant />} />
        <Route path="niveau/*" element={<Niveau />} />
        {/* </>
        )} */}
        <Route path="filiere/*" element={<Filiere />} />
        <Route path="groupe/*" element={<Groupe />} />
        <Route path="salle-examen/*" element={<SalleExamen />} />
        <Route path="examen/*" element={<Examen />} />
        <Route path="planning-semestre/*" element={<Planning />} />

        <Route path="calendrier/*" element={<Calendrier />} />
        <Route path="examen-calendar/*" element={<ExamenCalendar />} />
        {/* jhipster-needle-add-route-path - JHipster will add routes here */}
      </ErrorBoundaryRoutes>
    </div>
  );
};
