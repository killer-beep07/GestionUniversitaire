import { IExamen } from 'app/shared/model/examen.model';

export interface ISalleExamen {
  id?: number;
  nom?: string | null;
  capacite?: number | null;
  disponibilite?: boolean | null;
  localisation?: string | null;
  examen?: IExamen[] | null;
}

export const defaultValue: Readonly<ISalleExamen> = {
  disponibilite: false,
};
