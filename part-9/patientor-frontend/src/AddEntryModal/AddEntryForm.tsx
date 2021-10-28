import React from "react";
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";
import {
  DiagnosisSelection, TextField, SelectField, TypeOption
} from "../AddEntryModal/FormField";
import { NonIdEntry, EntryTypes, FormValues } from "../types";
import { useStateValue } from "../state";
import { FormikErrors } from 'formik';

/*
 * use type Entry, but omit id field.
 */
export type EntryFormValues = NonIdEntry;

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

const typeOptions: TypeOption[] = [
  { value: EntryTypes.Hospital, label: "Hospital" },
  { value: EntryTypes.OccupationalHealthcare, label: "OccupationalHealthcare" },
  { value: EntryTypes.HealthCheck, label: "HealthCheck" }
];

export const AddEntryForm = ({ onSubmit, onCancel } : Props ) => {
  const [{ diagnosis }] = useStateValue();

  return (
    <Formik
      initialValues={{
        description: '',
        date: '',
        specialist: '',
        diagnosisCodes: [],
        type: 'Hospital',
        discharge: {
          date: '',
          criteria: ''
        }
      }}
      onSubmit={onSubmit}
      validate={(values: FormValues) => {
        const requiredError = "Field is required";
        let errors: FormikErrors<FormValues> = {};
        if (!values.description || !values.date || !values.specialist ||
            !values.type || !values.discharge.date || !values.discharge.criteria) {
              errors = {
                description: requiredError,
                date: requiredError,
                specialist: requiredError,
                type: requiredError,
                discharge: {
                  date: requiredError,
                  criteria: requiredError
                }
              };
            }
        return errors;
      }}
    >

      {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
        return (
          <Form className="form ui">
            {/**
              "description": "new description entry",
              "date": "1980-12-23",
              "specialist": "specialist name",
              "?diagnosisCodes": ["code"],

              "type": "Hospital",
              "discharge": {
                "date": "1980-12-23",
                "criteria": "criteria string"
              }

              "type": "OccupationalHealthcare",
              "employerName": "employer name",
              "sickLeave": {
                "startDate": "1980-12-23",
                "endDate": "1980-12-23"
              }

              "type": "HealthCheck",
              "healthCheckRating": 0
            **/}
            
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Specialist name"
              name="specialist"
              component={TextField}
            />
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnosis)}
            /> 
            <SelectField
              label="Types"
              name="type"
              options={typeOptions}
            />
            <Field
              label="Discharge Date"
              placeholder="YYYY-MM-DD"
              name="discharge.date"
              component={TextField}
            />
            <Field
              label="Discharge Criteria"
              placeholder="Discharge criteria"
              name="discharge.criteria"
              component={TextField}
            />
            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddEntryForm;
