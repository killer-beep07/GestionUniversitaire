import { IGroupe } from 'app/shared/model/groupe.model';
import { INiveau } from 'app/shared/model/niveau.model';
import { IFiliere } from 'app/shared/model/filiere.model';

export interface IEtudiant {
  id?: number;
  nom?: string | null;
  prenom?: string | null;
  dateNaissance?: string | null;
  lieuNaissance?: string | null;
  cne?: string | null;
  cni?: string | null;
  mail?: string | null;
  gsm?: string | null;
  groupe?: IGroupe | null;
  niveau?: INiveau | null;
  filiere?: IFiliere | null;
}

export const defaultValue: Readonly<IEtudiant> = {};
