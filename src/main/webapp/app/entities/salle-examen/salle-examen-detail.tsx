import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './salle-examen.reducer';

export const SalleExamenDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const salleExamenEntity = useAppSelector(state => state.salleExamen.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="salleExamenDetailsHeading">
          <Translate contentKey="gestionUniversitaireApp.salleExamen.detail.title">SalleExamen</Translate>
        </h2>
        <dl className="jh-entity-details">
          <br />
          {/* <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{salleExamenEntity.id}</dd> */}
          <dt>
            <span id="nom">
              <Translate contentKey="gestionUniversitaireApp.salleExamen.nom">Nom</Translate>
            </span>
          </dt>
          <dd>{salleExamenEntity.nom}</dd>
          <dt>
            <span id="capacite">
              <Translate contentKey="gestionUniversitaireApp.salleExamen.capacite">Capacite</Translate>
            </span>
          </dt>
          <dd>{salleExamenEntity.capacite}</dd>
          <dt>
            <span id="disponibilite">
              <Translate contentKey="gestionUniversitaireApp.salleExamen.disponibilite">Disponibilite</Translate>
            </span>
          </dt>
          <dd>{salleExamenEntity.disponibilite ? 'true' : 'false'}</dd>
          <dt>
            <span id="localisation">
              <Translate contentKey="gestionUniversitaireApp.salleExamen.localisation">Localisation</Translate>
            </span>
          </dt>
          <dd>{salleExamenEntity.localisation}</dd>
        </dl>
        <Button tag={Link} to="/salle-examen" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/salle-examen/${salleExamenEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default SalleExamenDetail;
