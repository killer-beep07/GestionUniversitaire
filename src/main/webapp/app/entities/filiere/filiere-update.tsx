import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { INiveau } from 'app/shared/model/niveau.model';
import { getEntities as getNiveaus } from 'app/entities/niveau/niveau.reducer';
import { IFiliere } from 'app/shared/model/filiere.model';
import { getEntity, updateEntity, createEntity, reset } from './filiere.reducer';

export const FiliereUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const niveaus = useAppSelector(state => state.niveau.entities);
  const filiereEntity = useAppSelector(state => state.filiere.entity);
  const loading = useAppSelector(state => state.filiere.loading);
  const updating = useAppSelector(state => state.filiere.updating);
  const updateSuccess = useAppSelector(state => state.filiere.updateSuccess);

  const handleClose = () => {
    navigate('/filiere');
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getNiveaus({}));
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
      ...filiereEntity,
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
          ...filiereEntity,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="gestionUniversitaireApp.filiere.home.createOrEditLabel" data-cy="FiliereCreateUpdateHeading">
            <Translate contentKey="gestionUniversitaireApp.filiere.home.createOrEditLabel">Create or edit a Filiere</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
              {/* {!isNew ? (
                <ValidatedField
                  name="id"
                  required
                  readOnly
                  id="filiere-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null} */}
              <ValidatedField
                label={translate('gestionUniversitaireApp.filiere.nom')}
                id="filiere-nom"
                name="nom"
                data-cy="nom"
                type="text"
              />
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/filiere" replace color="info">
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

export default FiliereUpdate;
