import {v1 as uuid} from 'uuid';
import patientsData from '../data/patients';
import { NewPatient, NonIdEntry, NonSsnPatients, Patient } from '../types';
const patients: Array<Patient> = patientsData;
const newID = uuid();

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

const addPatient = ( entry: NewPatient ): Patient => {
  const newPatient = {
    ...entry,
    id: newID,
    entries: []
  };

  patients.push(newPatient);
  return newPatient;
};

const addEntry = (patient: Patient, entry: NonIdEntry ): Patient => {
  const newEntry = {
    ...entry,
    id: newID
  };

  patient.entries.push(newEntry);
  return patient;
};

export default {
  getEntries,
  findById,
  getNonSsnEntries,
  addPatient,
  addEntry
};
