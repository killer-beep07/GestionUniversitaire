import React from 'react';
import { Translate } from 'react-jhipster';

import MenuItem from 'app/shared/layout/menus/menu-item';
import { useAppSelector } from 'app/config/store';
import { hasAnyAuthority } from 'app/shared/auth/private-route';
import { AUTHORITIES } from 'app/config/constants';

const EntitiesMenu = () => {
  const isAdmin = useAppSelector(state => hasAnyAuthority(state.authentication.account.authorities, [AUTHORITIES.ADMIN]));
  // console.log(isAdmin);
  return (
    <>
      {/* prettier-ignore */}

      {isAdmin && (
        <>
          <MenuItem icon="asterisk" to="/etudiant">
            <Translate contentKey="global.menu.entities.etudiant" />
          </MenuItem>

          <MenuItem icon="asterisk" to="/niveau">
            <Translate contentKey="global.menu.entities.niveau" />
          </MenuItem>
          <MenuItem icon="asterisk" to="/filiere">
            <Translate contentKey="global.menu.entities.filiere" />
          </MenuItem>
          <MenuItem icon="asterisk" to="/groupe">
            <Translate contentKey="global.menu.entities.groupe" />
          </MenuItem>
          <MenuItem icon="asterisk" to="/salle-examen">
            <Translate contentKey="global.menu.entities.salleExamen" />
          </MenuItem>
        </>
      )}
      <MenuItem icon="asterisk" to="/examen">
        <Translate contentKey="global.menu.entities.examen" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/planning">
        <Translate contentKey="global.menu.entities.planning" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/Calendrier">
        <Translate contentKey="global.menu.entities.calendrier" />
      </MenuItem>
      {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
    </>
  );
};

export default EntitiesMenu;
