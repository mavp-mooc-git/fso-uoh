import {v1 as uuid} from 'uuid';
import patientsData from '../data/patients';
import { NewPatientEntry, NonSsnPatients, Patients } from '../types';
const patients: Array<Patients> = patientsData;
const newId = uuid();

const getEntries = (): Array<Patients> => {
  return patients;
};

const findById = (id: string): Patients | undefined => {
  const entry = patients.find(p => p.id === id);
  return entry;
};

const getNonSsnEntries = (): NonSsnPatients[] => {
  return patientsData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addEntry = ( entry: NewPatientEntry ): Patients => {

  const newPatientEntry = {
    id: newId,
    ...entry
  };

  patients.push(newPatientEntry);
  return newPatientEntry;
};

export default {
  getEntries,
  addEntry,
  getNonSsnEntries,
  findById
};
