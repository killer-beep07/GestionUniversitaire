import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './etudiant.reducer';

export const EtudiantDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();
  const [niveauNoms, setNiveauNoms] = useState({});
  const [filiereNoms, setFiliereNoms] = useState({});
  const [groupeNoms, setGroupeNoms] = useState({});
  const etudiantList = useAppSelector(state => state.etudiant.entities);
  const loading = useAppSelector(state => state.etudiant.loading);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [etudiantEntity, niveauNom, filiereNom, groupeNom] = await Promise.all([
          dispatch(getEntity(id)),
          fetch(`/api/etudiants/${id}/niveau-nom`).then(response => response.text()),
          fetch(`/api/etudiants/${id}/filiere-nom`).then(response => response.text()),
          fetch(`/api/etudiants/${id}/groupe-nom`).then(response => response.text()),
        ]);

        setNiveauNoms({ [id]: niveauNom });
        setFiliereNoms({ [id]: filiereNom });
        setGroupeNoms({ [id]: groupeNom });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [id, dispatch]);

  const etudiantEntity = useAppSelector(state => state.etudiant.entity);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Row>
      <Col md="8">
        <h2 data-cy="etudiantDetailsHeading">
          <Translate contentKey="gestionUniversitaireApp.etudiant.detail.title">Etudiant</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="nom">
              <Translate contentKey="gestionUniversitaireApp.etudiant.nom">Nom</Translate>
            </span>
          </dt>
          <dd>{etudiantEntity.nom}</dd>
          <dt>
            <span id="prenom">
              <Translate contentKey="gestionUniversitaireApp.etudiant.prenom">Prenom</Translate>
            </span>
          </dt>
          <dd>{etudiantEntity.prenom}</dd>
          <dt>
            <span id="dateNaissance">
              <Translate contentKey="gestionUniversitaireApp.etudiant.dateNaissance">Date Naissance</Translate>
            </span>
          </dt>
          <dd>
            {etudiantEntity.dateNaissance ? (
              <TextFormat value={etudiantEntity.dateNaissance} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="lieuNaissance">
              <Translate contentKey="gestionUniversitaireApp.etudiant.lieuNaissance">Lieu Naissance</Translate>
            </span>
          </dt>
          <dd>{etudiantEntity.lieuNaissance}</dd>
          <dt>
            <span id="cne">
              <Translate contentKey="gestionUniversitaireApp.etudiant.cne">Cne</Translate>
            </span>
          </dt>
          <dd>{etudiantEntity.cne}</dd>
          <dt>
            <span id="cni">
              <Translate contentKey="gestionUniversitaireApp.etudiant.cni">Cni</Translate>
            </span>
          </dt>
          <dd>{etudiantEntity.cni}</dd>
          <dt>
            <span id="mail">
              <Translate contentKey="gestionUniversitaireApp.etudiant.mail">Mail</Translate>
            </span>
          </dt>
          <dd>{etudiantEntity.mail}</dd>
          <dt>
            <span id="gsm">
              <Translate contentKey="gestionUniversitaireApp.etudiant.gsm">Gsm</Translate>
            </span>
          </dt>
          <dd>{etudiantEntity.gsm}</dd>

          <dt>
            <Translate contentKey="gestionUniversitaireApp.etudiant.groupe">Groupe</Translate>
          </dt>
          <dd>{groupeNoms[id]}</dd>

          <dt>
            <span id="niveau">
              <Translate contentKey="gestionUniversitaireApp.etudiant.niveau">Niveau</Translate>
            </span>
          </dt>
          <dd>{niveauNoms[id]}</dd>

          <dt>
            <Translate contentKey="gestionUniversitaireApp.etudiant.filiere">Filiere</Translate>
          </dt>
          <dd>{filiereNoms[id]}</dd>
        </dl>
        <Button tag={Link} to="/etudiant" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/etudiant/${etudiantEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default EtudiantDetail;
