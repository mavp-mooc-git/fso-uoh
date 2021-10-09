import patientsData from '../data/patients';
import { NonSsnPatients, Patients } from '../types';
const patients: Array<Patients> = patientsData;

const getEntries = (): Array<Patients> => {
  return patients;
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

const addEntry = () => {
  return null;
};

export default {
  getEntries,
  addEntry,
  getNonSsnEntries
};
