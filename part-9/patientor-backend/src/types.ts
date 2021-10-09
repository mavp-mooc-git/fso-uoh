export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

/*export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}*/

export type Gender = 'male' | 'female' | 'other';

export interface Patients {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn?: string;
  gender: Gender;
  occupation: string;
}

export type NonSsnPatients = Omit<Patients, 'ssn'>;

export type NewPatientEntry = Omit<Patients, 'id'>;
