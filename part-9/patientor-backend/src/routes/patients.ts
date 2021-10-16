import express from 'express';
import patientsService from '../services/patientsService';
import toNewPatient, { toNewEntry } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientsService.getNonSsnEntries());
});

router.get('/:id', (req, res) => {
  const patient = patientsService.findById(req.params.id);

  if (patient) {
    res.send(patient);
  } else {
    res.sendStatus(404);
  }
});

router.post('/', (req, res) => {
  try {
    const newPatient = toNewPatient(req.body);
    const addedPatient = patientsService.addPatient(newPatient);
    res.json(addedPatient);
    // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  } catch (err: unknown | any) {
    res.status(400).send(err.message);
  }
});

router.post('/:id/entries', (req, res) => {
  try {
    const patient = patientsService.findById(req.params.id);
    if (patient) {
      const newEntry = toNewEntry(req.body);
      const addedPatientEntry = patientsService.addEntry(patient, newEntry);
      res.json(addedPatientEntry);
    } else {
      res.sendStatus(404);
    }
    // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  } catch (err: unknown | any) {
    res.status(400).send(err.message);
  }
});

export default router;
