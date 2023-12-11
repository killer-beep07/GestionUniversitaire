import { ISalleExamen } from 'app/shared/model/salle-examen.model';
import { IGroupe } from 'app/shared/model/groupe.model';

export interface IExamen {
  id?: number;
  nom?: string | null;
  date?: string | null;
  heureDebut?: string | null;
  heureFin?: string | null;
  salleExamen?: ISalleExamen[] | null;
  groupes?: IGroupe[] | null;
}

export const defaultValue: Readonly<IExamen> = {};
