import React from 'react';
import { CoursePart, ContentProps } from './types';

const Header = ({name}: { name: string }) => <h1>{name}</h1>;

/**
 * Helper function for exhaustive type checking
 */
const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Part = ({data}: ContentProps) => {
  switch (data[0].type) {
    case "normal":
      return (
        <p>
          <strong>
            {data[0].name} {data[0].exerciseCount}
          </strong> <br />
          <em>
            {data[0].description}
          </em>
        </p>
      );
    case "groupProject":
      return (
        <p>
          <strong>
            {data[0].name} {data[0].exerciseCount}
          </strong> <br />
          project exercices: {data[0].groupProjectCount}
        </p>
      );
    case "submission":
      return (
        <p>
          <strong>
            {data[0].name} {data[0].exerciseCount}
          </strong> <br />
          <em>
            {data[0].description}
          </em> <br/>
          submit to {data[0].exerciseSubmissionLink}
        </p>
      );
    case "special":
      return (
        <p>
          <strong>
            {data[0].name} {data[0].exerciseCount}
          </strong> <br />
          <em>
            {data[0].description}
          </em> <br />
          required skills: {data[0].requirements.join(", ")}
        </p>
      );
    default:
      return assertNever(data[0]);
  }
};

const Content = ({ data }: ContentProps) => {
  return <>{data.map((p, i) => <Part key={i} data={[p]} />)}</>;
};

const Total = ({data}: ContentProps) => {
  return (
    <p>
      <strong>Number of exercises: &nbsp; 
        {data.reduce((ac, p) => ac + p.exerciseCount, 0)}
      </strong>
    </p>
  );
};

const App = (): JSX.Element => {
  const courseName = "Half Stack application development";

  // this is the new coursePart variable
  const courseParts: Array<CoursePart> = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is the leisured course part",
      type: "normal"
    },
    {
      name: "Advanced",
      exerciseCount: 7,
      description: "This is the harded course part",
      type: "normal"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      type: "groupProject"
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev",
      type: "submission"
    },
    {
      name: "Backend development",
      exerciseCount: 21,
      description: "Typing the backend",
      requirements: ["nodejs", "jest"],
      type: "special"
    }
  ];

  return (
    <div>
      <Header  name={courseName} />
      <Content data={courseParts} />
      <Total   data={courseParts} />
    </div>
  );
};

export default App;
