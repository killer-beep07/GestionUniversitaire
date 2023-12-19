import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { Translate, TextFormat, getSortState } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';
import { ASC, DESC } from 'app/shared/util/pagination.constants';
import { overrideSortStateWithQueryParams } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getEntities } from './etudiant.reducer';
import { APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export const Etudiant = () => {
  const dispatch = useAppDispatch();
  const pageLocation = useLocation();
  const navigate = useNavigate();

  const [sortState, setSortState] = useState(overrideSortStateWithQueryParams(getSortState(pageLocation, 'id'), pageLocation.search));
  const [niveauNoms, setNiveauNoms] = useState({});
  const [filiereNoms, setFiliereNoms] = useState({});
  const [groupeNoms, setGroupeNoms] = useState({});
  const [searchTerm, setSearchTerm] = useState('');

  const etudiantList = useAppSelector(state => state.etudiant.entities);
  const loading = useAppSelector(state => state.etudiant.loading);

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
  }, [sortState.order, sortState.sort]);

  useEffect(() => {
    const fetchNiveauAndFiliereandGroupeNames = async () => {
      await Promise.all(
        etudiantList.map(async etudiant => {
          const niveauNomResponse = await fetch(`/api/etudiants/${etudiant.id}/niveau-nom`);
          const filiereNomResponse = await fetch(`/api/etudiants/${etudiant.id}/filiere-nom`);
          const groupeNomResponse = await fetch(`/api/etudiants/${etudiant.id}/groupe-nom`);
          const niveauNom = await niveauNomResponse.text();
          const filiereNom = await filiereNomResponse.text();
          const groupeNom = await groupeNomResponse.text();
          setNiveauNoms(prevState => ({ ...prevState, [etudiant.id]: niveauNom }));
          setFiliereNoms(prevState => ({ ...prevState, [etudiant.id]: filiereNom }));
          setGroupeNoms(prevState => ({ ...prevState, [etudiant.id]: groupeNom }));
        }),
      );
    };

    fetchNiveauAndFiliereandGroupeNames();
  }, [etudiantList]);

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
  const sort = (p: string) => () => {
    setSortState({
      ...sortState,
      order: sortState.order === ASC ? DESC : ASC,
      sort: p,
    });
  };

  const filteredEtudiantList = etudiantList.filter(etudiant => {
    const searchLower = searchTerm.toLowerCase();

    return (
      etudiant.nom.toLowerCase().includes(searchLower) ||
      etudiant.prenom.toLowerCase().includes(searchLower) ||
      (etudiant.dateNaissance && etudiant.dateNaissance.toLowerCase().includes(searchLower)) ||
      etudiant.lieuNaissance.toLowerCase().includes(searchLower) ||
      etudiant.cne.toLowerCase().includes(searchLower) ||
      etudiant.cni.toLowerCase().includes(searchLower) ||
      etudiant.mail.toLowerCase().includes(searchLower) ||
      etudiant.gsm.toLowerCase().includes(searchLower) ||
      groupeNoms[etudiant.id].toLowerCase().includes(searchLower) ||
      niveauNoms[etudiant.id].toLowerCase().includes(searchLower) ||
      filiereNoms[etudiant.id].toLowerCase().includes(searchLower)
      // Add more fields as needed
    );
  });
  return (
    <div>
      <h2 id="etudiant-heading" data-cy="EtudiantHeading">
        <Translate contentKey="gestionUniversitaireApp.etudiant.home.title">Etudiants</Translate>
        <div className="d-flex justify-content-end mb-2">
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
            <Translate contentKey="gestionUniversitaireApp.etudiant.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to="/etudiant/new" className="btn btn-primary btn-sm jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="gestionUniversitaireApp.etudiant.home.createLabel">Create new Etudiant</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {filteredEtudiantList && filteredEtudiantList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th className="hand" onClick={sort('id')}>
                  <Translate contentKey="gestionUniversitaireApp.etudiant.id">ID</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('id')} />
                </th>
                <th className="hand" onClick={sort('nom')}>
                  <Translate contentKey="gestionUniversitaireApp.etudiant.nom">Nom</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('nom')} />
                </th>
                <th className="hand" onClick={sort('prenom')}>
                  <Translate contentKey="gestionUniversitaireApp.etudiant.prenom">Prenom</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('prenom')} />
                </th>
                <th className="hand" onClick={sort('dateNaissance')}>
                  <Translate contentKey="gestionUniversitaireApp.etudiant.dateNaissance">Date Naissance</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('dateNaissance')} />
                </th>
                <th className="hand" onClick={sort('lieuNaissance')}>
                  <Translate contentKey="gestionUniversitaireApp.etudiant.lieuNaissance">Lieu Naissance</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('lieuNaissance')} />
                </th>
                <th className="hand" onClick={sort('cne')}>
                  <Translate contentKey="gestionUniversitaireApp.etudiant.cne">Cne</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('cne')} />
                </th>
                <th className="hand" onClick={sort('cni')}>
                  <Translate contentKey="gestionUniversitaireApp.etudiant.cni">Cni</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('cni')} />
                </th>
                <th className="hand" onClick={sort('mail')}>
                  <Translate contentKey="gestionUniversitaireApp.etudiant.mail">Mail</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('mail')} />
                </th>
                <th className="hand" onClick={sort('gsm')}>
                  <Translate contentKey="gestionUniversitaireApp.etudiant.gsm">Gsm</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('gsm')} />
                </th>
                <th>
                  <Translate contentKey="gestionUniversitaireApp.etudiant.groupe">Groupe</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  <Translate contentKey="gestionUniversitaireApp.etudiant.niveau">Niveau</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  <Translate contentKey="gestionUniversitaireApp.etudiant.filiere">Filiere</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {filteredEtudiantList.map((etudiant, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/etudiant/${etudiant.id}`} color="link" size="sm">
                      {etudiant.id}
                    </Button>
                  </td>
                  <td>{etudiant.nom}</td>
                  <td>{etudiant.prenom}</td>
                  <td>
                    {etudiant.dateNaissance ? (
                      <TextFormat type="date" value={etudiant.dateNaissance} format={APP_LOCAL_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>{etudiant.lieuNaissance}</td>
                  <td>{etudiant.cne}</td>
                  <td>{etudiant.cni}</td>
                  <td>{etudiant.mail}</td>
                  <td>{etudiant.gsm}</td>
                  <td>{groupeNoms[etudiant.id]}</td>
                  <td>{niveauNoms[etudiant.id]}</td>
                  <td>{filiereNoms[etudiant.id]}</td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`/etudiant/${etudiant.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`/etudiant/${etudiant.id}/edit`} color="primary" size="sm" data-cy="entityEditButton">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button
                        onClick={() => (window.location.href = `/etudiant/${etudiant.id}/delete`)}
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
              <Translate contentKey="gestionUniversitaireApp.etudiant.home.notFound">No Etudiants found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Etudiant;
