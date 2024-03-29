// import React, { useState, useEffect } from 'react';
// import { Link, useNavigate, useParams } from 'react-router-dom';
// import { Button, Row, Col, FormText } from 'reactstrap';
// import { isNumber, Translate, translate, ValidatedField, ValidatedForm } from 'react-jhipster';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
// import { mapIdList } from 'app/shared/util/entity-utils';
// import { useAppDispatch, useAppSelector } from 'app/config/store';

// import { INiveau } from 'app/shared/model/niveau.model';
// import { getEntities as getNiveaus } from 'app/entities/niveau/niveau.reducer';
// import { IExamen } from 'app/shared/model/examen.model';
// import { getEntities as getExamen } from 'app/entities/examen/examen.reducer';
// import { IFiliere } from 'app/shared/model/filiere.model';
// import { getEntities as getFilieres } from 'app/entities/filiere/filiere.reducer';
// import { IGroupe } from 'app/shared/model/groupe.model';
// import { getEntity, updateEntity, createEntity, reset } from './groupe.reducer';

// export const GroupeUpdate = () => {
//   const dispatch = useAppDispatch();

//   const navigate = useNavigate();

//   const { id } = useParams<'id'>();
//   const isNew = id === undefined;

//   const niveaus = useAppSelector(state => state.niveau.entities);
//   const examen = useAppSelector(state => state.examen.entities);
//   const filieres = useAppSelector(state => state.filiere.entities);
//   const groupeEntity = useAppSelector(state => state.groupe.entity);
//   const loading = useAppSelector(state => state.groupe.loading);
//   const updating = useAppSelector(state => state.groupe.updating);
//   const updateSuccess = useAppSelector(state => state.groupe.updateSuccess);

//   const handleClose = () => {
//     navigate('/groupe');
//   };

//   useEffect(() => {
//     if (isNew) {
//       dispatch(reset());
//     } else {
//       dispatch(getEntity(id));
//     }

//     dispatch(getNiveaus({}));
//     dispatch(getExamen({}));
//     dispatch(getFilieres({}));
//   }, []);

//   useEffect(() => {
//     if (updateSuccess) {
//       handleClose();
//     }
//   }, [updateSuccess]);

//   // eslint-disable-next-line complexity
//   const saveEntity = values => {
//     if (values.id !== undefined && typeof values.id !== 'number') {
//       values.id = Number(values.id);
//     }

//     const entity = {
//       ...groupeEntity,
//       ...values,
//       examen: mapIdList(values.examen),
//       niveau: niveaus.find(it => it.id.toString() === values.niveau.toString()),
//       filiere: filieres.find(it => it.id.toString() === values.filiere.toString()),
//     };

//     if (isNew) {
//       dispatch(createEntity(entity));
//     } else {
//       dispatch(updateEntity(entity));
//     }
//   };

//   const defaultValues = () =>
//     isNew
//       ? {}
//       : {
//           ...groupeEntity,
//           niveau: groupeEntity?.niveau?.id,
//           examen: groupeEntity?.examen?.map(e => e.id.toString()),
//           filiere: groupeEntity?.filiere?.id,
//         };

//   return (
//     <div>
//       <Row className="justify-content-center">
//         <Col md="8">
//           <h2 id="gestionUniversitaireApp.groupe.home.createOrEditLabel" data-cy="GroupeCreateUpdateHeading">
//             <Translate contentKey="gestionUniversitaireApp.groupe.home.createOrEditLabel">Create or edit a Groupe</Translate>
//           </h2>
//         </Col>
//       </Row>
//       <Row className="justify-content-center">
//         <Col md="8">
//           {loading ? (
//             <p>Loading...</p>
//           ) : (
//             <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
//               {/* {!isNew ? (
//                 <ValidatedField
//                   name="id"
//                   required
//                   readOnly
//                   id="groupe-id"
//                   label={translate('global.field.id')}
//                   validate={{ required: true }}
//                 />
//               ) : null} */}
//               <ValidatedField
//                 label={translate('gestionUniversitaireApp.groupe.nom')}
//                 id="groupe-nom"
//                 name="nom"
//                 data-cy="nom"
//                 type="text"
//               />
//               <ValidatedField
//                 id="groupe-niveau"
//                 name="niveau"
//                 data-cy="niveau"
//                 label={translate('gestionUniversitaireApp.groupe.niveau')}
//                 type="select"
//               >
//                 <option value="" key="0" />
//                 {niveaus
//                   ? niveaus.map(otherEntity => (
//                       <option value={otherEntity.id} key={otherEntity.id}>
//                         {otherEntity.id}
//                       </option>
//                     ))
//                   : null}
//               </ValidatedField>
//               <ValidatedField
//                 label={translate('gestionUniversitaireApp.groupe.examen')}
//                 id="groupe-examen"
//                 data-cy="examen"
//                 type="select"
//                 multiple
//                 name="examen"
//               >
//                 <option value="" key="0" />
//                 {examen
//                   ? examen.map(otherEntity => (
//                       <option value={otherEntity.id} key={otherEntity.id}>
//                         {otherEntity.id}
//                       </option>
//                     ))
//                   : null}
//               </ValidatedField>
//               <ValidatedField
//                 id="groupe-filiere"
//                 name="filiere"
//                 data-cy="filiere"
//                 label={translate('gestionUniversitaireApp.groupe.filiere')}
//                 type="select"
//               >
//                 <option value="" key="0" />
//                 {filieres
//                   ? filieres.map(otherEntity => (
//                       <option value={otherEntity.id} key={otherEntity.id}>
//                         {otherEntity.id}
//                       </option>
//                     ))
//                   : null}
//               </ValidatedField>
//               <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/groupe" replace color="info">
//                 <FontAwesomeIcon icon="arrow-left" />
//                 &nbsp;
//                 <span className="d-none d-md-inline">
//                   <Translate contentKey="entity.action.back">Back</Translate>
//                 </span>
//               </Button>
//               &nbsp;
//               <Button color="primary" id="save-entity" data-cy="entityCreateSaveButton" type="submit" disabled={updating}>
//                 <FontAwesomeIcon icon="save" />
//                 &nbsp;
//                 <Translate contentKey="entity.action.save">Save</Translate>
//               </Button>
//             </ValidatedForm>
//           )}
//         </Col>
//       </Row>
//     </div>
//   );
// };

// export default GroupeUpdate;
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
import { IExamen } from 'app/shared/model/examen.model';
import { getEntities as getExamen } from 'app/entities/examen/examen.reducer';
import { IFiliere } from 'app/shared/model/filiere.model';
import { getEntities as getFilieres } from 'app/entities/filiere/filiere.reducer';
import { IGroupe } from 'app/shared/model/groupe.model';
import { getEntity, updateEntity, createEntity, reset } from './groupe.reducer';

export const GroupeUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const niveaus = useAppSelector(state => state.niveau.entities);
  const examen = useAppSelector(state => state.examen.entities);
  const filieres = useAppSelector(state => state.filiere.entities);
  const groupeEntity = useAppSelector(state => state.groupe.entity);
  const loading = useAppSelector(state => state.groupe.loading);
  const updating = useAppSelector(state => state.groupe.updating);
  const updateSuccess = useAppSelector(state => state.groupe.updateSuccess);
  const [niveauNoms, setNiveauNoms] = useState({}); // State to store niveau names
  const [filiereNoms, setFiliereNoms] = useState({}); // State to store filiere names

  const groupeList = useAppSelector(state => state.groupe.entities);

  const handleClose = () => {
    navigate('/groupe');
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getNiveaus({}));
    dispatch(getExamen({}));
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

    // Appelez les deux méthodes API en parallèle
    Promise.all([fetchFiliereNoms(), fetchNiveauNoms()]);
  }, []); // Le tableau de dépendances est vide, cela signifie que useEffect s'exécutera une seule fois après le montage du composant

  // eslint-disable-next-line complexity
  const saveEntity = values => {
    if (values.id !== undefined && typeof values.id !== 'number') {
      values.id = Number(values.id);
    }

    const entity = {
      ...groupeEntity,
      ...values,
      examen: mapIdList(values.examen),
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
          ...groupeEntity,
          niveau: groupeEntity?.niveau?.id,
          examen: groupeEntity?.examen?.map(e => e.id.toString()),
          filiere: groupeEntity?.filiere?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="gestionUniversitaireApp.groupe.home.createOrEditLabel" data-cy="GroupeCreateUpdateHeading">
            <Translate contentKey="gestionUniversitaireApp.groupe.home.createOrEditLabel">Create or edit a Groupe</Translate>
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
                  id="groupe-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null} */}
              <ValidatedField
                label={translate('gestionUniversitaireApp.groupe.nom')}
                id="groupe-nom"
                name="nom"
                data-cy="nom"
                type="text"
              />
              {/* <ValidatedField
                id="groupe-niveau"
                name="niveau"
                data-cy="niveau"
                label={translate('gestionUniversitaireApp.groupe.niveau')}
                type="select"
              >
                <option value="" key="0" />
                {niveaus
                  ? niveaus.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField> */}
              <ValidatedField
                label={translate('gestionUniversitaireApp.groupe.examen')}
                id="groupe-examen"
                data-cy="examen"
                type="select"
                multiple
                name="examen"
              >
                <option value="" key="0" />
                {examen
                  ? examen.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.nom}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              {/* <ValidatedField
                id="groupe-filiere"
                name="filiere"
                data-cy="filiere"
                label={translate('gestionUniversitaireApp.groupe.filiere')}
                type="select"
              >
                <option value="" key="0" />
                {filieres
                  ? filieres.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField> */}
              <ValidatedField
                id="groupe-niveau"
                name="niveau"
                data-cy="niveau"
                label={translate('gestionUniversitaireApp.groupe.niveau')}
                type="select"
              >
                <option value="select niveau" key="0" />
                {niveaus
                  ? niveaus.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.nom}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <ValidatedField
                id="groupe-filiere"
                name="filiere"
                data-cy="filiere"
                label={translate('gestionUniversitaireApp.groupe.filiere')}
                type="select"
              >
                <option value="select filiere" key="0" />
                {filieres
                  ? filieres.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.nom}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/groupe" replace color="info">
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

export default GroupeUpdate;
