import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { Translate, getSortState } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';
import { ASC, DESC } from 'app/shared/util/pagination.constants';
import { overrideSortStateWithQueryParams } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getEntities } from './niveau.reducer';

export const Niveau = () => {
  const dispatch = useAppDispatch();
  const pageLocation = useLocation();
  const navigate = useNavigate();

  const [sortState, setSortState] = useState(overrideSortStateWithQueryParams(getSortState(pageLocation, 'id'), pageLocation.search));
  const [searchTerm, setSearchTerm] = useState('');

  const niveauList = useAppSelector(state => state.niveau.entities);
  const loading = useAppSelector(state => state.niveau.loading);

  const getAllEntities = () => {
    dispatch(
      getEntities({
        sort: `${sortState.sort},${sortState.order}`,
        search: searchTerm,
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
  }, [sortState.order, sortState.sort, searchTerm]);

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

  const filteredNiveauList = niveauList.filter(niveau => {
    const searchLower = searchTerm.toLowerCase();

    return (
      niveau.nom.toLowerCase().includes(searchLower) ||
      // Add more fields as needed
      niveau.filieres.some(filiere => filiere.nom.toLowerCase().includes(searchLower))
    );
  });

  return (
    <div>
      <h2 id="niveau-heading" data-cy="NiveauHeading">
        <Translate contentKey="gestionUniversitaireApp.niveau.home.title">Niveaux</Translate>
        <div className="d-flex justify-content-end">
          <div className="me-2">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="form-control form-control-sm"
            />
          </div>
          <Button className="me-2 btn-sm" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="gestionUniversitaireApp.niveau.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to="/niveau/new" className="btn btn-primary btn-sm jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="gestionUniversitaireApp.niveau.home.createLabel">Create new Niveau</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {filteredNiveauList && filteredNiveauList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th className="hand" onClick={sort('id')}>
                  <Translate contentKey="gestionUniversitaireApp.niveau.id">ID</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('id')} />
                </th>
                <th className="hand" onClick={sort('nom')}>
                  <Translate contentKey="gestionUniversitaireApp.niveau.nom">Nom</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('nom')} />
                </th>
                <th>
                  <Translate contentKey="gestionUniversitaireApp.niveau.filiere">Filiere</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {filteredNiveauList.map((niveau, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/niveau/${niveau.id}`} color="link" size="sm">
                      {niveau.id}
                    </Button>
                  </td>
                  <td>{niveau.nom}</td>
                  <td>
                    {niveau.filieres
                      ? niveau.filieres.map((val, j) => (
                          <span key={j}>
                            <Link to={`/filiere/${val.id}`}>{val.nom}</Link>
                            {j === niveau.filieres.length - 1 ? '' : ', '}
                          </span>
                        ))
                      : null}
                  </td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`/niveau/${niveau.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`/niveau/${niveau.id}/edit`} color="primary" size="sm" data-cy="entityEditButton">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button
                        onClick={() => (location.href = `/niveau/${niveau.id}/delete`)}
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
              <Translate contentKey="gestionUniversitaireApp.niveau.home.notFound">No Niveaus found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Niveau;
