import React from 'react';
import { Translate } from 'react-jhipster';
import MenuItem from 'app/shared/layout/menus/menu-item';
import { useAppSelector } from 'app/config/store';
import { hasAnyAuthority } from 'app/shared/auth/private-route';
import { AUTHORITIES } from 'app/config/constants';
import {
  faBook,
  faBookOpen,
  faBuilding,
  faCalendarAlt,
  faChalkboard,
  faClipboardCheck,
  faGraduationCap,
  faUser,
} from '@fortawesome/free-solid-svg-icons';

const EntitiesMenuAdmin = () => {
  const isAdmin = useAppSelector(state => hasAnyAuthority(state.authentication.account.authorities, [AUTHORITIES.ADMIN]));

  return (
    <>
      <MenuItem icon={faUser} to="/etudiant">
        <Translate contentKey="global.menu.entities.etudiant" />
      </MenuItem>

      <MenuItem icon={faGraduationCap} to="/niveau">
        <Translate contentKey="global.menu.entities.niveau" />
      </MenuItem>
      <MenuItem icon={faBook} to="/filiere">
        <Translate contentKey="global.menu.entities.filiere" />
      </MenuItem>

      <MenuItem icon={faBuilding} to="/salle-examen">
        <Translate contentKey="global.menu.entities.salleExamen" />
      </MenuItem>

      <MenuItem icon={faChalkboard} to="/groupe">
        <Translate contentKey="global.menu.entities.groupe" />
      </MenuItem>
      <MenuItem icon={faClipboardCheck} to="/examen">
        <Translate contentKey="global.menu.entities.examen" />
      </MenuItem>
    </>
  );
};

const EntitiesMenuUser = () => {
  return (
    <>
      <MenuItem icon={faChalkboard} to="/groupe">
        <Translate contentKey="global.menu.entities.groupe" />
      </MenuItem>
      <MenuItem icon={faClipboardCheck} to="/examen">
        <Translate contentKey="global.menu.entities.examen" />
      </MenuItem>
      <MenuItem icon={faBookOpen} to="/planning-semestre">
        <Translate contentKey="global.menu.entities.planning" />
      </MenuItem>

      <MenuItem icon={faCalendarAlt} to="/Calendrier">
        <Translate contentKey="global.menu.entities.calendrier" />
      </MenuItem>
      {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
    </>
  );
};

export { EntitiesMenuAdmin, EntitiesMenuUser }; // Export the components
