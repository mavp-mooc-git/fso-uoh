import React from 'react';
import { EntryProps } from "../types";
import HospitalEntry from "./HospitalEntry";
import OccupationalHealthcare from "./OccupationalHealthcare";
import HealthCheck from "./HealthCheck";

/**
 * Helper function for exhaustive type checking
 */
const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

//const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
const EntryDetails = ({entry}: EntryProps) => {
  switch (entry.type) {
    case "Hospital":
      return <HospitalEntry entry={entry} />;
    case "OccupationalHealthcare":
      return <OccupationalHealthcare entry={entry} />;
    case "HealthCheck":
      return <HealthCheck entry={entry} />;
    default:
      return assertNever(entry);
  }
};

export default EntryDetails;
