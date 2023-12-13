import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { Translate, TextFormat, getSortState } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ASC, DESC, SORT } from 'app/shared/util/pagination.constants';
import { overrideSortStateWithQueryParams } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntities } from './examen.reducer';

export const Examen = () => {
  const dispatch = useAppDispatch();

  const pageLocation = useLocation();
  const navigate = useNavigate();

  const [sortState, setSortState] = useState(overrideSortStateWithQueryParams(getSortState(pageLocation, 'id'), pageLocation.search));

  const examenList = useAppSelector(state => state.examen.entities);
  const loading = useAppSelector(state => state.examen.loading);

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
      <h2 id="examen-heading" data-cy="ExamenHeading">
        <Translate contentKey="gestionUniversitaireApp.examen.home.title">Examen</Translate>
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="gestionUniversitaireApp.examen.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to="/examen/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="gestionUniversitaireApp.examen.home.createLabel">Create new Examen</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {examenList && examenList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th className="hand" onClick={sort('id')}>
                  <Translate contentKey="gestionUniversitaireApp.examen.id">ID</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('id')} />
                </th>
                <th className="hand" onClick={sort('nom')}>
                  <Translate contentKey="gestionUniversitaireApp.examen.nom">Nom</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('nom')} />
                </th>
                <th className="hand" onClick={sort('date')}>
                  <Translate contentKey="gestionUniversitaireApp.examen.date">Date</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('date')} />
                </th>
                <th className="hand" onClick={sort('heureDebut')}>
                  <Translate contentKey="gestionUniversitaireApp.examen.heureDebut">Heure Debut</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('heureDebut')} />
                </th>
                <th className="hand" onClick={sort('heureFin')}>
                  <Translate contentKey="gestionUniversitaireApp.examen.heureFin">Heure Fin</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('heureFin')} />
                </th>
                <th>
                  <Translate contentKey="gestionUniversitaireApp.examen.salleExamen">Salle Examen</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {examenList.map((examen, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/examen/${examen.id}`} color="link" size="sm">
                      {examen.id}
                    </Button>
                  </td>
                  <td>{examen.nom}</td>
                  <td>{examen.date ? <TextFormat type="date" value={examen.date} format={APP_LOCAL_DATE_FORMAT} /> : null}</td>
                  <td>{examen.heureDebut}</td>
                  <td>{examen.heureFin}</td>
                  <td>
                    {examen.salleExamen
                      ? examen.salleExamen.map((val, j) => (
                          <span key={j}>
                            <Link to={`/salle-examen/${val.id}`}>{val.nom}</Link>
                            {j === examen.salleExamen.length - 1 ? '' : ', '}
                          </span>
                        ))
                      : null}
                  </td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`/examen/${examen.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`/examen/${examen.id}/edit`} color="primary" size="sm" data-cy="entityEditButton">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button
                        onClick={() => (location.href = `/examen/${examen.id}/delete`)}
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
              <Translate contentKey="gestionUniversitaireApp.examen.home.notFound">No Examen found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Examen;
