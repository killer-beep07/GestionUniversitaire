import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getEntity } from './groupe.reducer';
import { hasAnyAuthority } from 'app/shared/auth/private-route';
import { AUTHORITIES } from 'app/config/constants';

export const GroupeDetail = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams<'id'>();
  const [niveauNoms, setNiveauNoms] = useState({});
  const [filiereNoms, setFiliereNoms] = useState({});
  const groupeList = useAppSelector(state => state.groupe.entities);
  const [loading, setLoading] = useState(true);
  const isAdmin = useAppSelector(state => hasAnyAuthority(state.authentication.account.authorities, [AUTHORITIES.ADMIN]));
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [groupeEntity, niveauNoms, filiereNoms] = await Promise.all([
          dispatch(getEntity(id)),
          fetch(`/api/groupes/${id}/niveau-nom`).then(response => response.text()),
          fetch(`/api/groupes/${id}/filiere-nom`).then(response => response.text()),
        ]);

        setNiveauNoms({ [id]: niveauNoms });
        setFiliereNoms({ [id]: filiereNoms });
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [id, dispatch]);

  const groupeEntity = useAppSelector(state => state.groupe.entity);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Row>
      <Col md="8">
        <h2 data-cy="groupeDetailsHeading">
          <Translate contentKey="gestionUniversitaireApp.groupe.detail.title">Groupe</Translate>
        </h2>
        <dl className="jh-entity-details">
          <br />
          <dt>
            <span id="nom">
              <Translate contentKey="gestionUniversitaireApp.groupe.nom">Nom</Translate>
            </span>
          </dt>
          <dd>{groupeEntity.nom}</dd>
          <dt>
            <Translate contentKey="gestionUniversitaireApp.groupe.niveau">Niveau</Translate>
          </dt>
          <dd>{niveauNoms[id]}</dd>
          <dt>
            <Translate contentKey="gestionUniversitaireApp.groupe.examen">Examen</Translate>
          </dt>
          <dd>
            {groupeEntity.examen
              ? groupeEntity.examen.map((val, i) => (
                  <span key={val.id}>
                    {val.nom}
                    {groupeEntity.examen && i === groupeEntity.examen.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
          <dt>
            <Translate contentKey="gestionUniversitaireApp.groupe.filiere">Filiere</Translate>
          </dt>
          <dd>{filiereNoms[id]}</dd>
        </dl>
        <Button tag={Link} to="/groupe" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        {isAdmin && (
          <>
            <Button tag={Link} to={`/groupe/${groupeEntity.id}/edit`} replace color="primary">
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

export default GroupeDetail;
