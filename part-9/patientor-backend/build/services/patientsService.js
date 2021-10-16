"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const patients_1 = __importDefault(require("../data/patients"));
const patients = patients_1.default;
const newID = (0, uuid_1.v1)();
const getEntries = () => {
    return patients;
};
const findById = (id) => {
    const entry = patients.find(p => p.id === id);
    return entry;
};
const getNonSsnEntries = () => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
        entries,
    }));
};
const addPatient = (entry) => {
    const newPatient = Object.assign(Object.assign({}, entry), { id: newID, entries: [] });
    patients.push(newPatient);
    return newPatient;
};
const addEntry = (patient, entry) => {
    const newEntry = Object.assign(Object.assign({}, entry), { id: newID });
    patient.entries.push(newEntry);
    return patient;
};
exports.default = {
    getEntries,
    findById,
    getNonSsnEntries,
    addPatient,
    addEntry
};
