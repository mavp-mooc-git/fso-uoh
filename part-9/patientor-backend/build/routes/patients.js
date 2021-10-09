"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const patientsService_1 = __importDefault(require("../services/patientsService"));
const utils_1 = __importDefault(require("../utils"));
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
        const newPatientEntry = (0, utils_1.default)(req.body);
        const addedEntry = patientsService_1.default.addEntry(newPatientEntry);
        res.json(addedEntry);
        // eslint-disable-next-line  @typescript-eslint/no-explicit-any
    }
    catch (err) {
        res.status(400).send(err.message);
    }
});
exports.default = router;
