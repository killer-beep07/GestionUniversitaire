import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { ISalleExamen } from 'app/shared/model/salle-examen.model';
import { getEntities as getSalleExamen } from 'app/entities/salle-examen/salle-examen.reducer';
import { IGroupe } from 'app/shared/model/groupe.model';
import { getEntities as getGroupes } from 'app/entities/groupe/groupe.reducer';
import { IExamen } from 'app/shared/model/examen.model';
import { getEntity, updateEntity, createEntity, reset } from './examen.reducer';

export const ExamenUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const salleExamen = useAppSelector(state => state.salleExamen.entities);
  const groupes = useAppSelector(state => state.groupe.entities);
  const examenEntity = useAppSelector(state => state.examen.entity);
  const loading = useAppSelector(state => state.examen.loading);
  const updating = useAppSelector(state => state.examen.updating);
  const updateSuccess = useAppSelector(state => state.examen.updateSuccess);

  const handleClose = () => {
    navigate('/examen');
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getSalleExamen({}));
    dispatch(getGroupes({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  // eslint-disable-next-line complexity
  const saveEntity = values => {
    if (values.id !== undefined && typeof values.id !== 'number') {
      values.id = Number(values.id);
    }

    const entity = {
      ...examenEntity,
      ...values,
      salleExamen: mapIdList(values.salleExamen),
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
          ...examenEntity,
          salleExamen: examenEntity?.salleExamen?.map(e => e.id.toString()),
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="gestionUniversitaireApp.examen.home.createOrEditLabel" data-cy="ExamenCreateUpdateHeading">
            <Translate contentKey="gestionUniversitaireApp.examen.home.createOrEditLabel">Create or edit a Examen</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
              <br />
              {/* {!isNew ? (
                <ValidatedField
                  name="id"
                  required
                  readOnly
                  id="examen-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null} */}
              <ValidatedField
                label={translate('gestionUniversitaireApp.examen.nom')}
                id="examen-nom"
                name="nom"
                data-cy="nom"
                type="text"
              />
              <ValidatedField
                label={translate('gestionUniversitaireApp.examen.date')}
                id="examen-date"
                name="date"
                data-cy="date"
                type="date"
              />
              <ValidatedField
                label={translate('gestionUniversitaireApp.examen.heureDebut')}
                id="examen-heureDebut"
                name="heureDebut"
                data-cy="heureDebut"
                type="text"
              />
              <ValidatedField
                label={translate('gestionUniversitaireApp.examen.heureFin')}
                id="examen-heureFin"
                name="heureFin"
                data-cy="heureFin"
                type="text"
              />
              <ValidatedField
                label={translate('gestionUniversitaireApp.examen.salleExamen')}
                id="examen-salleExamen"
                data-cy="salleExamen"
                type="select"
                multiple
                name="salleExamen"
              >
                <option value="" key="0" />
                {salleExamen
                  ? salleExamen.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.nom}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/examen" replace color="info">
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

export default ExamenUpdate;
