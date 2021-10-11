import {v1 as uuid} from 'uuid';
import patientsData from '../data/patients';
import { NewPatientEntry, NonSsnPatients, Patient } from '../types';
const patients: Array<Patient> = patientsData;
const newId = uuid();

const getEntries = (): Array<Patient> => {
  return patients;
};

const findById = (id: string): Patient | undefined => {
  const entry = patients.find(p => p.id === id);
  return entry;
};

const getNonSsnEntries = (): NonSsnPatients[] => {
  return patients.map((
      { id, name, dateOfBirth, gender, occupation, entries }
    ) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
      entries,
    }));
};

const addEntry = ( entry: NewPatientEntry ): Patient => {

  const newPatientEntry = {
    id: newId,
    ...entry
  };

  patients.push(newPatientEntry);
  return newPatientEntry;
};

export default {
  getEntries,
  findById,
  getNonSsnEntries,
  addEntry
};
