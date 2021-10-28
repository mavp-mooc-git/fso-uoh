import {
  Diagnosis, Entry, Gender, HealthCheckRating, NewPatient, NonIdEntry
} from './types';
/* eslint-disable @typescript-eslint/no-explicit-any */

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

const isString = (text: any): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseName = (name: any): string => {
  if (!name || !isString(name)) {
    throw new Error('Incorrect or missing name: ' + name);
  }
  return name;
};

const parseDate = (date: any): string => {
  if (!date || !isString(date) || !isDate(date)) {
      throw new Error('Incorrect or missing dateOfBirth: ' + date);
  }
  return date;
};

const parseSsn = (ssn: any): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error('Incorrect or missing ssn: ' + ssn);
  }
  return ssn;
};

const parseGender = (gender: any): Gender => {
  if (!gender || !isGender(gender)) {
      throw new Error('Incorrect or missing gender: ' + gender);
  }
  return gender;
};

const parseOcupation = (occupation: any): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error('Incorrect or missing occupation: ' + occupation);
  }
  return occupation;
};

const parseEntry = (entries: Array<Entry>): Entry[] => entries;

const toNewPatient = (object: any): NewPatient => {
  return {
    name: parseName(object.name),
    dateOfBirth: parseDate(object.dateOfBirth),
    ssn: parseSsn(object.ssn),
    gender: parseGender(object.gender),
    occupation: parseOcupation(object.occupation),
    entries: parseEntry(object.entries)
  };
};

export default toNewPatient;


// Parse array entries

const parseString = (field: any, text: string): string => {
  if (!field || !isString(field)) {
    throw new Error(`Incorrect or missing ${text}: ${field}`);
  }
  return field;
};

const parseEntryDate = (date: any): string => {
  if (!date || !isString(date) || !isDate(date)) {
      throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
};

interface Discharge {
  date: string;
  criteria: string;
}

const isDischarge = (param: any): param is Discharge => {
  return (isString(param.date) && isString(param.criteria));
};

const parseDischarge = (discharge: any): Discharge => {
  if (!discharge || !isDischarge(discharge)) {
    throw new Error('Incorrect or missing discharge properties');
  }
  return discharge;
};

interface SickLeave {
  startDate: string;
  endDate: string;
}

const isSickLeave = (param: any): param is SickLeave => {
  return (isString(param.date) && isString(param.criteria));
};

const parseSickLeave = (sickLeave: any): SickLeave => {
  if (!sickLeave || !isSickLeave(sickLeave)) {
      throw new Error('Incorrect or missing sickLeave properties');
  }
  return sickLeave;
};

const isCheckRating = (healthCheckRating: number): boolean => {
  return Object.values(HealthCheckRating).includes(healthCheckRating);
};

const parseCheckEntry = (healthCheckRating: number): HealthCheckRating => {
  if (healthCheckRating == undefined || !isCheckRating(healthCheckRating)) {
      throw new Error('Incorrect or missing healthCheckRating: ' + healthCheckRating);
  }
  return healthCheckRating as HealthCheckRating;
};

const parseDiagnosis = (codes: Array<Diagnosis['code']>): Array<Diagnosis['code']> => codes;

export const toNewEntry = (object: any): NonIdEntry => {

  let entries: NonIdEntry;

  const base = {
    description: parseString(object.description, 'description'),
    date: parseEntryDate(object.date),
    specialist: parseString(object.specialist, 'specialist'),
    diagnosisCodes: parseDiagnosis(object.diagnosisCodes)
  };

  switch (object.type) {
    case 'Hospital':
      entries = {
        ...base,
        type: 'Hospital',
        discharge: parseDischarge(object.discharge)
      };
      return entries;
    case 'OccupationalHealthcare':
      entries = {
        ...base,
        type: 'OccupationalHealthcare',
        employerName: parseString(object.employerName, 'employerName'),
        sickLeave: parseSickLeave(object.sickLeave)
      };
      return entries;
    case 'HealthCheck':
      entries = {
        ...base,
        type: 'HealthCheck',
        healthCheckRating: parseCheckEntry(object.healthCheckRating)
      };
      return entries;
    default:
      throw new Error(
        `Unhandled type entry: ${JSON.stringify(object.type)}`
      );
  }
};
