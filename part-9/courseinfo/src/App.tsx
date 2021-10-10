import React from 'react';

const Header = ({name}: { name: string }) => <h1>{name}</h1>

interface ContentProps {
  parts: Array<{
    name: string;
    exerciseCount: number;
  }>
}

interface PartProps {
  part: string;
  exercise: number;
}

const Part = ({part, exercise}: PartProps) => <p>{part}: {exercise}</p>

const Content = (props: ContentProps) => {
  const partial = props.parts.map((p, idx) => 
      <Part key={`${idx}`}
            part={p.name}
            exercise={p.exerciseCount} />
    )
  return <>{partial}</>
}

const Total = ({parts}: ContentProps) => {
  return (
    <p>
      <strong>Number of exercises: &nbsp; 
        {parts.reduce((ac, p) => ac + p.exerciseCount, 0)}
      </strong>
    </p>
  )
}

const App = (): JSX.Element => {
  const courseName = "Half Stack application development";
  const courseParts = [
    {
      name: "Fundamentals",
      exerciseCount: 10
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14
    }
  ];

  return (
    <div>
      <Header name={courseName} />
      <Content parts={courseParts} />
      <Total parts={courseParts} />
    </div>
  );
};

export default App;
