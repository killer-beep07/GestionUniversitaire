import etudiant from 'app/entities/etudiant/etudiant.reducer';
import niveau from 'app/entities/niveau/niveau.reducer';
import filiere from 'app/entities/filiere/filiere.reducer';
import groupe from 'app/entities/groupe/groupe.reducer';
import salleExamen from 'app/entities/salle-examen/salle-examen.reducer';
import examen from 'app/entities/examen/examen.reducer';
/* jhipster-needle-add-reducer-import - JHipster will add reducer here */

const entitiesReducers = {
  etudiant,
  niveau,
  filiere,
  groupe,
  salleExamen,
  examen,
  //planning,
  /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
};

export default entitiesReducers;
