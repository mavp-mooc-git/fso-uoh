import React from 'react';
import { EntryProps } from "../types";
import { Divider, Icon, Label, List } from 'semantic-ui-react';

const OccupationalHealthcare = ({entry}: EntryProps) => {
  return (
    <div>
      <List>
        <Label size='big'>
          {entry.date} &nbsp; &nbsp; 
          <Icon name='stethoscope' size='large' />
        </Label>
        <List.Item content={<em>{entry.description}</em>} />
      </List>
      <Divider hidden />
    </div>
  );
};

export default OccupationalHealthcare;
