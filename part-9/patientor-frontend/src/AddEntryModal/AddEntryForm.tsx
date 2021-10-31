import React, { useState } from "react";
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";
import {
  DiagnosisSelection, NumberField, SelectField, TextField, TypeOption
} from "../AddEntryModal/FormField";
import { NonIdEntry, EntryTypes } from "../types";
import { useStateValue } from "../state";

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
  const [type, setType] = useState('Hospital');
  
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
        },
        employerName: '',
        sickLeave: {
          startDate: '',
          endDate: ''
        },
        healthCheckRating: 0
      }}
      onSubmit={onSubmit}
      validate={(values: NonIdEntry) => {
        setType(values.type);
        const requiredError = "Field is required";
        let errors:
          | { [field: string]: string }
          | {
              [key: string]: {
                [key: string]: string;
              };
            } = {};
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }

        if(values.type === 'Hospital') {
          if (!values.discharge.date || !values.discharge.criteria) {
            errors = {
              ...errors,
              discharge: {
                date: (!values.discharge.date) ? requiredError : '',
                criteria: (!values.discharge.criteria) ? requiredError : '',
              }
            };
          }
        }
        if(values.type === 'OccupationalHealthcare') {
          if (!values.employerName) {
            errors.employerName = requiredError;
          }
        }
        
        return errors;
      }}
    >

      {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
        return (
          <Form className="form ui">
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
            {
              (type === 'Hospital') ? 
              <>
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
              </> :
              (type === 'OccupationalHealthcare') ?
              <>
                <Field
                  label="Employer Name"
                  placeholder="Employer name"
                  name="employerName"
                  component={TextField}
                />
                <Field
                  label="SickLeave Start Date (optional)"
                  placeholder="YYYY-MM-DD"
                  name="sickLeave.startDate"
                  component={TextField}
                />
                <Field
                  label="SickLeave End Date (optional)"
                  placeholder="YYYY-MM-DD"
                  name="sickLeave.endDate"
                  component={TextField}
                />
              </> :
              (type === 'HealthCheck') ?
                <Field
                  label="healthCheckRating"
                  name="healthCheckRating"
                  component={NumberField}
                  min={0}
                  max={3}
                /> : null
            }
            
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
