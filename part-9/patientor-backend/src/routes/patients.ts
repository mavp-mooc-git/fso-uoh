import express from 'express';
import patientsService from '../services/patientsService';
import toNewPatientEntry from '../utils';

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
    const newPatientEntry = toNewPatientEntry(req.body);

    const addedEntry = patientsService.addEntry(newPatientEntry);
    res.json(addedEntry);
    // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  } catch (err: unknown | any) {
    res.status(400).send(err.message);
  }
});

export default router;
