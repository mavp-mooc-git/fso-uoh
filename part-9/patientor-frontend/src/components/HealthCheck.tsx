import React from 'react';
import { HealthCheckEntry } from "../types";
import { Divider, Icon, Label, List } from 'semantic-ui-react';

export interface HealthProps {
  entry: HealthCheckEntry;
}

const HealthCheck = ({entry}: HealthProps) => {
  const rating: number = entry.healthCheckRating;
  let color: 'green' | 'yellow' | 'orange' | 'red';

  switch (rating) {
    case 0:
      color='green';
      break;
    case 1:
      color='yellow';
      break;
    case 2:
      color='orange';
      break;
    case 3:
      color='red';
      break;
    default:
      color='green';
      break;
  }

  return (
    <div>
      <List>
        <Label size='big'>
          {entry.date} &nbsp; &nbsp; 
          <Icon name='user md' size='large' />
        </Label>
        <List.Item content={<em>{entry.description}</em>} />
        <Icon color={color} name='heart' />
      </List>
      <Divider hidden />
    </div>
  );
};

export default HealthCheck;
