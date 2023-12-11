import { IFiliere } from 'app/shared/model/filiere.model';

export interface INiveau {
  id?: number;
  nom?: string | null;
  filieres?: IFiliere[] | null;
}

export const defaultValue: Readonly<INiveau> = {};
