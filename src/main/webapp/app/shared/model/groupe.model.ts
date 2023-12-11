import { IExamen } from 'app/shared/model/examen.model';
import { IFiliere } from 'app/shared/model/filiere.model';

export interface IGroupe {
  id?: number;
  nom?: string | null;
  examen?: IExamen[] | null;
  filiere?: IFiliere | null;
}

export const defaultValue: Readonly<IGroupe> = {};
