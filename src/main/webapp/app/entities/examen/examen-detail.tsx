import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT, AUTHORITIES } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './examen.reducer';
import { hasAnyAuthority } from 'app/shared/auth/private-route';

export const ExamenDetail = () => {
  const dispatch = useAppDispatch();
  const isAdmin = useAppSelector(state => hasAnyAuthority(state.authentication.account.authorities, [AUTHORITIES.ADMIN]));
  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const examenEntity = useAppSelector(state => state.examen.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="examenDetailsHeading">
          <Translate contentKey="gestionUniversitaireApp.examen.detail.title">Examen</Translate>
        </h2>
        <dl className="jh-entity-details">
          <br />

          <dt>
            <span id="nom">
              <Translate contentKey="gestionUniversitaireApp.examen.nom">Nom</Translate>
            </span>
          </dt>
          <dd>{examenEntity.nom}</dd>
          <dt>
            <span id="date">
              <Translate contentKey="gestionUniversitaireApp.examen.date">Date</Translate>
            </span>
          </dt>
          <dd>{examenEntity.date ? <TextFormat value={examenEntity.date} type="date" format={APP_LOCAL_DATE_FORMAT} /> : null}</dd>
          <dt>
            <span id="heureDebut">
              <Translate contentKey="gestionUniversitaireApp.examen.heureDebut">Heure Debut</Translate>
            </span>
          </dt>
          <dd>{examenEntity.heureDebut}</dd>
          <dt>
            <span id="heureFin">
              <Translate contentKey="gestionUniversitaireApp.examen.heureFin">Heure Fin</Translate>
            </span>
          </dt>
          <dd>{examenEntity.heureFin}</dd>
          <dt>
            <Translate contentKey="gestionUniversitaireApp.examen.salleExamen">Salle Examen</Translate>
          </dt>
          <dd>
            {examenEntity.salleExamen
              ? examenEntity.salleExamen.map((val, i) => (
                  <span key={val.id}>
                    {val.nom}
                    {examenEntity.salleExamen && i === examenEntity.salleExamen.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
        </dl>
        <Button tag={Link} to="/examen" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        {isAdmin && (
          <>
            <Button tag={Link} to={`/examen/${examenEntity.id}/edit`} replace color="primary">
              <FontAwesomeIcon icon="pencil-alt" />{' '}
              <span className="d-none d-md-inline">
                <Translate contentKey="entity.action.edit">Edit</Translate>
              </span>
            </Button>
          </>
        )}
      </Col>
    </Row>
  );
};

export default ExamenDetail;
