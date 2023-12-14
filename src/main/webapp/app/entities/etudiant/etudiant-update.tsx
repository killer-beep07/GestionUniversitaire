import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IGroupe } from 'app/shared/model/groupe.model';
import { getEntities as getGroupes } from 'app/entities/groupe/groupe.reducer';
import { INiveau } from 'app/shared/model/niveau.model';
import { getEntities as getNiveaus } from 'app/entities/niveau/niveau.reducer';
import { IFiliere } from 'app/shared/model/filiere.model';
import { getEntities as getFilieres } from 'app/entities/filiere/filiere.reducer';
import { IEtudiant } from 'app/shared/model/etudiant.model';
import { getEntity, updateEntity, createEntity, reset } from './etudiant.reducer';

export const EtudiantUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;
  const [niveauNoms, setNiveauNoms] = useState({}); // State to store niveau names
  const [filiereNoms, setFiliereNoms] = useState({}); // State to store filiere names
  const [groupeNoms, setGroupeNoms] = useState({});
  const groupes = useAppSelector(state => state.groupe.entities);
  const niveaus = useAppSelector(state => state.niveau.entities);
  const filieres = useAppSelector(state => state.filiere.entities);
  const etudiantEntity = useAppSelector(state => state.etudiant.entity);
  const loading = useAppSelector(state => state.etudiant.loading);
  const updating = useAppSelector(state => state.etudiant.updating);
  const updateSuccess = useAppSelector(state => state.etudiant.updateSuccess);

  const handleClose = () => {
    navigate('/etudiant');
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getGroupes({}));
    dispatch(getNiveaus({}));
    dispatch(getFilieres({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);
  useEffect(() => {
    const fetchFiliereNoms = async () => {
      const response = await fetch('/api/groupes/filiere-noms');
      const data = await response.json();
      setFiliereNoms(data);
    };

    const fetchNiveauNoms = async () => {
      const response = await fetch('/api/groupes/niveau-noms');
      const data = await response.json();
      setNiveauNoms(data);
    };
    const fetchGroupeNoms = async () => {
      const response = await fetch('/api/groupes/groupe-noms');
      const data = await response.json();
      setGroupeNoms(data);
    };

    // Appelez les deux méthodes API en parallèle
    Promise.all([fetchFiliereNoms(), fetchNiveauNoms()]);
  }, []);
  // eslint-disable-next-line complexity
  const saveEntity = values => {
    if (values.id !== undefined && typeof values.id !== 'number') {
      values.id = Number(values.id);
    }

    const entity = {
      ...etudiantEntity,
      ...values,
      groupe: groupes.find(it => it.id.toString() === values.groupe.toString()),
      niveau: niveaus.find(it => it.id.toString() === values.niveau.toString()),
      filiere: filieres.find(it => it.id.toString() === values.filiere.toString()),
    };

    if (isNew) {
      dispatch(createEntity(entity));
    } else {
      dispatch(updateEntity(entity));
    }
  };

  const defaultValues = () =>
    isNew
      ? {}
      : {
          ...etudiantEntity,
          groupe: etudiantEntity?.groupe?.id,
          niveau: etudiantEntity?.niveau?.id,
          filiere: etudiantEntity?.filiere?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="gestionUniversitaireApp.etudiant.home.createOrEditLabel" data-cy="EtudiantCreateUpdateHeading">
            <Translate contentKey="gestionUniversitaireApp.etudiant.home.createOrEditLabel">Create or edit a Etudiant</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
              {!isNew ? (
                <ValidatedField
                  name="id"
                  required
                  readOnly
                  id="etudiant-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <br />
              <ValidatedField
                label={translate('gestionUniversitaireApp.etudiant.nom')}
                id="etudiant-nom"
                name="nom"
                data-cy="nom"
                type="text"
              />
              <ValidatedField
                label={translate('gestionUniversitaireApp.etudiant.prenom')}
                id="etudiant-prenom"
                name="prenom"
                data-cy="prenom"
                type="text"
              />
              <ValidatedField
                label={translate('gestionUniversitaireApp.etudiant.dateNaissance')}
                id="etudiant-dateNaissance"
                name="dateNaissance"
                data-cy="dateNaissance"
                type="date"
              />
              <ValidatedField
                label={translate('gestionUniversitaireApp.etudiant.lieuNaissance')}
                id="etudiant-lieuNaissance"
                name="lieuNaissance"
                data-cy="lieuNaissance"
                type="text"
              />
              <ValidatedField
                label={translate('gestionUniversitaireApp.etudiant.cne')}
                id="etudiant-cne"
                name="cne"
                data-cy="cne"
                type="text"
              />
              <ValidatedField
                label={translate('gestionUniversitaireApp.etudiant.cni')}
                id="etudiant-cni"
                name="cni"
                data-cy="cni"
                type="text"
              />
              <ValidatedField
                label={translate('gestionUniversitaireApp.etudiant.mail')}
                id="etudiant-mail"
                name="mail"
                data-cy="mail"
                type="text"
              />
              <ValidatedField
                label={translate('gestionUniversitaireApp.etudiant.gsm')}
                id="etudiant-gsm"
                name="gsm"
                data-cy="gsm"
                type="text"
              />
              <ValidatedField
                id="etudiant-groupe"
                name="groupe"
                data-cy="groupe"
                label={translate('gestionUniversitaireApp.etudiant.groupe')}
                type="select"
              >
                <option value="" key="0" />
                {groupes
                  ? groupes.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.nom}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <ValidatedField
                id="etudiant-niveau"
                name="niveau"
                data-cy="niveau"
                label={translate('gestionUniversitaireApp.etudiant.niveau')}
                type="select"
              >
                <option value="" key="0" />
                {niveaus
                  ? niveaus.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.nom}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <ValidatedField
                id="etudiant-filiere"
                name="filiere"
                data-cy="filiere"
                label={translate('gestionUniversitaireApp.etudiant.filiere')}
                type="select"
              >
                <option value="" key="0" />
                {filieres
                  ? filieres.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.nom}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/etudiant" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" data-cy="entityCreateSaveButton" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </ValidatedForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default EtudiantUpdate;
