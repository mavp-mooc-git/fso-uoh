"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const patientsService_1 = __importDefault(require("../services/patientsService"));
const utils_1 = __importStar(require("../utils"));
const router = express_1.default.Router();
router.get('/', (_req, res) => {
    res.send(patientsService_1.default.getNonSsnEntries());
});
router.get('/:id', (req, res) => {
    const patient = patientsService_1.default.findById(req.params.id);
    if (patient) {
        res.send(patient);
    }
    else {
        res.sendStatus(404);
    }
});
router.post('/', (req, res) => {
    try {
        const newPatient = (0, utils_1.default)(req.body);
        const addedPatient = patientsService_1.default.addPatient(newPatient);
        res.json(addedPatient);
        // eslint-disable-next-line  @typescript-eslint/no-explicit-any
    }
    catch (err) {
        res.status(400).send(err.message);
    }
});
router.post('/:id/entries', (req, res) => {
    try {
        const patient = patientsService_1.default.findById(req.params.id);
        if (patient) {
            const newEntry = (0, utils_1.toNewEntry)(req.body);
            const addedPatientEntry = patientsService_1.default.addEntry(patient, newEntry);
            res.json(addedPatientEntry);
        }
        else {
            res.sendStatus(404);
        }
        // eslint-disable-next-line  @typescript-eslint/no-explicit-any
    }
    catch (err) {
        res.status(400).send(err.message);
    }
});
exports.default = router;
