import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './groupe.reducer';

export const GroupeDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const groupeEntity = useAppSelector(state => state.groupe.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="groupeDetailsHeading">
          <Translate contentKey="gestionUniversitaireApp.groupe.detail.title">Groupe</Translate>
        </h2>
        <dl className="jh-entity-details">
          <br />
          {/* <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{groupeEntity.id}</dd> */}
          <dt>
            <span id="nom">
              <Translate contentKey="gestionUniversitaireApp.groupe.nom">Nom</Translate>
            </span>
          </dt>
          <dd>{groupeEntity.nom}</dd>
          <dt>
            <Translate contentKey="gestionUniversitaireApp.groupe.niveau">Niveau</Translate>
          </dt>
          <dd>{groupeEntity.niveau ? groupeEntity.niveau.id : ''}</dd>
          <dt>
            <Translate contentKey="gestionUniversitaireApp.groupe.examen">Examen</Translate>
          </dt>
          <dd>
            {groupeEntity.examen
              ? groupeEntity.examen.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.nom}</a>
                    {groupeEntity.examen && i === groupeEntity.examen.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
          <dt>
            <Translate contentKey="gestionUniversitaireApp.groupe.filiere">Filiere</Translate>
          </dt>
          <dd>{groupeEntity.filiere ? groupeEntity.filiere.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/groupe" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/groupe/${groupeEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default GroupeDetail;
