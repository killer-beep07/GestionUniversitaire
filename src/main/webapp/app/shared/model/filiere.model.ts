import { IGroupe } from 'app/shared/model/groupe.model';
import { INiveau } from 'app/shared/model/niveau.model';

export interface IFiliere {
  id?: number;
  nom?: string | null;
  groupes?: IGroupe[] | null;
  niveaus?: INiveau[] | null;
}

export const defaultValue: Readonly<IFiliere> = {};
