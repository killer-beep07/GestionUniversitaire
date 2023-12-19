import React from 'react';
import { translate } from 'react-jhipster';
import { NavDropdown } from './menu-components';
import { EntitiesMenuAdmin, EntitiesMenuUser } from 'app/entities/menu';
import { useAppSelector } from 'app/config/store';
import { hasAnyAuthority } from 'app/shared/auth/private-route';
import { AUTHORITIES } from 'app/config/constants';

const EntitiesMenuAdmi = () => {
  const isAdmin = useAppSelector(state => hasAnyAuthority(state.authentication.account.authorities, [AUTHORITIES.ADMIN]));

  return (
    <>
      {isAdmin && (
        <NavDropdown
          icon="th-list"
          name={translate('global.menu.entities.main')}
          id="entity-menu"
          data-cy="entity"
          style={{ maxHeight: '80vh', overflow: 'auto' }}
        >
          <EntitiesMenuAdmin />
        </NavDropdown>
      )}
    </>
  );
};

const EntitiesMenuUse = () => (
  <NavDropdown
    icon="th-list"
    name={translate('global.menu.entities.main')}
    id="entity-menu"
    data-cy="entity"
    style={{ maxHeight: '80vh', overflow: 'auto' }}
  >
    <EntitiesMenuUser />
  </NavDropdown>
);

export { EntitiesMenuAdmi, EntitiesMenuUse };
