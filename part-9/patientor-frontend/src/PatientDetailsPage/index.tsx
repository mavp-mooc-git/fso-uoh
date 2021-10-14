import React from "react";
import axios from "axios";
import { Divider, Icon, List, Table } from "semantic-ui-react";
import { useParams } from "react-router-dom";
import { Patient,  } from "../types";
import { apiBaseUrl } from "../constants";
import { useStateValue, setPatientSsn } from "../state";
import EntryDetails from "../components/EntryDetails";

const PatientDetails = () => {
  const [{ patients, diagnosis }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();
  const patient = Object.values(patients).filter((p: Patient) => (
    p.id === id
  ));

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
    console.log('Getting State data, ssn');
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

  let diag = false;

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
      {(patient[0].entries.length === 0) ? <p>no data available</p> :
        patient[0].entries.map((e,i) => {
          return (
            <div key={`dp${i}`}>
              {<EntryDetails entry={e} />}
            </div>
          );
        }) }
        <hr style={{ "borderTop": "solid silver 1px"}} />
        <p style={{ "color": "#555"}}><strong>Diagnosis:</strong></p>
        {(patient[0].entries.length === 0) ?
          <p style={{ "color": "#444"}}>
            <Icon name='close' />null data
          </p> :
        patient[0].entries.map((e,i) => {
          return (
            <div key={`dd${i}`}>
              {(e?.diagnosisCodes) ?
                <ul  style={{ "color": "#444"}}>
                  { e.diagnosisCodes.map((d,i) => (
                    <div key={`li${i}`}>
                      <List.Item>
                        <Icon name='clipboard outline' />
                        <strong>{d}</strong> &nbsp; {diagnosis[d].name}
                      </List.Item>
                    </div>
                  )) }
                </ul> : (!diag) ?
                <div key={`li${i}`}>
                  <List.Item style={{ "color": "#444"}}>
                    <Icon name='clipboard outline' />
                    no diagnosis
                  </List.Item>
                  <Divider hidden />
                  {diag = true}
                </div>
              : null }
            </div>
          );
        }) }
    </div>
  );
};

export default PatientDetails;
