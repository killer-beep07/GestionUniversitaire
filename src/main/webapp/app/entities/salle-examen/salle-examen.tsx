import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { Translate, getSortState } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';
import { ASC, DESC, SORT } from 'app/shared/util/pagination.constants';
import { overrideSortStateWithQueryParams } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntities } from './salle-examen.reducer';

export const SalleExamen = () => {
  const dispatch = useAppDispatch();

  const pageLocation = useLocation();
  const navigate = useNavigate();

  const [sortState, setSortState] = useState(overrideSortStateWithQueryParams(getSortState(pageLocation, 'id'), pageLocation.search));

  const salleExamenList = useAppSelector(state => state.salleExamen.entities);
  const loading = useAppSelector(state => state.salleExamen.loading);

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
      <h2 id="salle-examen-heading" data-cy="SalleExamenHeading">
        <Translate contentKey="gestionUniversitaireApp.salleExamen.home.title">Salle Examen</Translate>
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="gestionUniversitaireApp.salleExamen.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to="/salle-examen/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="gestionUniversitaireApp.salleExamen.home.createLabel">Create new Salle Examen</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {salleExamenList && salleExamenList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th className="hand" onClick={sort('id')}>
                  <Translate contentKey="gestionUniversitaireApp.salleExamen.id">ID</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('id')} />
                </th>
                <th className="hand" onClick={sort('nom')}>
                  <Translate contentKey="gestionUniversitaireApp.salleExamen.nom">Nom</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('nom')} />
                </th>
                <th className="hand" onClick={sort('capacite')}>
                  <Translate contentKey="gestionUniversitaireApp.salleExamen.capacite">Capacite</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('capacite')} />
                </th>
                <th className="hand" onClick={sort('disponibilite')}>
                  <Translate contentKey="gestionUniversitaireApp.salleExamen.disponibilite">Disponibilite</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('disponibilite')} />
                </th>
                <th className="hand" onClick={sort('localisation')}>
                  <Translate contentKey="gestionUniversitaireApp.salleExamen.localisation">Localisation</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('localisation')} />
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {salleExamenList.map((salleExamen, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/salle-examen/${salleExamen.id}`} color="link" size="sm">
                      {salleExamen.id}
                    </Button>
                  </td>
                  <td>{salleExamen.nom}</td>
                  <td>{salleExamen.capacite}</td>
                  <td>{salleExamen.disponibilite ? 'true' : 'false'}</td>
                  <td>{salleExamen.localisation}</td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`/salle-examen/${salleExamen.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>

                      <Button tag={Link} to={`/salle-examen/${salleExamen.id}/edit`} color="primary" size="sm" data-cy="entityEditButton">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button
                        onClick={() => (location.href = `/salle-examen/${salleExamen.id}/delete`)}
                        color="danger"
                        size="sm"
                        data-cy="entityDeleteButton"
                      >
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && (
            <div className="alert alert-warning">
              <Translate contentKey="gestionUniversitaireApp.salleExamen.home.notFound">No Salle Examen found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default SalleExamen;
