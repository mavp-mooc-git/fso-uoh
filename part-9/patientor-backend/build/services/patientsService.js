"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const patients_1 = __importDefault(require("../data/patients"));
const patients = patients_1.default;
const newId = (0, uuid_1.v1)();
const getEntries = () => {
    return patients;
};
const findById = (id) => {
    const entry = patients.find(p => p.id === id);
    return entry;
};
const getNonSsnEntries = () => {
    return patients_1.default.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
    }));
};
const addEntry = (entry) => {
    const newPatientEntry = Object.assign({ id: newId }, entry);
    patients.push(newPatientEntry);
    return newPatientEntry;
};
exports.default = {
    getEntries,
    addEntry,
    getNonSsnEntries,
    findById
};
