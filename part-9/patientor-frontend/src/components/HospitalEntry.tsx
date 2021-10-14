import React from 'react';
import { EntryProps } from "../types";
import { Divider, Icon, Label, List } from 'semantic-ui-react';

const HospitalEntry = ({entry}: EntryProps) => {
  return (
    <div>
      <List>
        <Label size='big'>
          {entry.date} &nbsp; &nbsp; 
          <Icon name='hospital outline' size='large' />
        </Label>
        <List.Item content={<em>{entry.description}</em>} />
      </List>
      <Divider hidden />
    </div>
  );
};

export default HospitalEntry;
