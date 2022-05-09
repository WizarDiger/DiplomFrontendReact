import React from 'react';
import Card from './Card';
import { Grid } from '@mui/material';
import { Paper } from '@mui/material';
function SearchList({ filteredPersons }) {
  const filtered = filteredPersons.map(person => <Card key={person.id} person={person} />);
  return (
    <div>
      <Grid width={"100%"} marginRight={"2px"} container component={Paper} >

        {filtered}
      </Grid>
    </div>
  );
}

export default SearchList;