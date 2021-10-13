import React from "react";
import axios from "axios";
import { Table, List } from "semantic-ui-react";
import { useParams } from "react-router-dom";
import { Patient } from "../types";
import { apiBaseUrl } from "../constants";
import { useStateValue, setPatientSsn } from "../state";

const PatientDetails = () => {
  const [{ patients }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();
  const patient = Object.values(patients).filter((patient: Patient) => (
    patient.id === id
  ));
  const entries = patient[0].entries.map(e => e);
  console.log('entries', entries);

  if (!patient[0].ssn) {
    React.useEffect(() => {
      console.log('Connecting with backend');
      const fetchPatientDetails = async () => {
        try {
          const { data: patientFromApi } = await axios.get<Patient>(
            `${apiBaseUrl}/patients/${id}`
          );
          dispatch(setPatientSsn(patientFromApi));
        } catch (e) {
          console.error(e);
        }
      };
      void fetchPatientDetails();
    }, []);
  } else {
    console.log('Getting State data, ssn:', patient[0].ssn);
  }

  const IconType = (gender: string) => {
    switch (gender) {
      case "male":
        return 'mars';
      case "female":
        return 'venus';
      default:
        return 'neuter';
    }
  };

  return (
    <div className="App">
      <Table collapsing>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>
              <h2>{patient[0].name}</h2>
            </Table.HeaderCell>
            <Table.HeaderCell>
              <List.Icon name={IconType(patient[0].gender)} size='big' />
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.Cell>ssn :</Table.Cell>
            <Table.Cell>{patient[0].ssn}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>occupation :</Table.Cell>
            <Table.Cell>{patient[0].occupation}</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
      <h3>entries</h3>
      { entries.map((e,i) => {
          return (
            <div key={`d${i}`}>
              <p>
                {e.date} <em>{e.description}</em>
              </p>
              { (e?.diagnosisCodes) ?
                  <ul>
                    { e.diagnosisCodes.map((d,i) => <li key={`li${i}`}>{d}</li> ) }
                  </ul>
              : null }
            </div>
          );
        }) }
    </div>
  );
};

export default PatientDetails;
