"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toNewEntry = void 0;
const types_1 = require("./types");
/* eslint-disable @typescript-eslint/no-explicit-any */
const isDate = (date) => {
    return Boolean(Date.parse(date));
};
const isGender = (param) => {
    return Object.values(types_1.Gender).includes(param);
};
const isString = (text) => {
    return typeof text === 'string' || text instanceof String;
};
const parseName = (name) => {
    if (!name || !isString(name)) {
        throw new Error('Incorrect or missing name: ' + name);
    }
    return name;
};
const parseDate = (date) => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing dateOfBirth: ' + date);
    }
    return date;
};
const parseSsn = (ssn) => {
    if (!ssn || !isString(ssn)) {
        throw new Error('Incorrect or missing ssn: ' + ssn);
    }
    return ssn;
};
const parseGender = (gender) => {
    if (!gender || !isGender(gender)) {
        throw new Error('Incorrect or missing gender: ' + gender);
    }
    return gender;
};
const parseOcupation = (occupation) => {
    if (!occupation || !isString(occupation)) {
        throw new Error('Incorrect or missing occupation: ' + occupation);
    }
    return occupation;
};
const parseEntry = (entries) => entries;
const toNewPatient = (object) => {
    return {
        name: parseName(object.name),
        dateOfBirth: parseDate(object.dateOfBirth),
        ssn: parseSsn(object.ssn),
        gender: parseGender(object.gender),
        occupation: parseOcupation(object.occupation),
        entries: parseEntry(object.entries)
    };
};
exports.default = toNewPatient;
// Parse array entries
const parseString = (field, text) => {
    if (!field || !isString(field)) {
        throw new Error(`Incorrect or missing ${text}: ${field}`);
    }
    return field;
};
const parseEntryDate = (date) => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date: ' + date);
    }
    return date;
};
const isDischarge = (param) => {
    return (isString(param.date) && isString(param.criteria));
};
const parseDischarge = (discharge) => {
    if (!discharge || !isDischarge(discharge)) {
        throw new Error('Incorrect or missing discharge properties');
    }
    return discharge;
};
const isSickLeave = (param) => {
    return (isString(param.date) && isString(param.criteria));
};
const parseSickLeave = (sickLeave) => {
    if (!sickLeave || !isSickLeave(sickLeave)) {
        throw new Error('Incorrect or missing sickLeave properties');
    }
    return sickLeave;
};
const isCheckRating = (healthCheckRating) => {
    return Object.values(types_1.HealthCheckRating).includes(healthCheckRating);
};
const parseCheckEntry = (healthCheckRating) => {
    if (healthCheckRating == undefined || !isCheckRating(healthCheckRating)) {
        throw new Error('Incorrect or missing healthCheckRating: ' + healthCheckRating);
    }
    return healthCheckRating;
};
const parseDiagnosis = (codes) => codes;
const toNewEntry = (object) => {
    let entries;
    const base = {
        description: parseString(object.description, 'description'),
        date: parseEntryDate(object.date),
        specialist: parseString(object.specialist, 'specialist'),
        diagnosisCodes: parseDiagnosis(object.diagnosisCodes)
    };
    switch (object.type) {
        case 'Hospital':
            entries = Object.assign(Object.assign({}, base), { type: 'Hospital', discharge: parseDischarge(object.discharge) });
            return entries;
        case 'OccupationalHealthcare':
            entries = Object.assign(Object.assign({}, base), { type: 'OccupationalHealthcare', employerName: parseString(object.employerName, 'employerName'), sickLeave: parseSickLeave(object.sickLeave) });
            return entries;
        case 'HealthCheck':
            entries = Object.assign(Object.assign({}, base), { type: 'HealthCheck', healthCheckRating: parseCheckEntry(object.healthCheckRating) });
            return entries;
        default:
            throw new Error(`Unhandled type entry: ${JSON.stringify(object.type)}`);
    }
};
exports.toNewEntry = toNewEntry;
