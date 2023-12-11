import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IExamen } from 'app/shared/model/examen.model';
import { getEntities as getExamen } from 'app/entities/examen/examen.reducer';
import { ISalleExamen } from 'app/shared/model/salle-examen.model';
import { getEntity, updateEntity, createEntity, reset } from './salle-examen.reducer';

export const SalleExamenUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const examen = useAppSelector(state => state.examen.entities);
  const salleExamenEntity = useAppSelector(state => state.salleExamen.entity);
  const loading = useAppSelector(state => state.salleExamen.loading);
  const updating = useAppSelector(state => state.salleExamen.updating);
  const updateSuccess = useAppSelector(state => state.salleExamen.updateSuccess);

  const handleClose = () => {
    navigate('/salle-examen');
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getExamen({}));
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
    if (values.capacite !== undefined && typeof values.capacite !== 'number') {
      values.capacite = Number(values.capacite);
    }

    const entity = {
      ...salleExamenEntity,
      ...values,
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
          ...salleExamenEntity,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="gestionUniversitaireApp.salleExamen.home.createOrEditLabel" data-cy="SalleExamenCreateUpdateHeading">
            <Translate contentKey="gestionUniversitaireApp.salleExamen.home.createOrEditLabel">Create or edit a SalleExamen</Translate>
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
                  id="salle-examen-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('gestionUniversitaireApp.salleExamen.nom')}
                id="salle-examen-nom"
                name="nom"
                data-cy="nom"
                type="text"
              />
              <ValidatedField
                label={translate('gestionUniversitaireApp.salleExamen.capacite')}
                id="salle-examen-capacite"
                name="capacite"
                data-cy="capacite"
                type="text"
              />
              <ValidatedField
                label={translate('gestionUniversitaireApp.salleExamen.disponibilite')}
                id="salle-examen-disponibilite"
                name="disponibilite"
                data-cy="disponibilite"
                check
                type="checkbox"
              />
              <ValidatedField
                label={translate('gestionUniversitaireApp.salleExamen.localisation')}
                id="salle-examen-localisation"
                name="localisation"
                data-cy="localisation"
                type="text"
              />
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/salle-examen" replace color="info">
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

export default SalleExamenUpdate;
