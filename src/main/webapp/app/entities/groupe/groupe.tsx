import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { Translate, getSortState } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';
import { ASC, DESC, SORT } from 'app/shared/util/pagination.constants';
import { overrideSortStateWithQueryParams } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntities } from './groupe.reducer';
import { hasAnyAuthority } from 'app/shared/auth/private-route';
import { AUTHORITIES } from 'app/config/constants';
// ... existing imports

export const Groupe = () => {
  const dispatch = useAppDispatch();
  const isAdmin = useAppSelector(state => hasAnyAuthority(state.authentication.account.authorities, [AUTHORITIES.ADMIN]));
  const pageLocation = useLocation();
  const navigate = useNavigate();

  const [sortState, setSortState] = useState(overrideSortStateWithQueryParams(getSortState(pageLocation, 'id'), pageLocation.search));
  const [niveauNoms, setNiveauNoms] = useState({}); // State to store niveau names
  const [filiereNoms, setFiliereNoms] = useState({}); // State to store filiere names

  const groupeList = useAppSelector(state => state.groupe.entities);
  const loading = useAppSelector(state => state.groupe.loading);

  const getAllEntities = () => {
    dispatch(
      getEntities({
        sort: `${sortState.sort},${sortState.order}`,
      }),
    );
  };

  const sortEntities = () => {
    getAllEntities();
    const endURL = `?sort=${sortState.sort},${sortState.order}`;
    if (pageLocation.search !== endURL) {
      navigate(`${pageLocation.pathname}${endURL}`);
    }
  };

  useEffect(() => {
    sortEntities();
  }, [sortState.order, sortState.sort]);

  useEffect(() => {
    // Fetch niveau and filiere names when groupeList changes
    const fetchNiveauAndFiliereNames = async () => {
      await Promise.all(
        groupeList.map(async groupe => {
          const niveauNomResponse = await fetch(`/api/groupes/${groupe.id}/niveau-nom`);
          const filiereNomResponse = await fetch(`/api/groupes/${groupe.id}/filiere-nom`);

          const niveauNom = await niveauNomResponse.text();
          const filiereNom = await filiereNomResponse.text();

          setNiveauNoms(prevState => ({ ...prevState, [groupe.id]: niveauNom }));
          setFiliereNoms(prevState => ({ ...prevState, [groupe.id]: filiereNom }));
        }),
      );
    };

    fetchNiveauAndFiliereNames();
  }, [groupeList]);

  const sort = p => () => {
    setSortState({
      ...sortState,
      order: sortState.order === ASC ? DESC : ASC,
      sort: p,
    });
  };

  const handleSyncList = () => {
    sortEntities();
  };

  const getSortIconByFieldName = (fieldName: string) => {
    const sortFieldName = sortState.sort;
    const order = sortState.order;
    if (sortFieldName !== fieldName) {
      return faSort;
    } else {
      return order === ASC ? faSortUp : faSortDown;
    }
  };

  return (
    <div>
      <h2 id="groupe-heading" data-cy="GroupeHeading">
        <Translate contentKey="gestionUniversitaireApp.groupe.home.title">Groupes</Translate>
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="gestionUniversitaireApp.groupe.home.refreshListLabel">Refresh List</Translate>
          </Button>
          {isAdmin && (
            <>
              <Link to="/groupe/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
                <FontAwesomeIcon icon="plus" />
                &nbsp;
                <Translate contentKey="gestionUniversitaireApp.groupe.home.createLabel">Create new Groupe</Translate>
              </Link>
            </>
          )}
        </div>
      </h2>
      <div className="table-responsive">
        {groupeList && groupeList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th className="hand" onClick={sort('id')}>
                  <Translate contentKey="gestionUniversitaireApp.groupe.id">ID</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('id')} />
                </th>
                <th className="hand" onClick={sort('nom')}>
                  <Translate contentKey="gestionUniversitaireApp.groupe.nom">Nom</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('nom')} />
                </th>
                <th>
                  <Translate contentKey="gestionUniversitaireApp.groupe.niveau">Niveau</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  <Translate contentKey="gestionUniversitaireApp.groupe.examen">Examen</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  <Translate contentKey="gestionUniversitaireApp.groupe.filiere">Filiere</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {groupeList.map((groupe, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/groupe/${groupe.id}`} color="link" size="sm">
                      {groupe.id}
                    </Button>
                  </td>
                  <td>{groupe.nom}</td>
                  <td>{niveauNoms[groupe.id]}</td>
                  <td>
                    {groupe.examen
                      ? groupe.examen.map((val, j) => (
                          <span key={j}>
                            <Link to={`/examen/${val.id}`}>{val.nom}</Link>
                            {j === groupe.examen.length - 1 ? '' : ', '}
                          </span>
                        ))
                      : null}
                  </td>
                  <td>{filiereNoms[groupe.id]}</td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`/groupe/${groupe.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      {isAdmin && (
                        <>
                          <Button tag={Link} to={`/groupe/${groupe.id}/edit`} color="primary" size="sm" data-cy="entityEditButton">
                            <FontAwesomeIcon icon="pencil-alt" />{' '}
                            <span className="d-none d-md-inline">
                              <Translate contentKey="entity.action.edit">Edit</Translate>
                            </span>
                          </Button>
                          <Button
                            onClick={() => (location.href = `/groupe/${groupe.id}/delete`)}
                            color="danger"
                            size="sm"
                            data-cy="entityDeleteButton"
                          >
                            <FontAwesomeIcon icon="trash" />{' '}
                            <span className="d-none d-md-inline">
                              <Translate contentKey="entity.action.delete">Delete</Translate>
                            </span>
                          </Button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && (
            <div className="alert alert-warning">
              <Translate contentKey="gestionUniversitaireApp.groupe.home.notFound">No Groupes found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Groupe;
