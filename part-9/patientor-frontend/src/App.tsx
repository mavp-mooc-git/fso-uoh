import React from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { Button, Divider, Header, Container } from "semantic-ui-react";
import { apiBaseUrl } from "./constants";
import { useStateValue, setPatientList, setDiagnosis } from "./state";
import { Patient, Diagnosis } from "./types";
import PatientListPage from "./PatientListPage";
import PatientDetails from "./PatientDetailsPage";

const App = () => {
  const [, dispatch] = useStateValue();

  React.useEffect(() => {
    console.log('Fetching patients from backend');
    void axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchPatientList = async () => {
      try {
        const { data: patientListFromApi } = await axios.get<Patient[]>(
          `${apiBaseUrl}/patients`
        );
        dispatch(setPatientList(patientListFromApi));
      } catch (e) {
        console.error(e);
      }
    };
    void fetchPatientList();
  }, []);

  React.useEffect(() => {
    console.log('Fetching diagnosis from backend');
    const fetchDiagnosis = async () => {
      try {
        const { data: diagnosisFromApi } = await axios.get<Diagnosis[]>(
          `${apiBaseUrl}/diagnoses`
        );
        dispatch(setDiagnosis(diagnosisFromApi));
      } catch (e) {
        console.error(e);
      }
    };
    void fetchDiagnosis();
  }, []);

  return (
    <div className="App">
      <Router>
        <Container>
          <Header as="h1">Patientor</Header>
          <Button as={Link} to="/" primary>
            Home
          </Button>
          <Divider hidden />
          <Switch>
            <Route path="/patients/:id">
              <PatientDetails />
            </Route>
            <Route path="/">
              <PatientListPage />
            </Route>
          </Switch>
        </Container>
      </Router>
    </div>
  );
};

export default App;
