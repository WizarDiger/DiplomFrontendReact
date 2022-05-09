import React, { Component, useState, useEffect, useRef } from 'react';
import Card from './Card';
import { Grid } from '@mui/material';
import { Paper } from '@mui/material';
function SearchList({ filteredPersons }) {
  const [myData, setData] = useState("");
  const getUserData = async () => {
    fetch('https://localhost:7049/api/Login', {
      method: 'GET',
      credentials: 'include',
    })
      .then((response) => response.json())
      .then((data) => {
        setData(data);            
      });

  }
  useEffect(() => {

    getUserData();
    
  }, []);
  const filtered = filteredPersons.map(person => <Card key={person.id} person={person} currentUserId={myData.Id} />);
  return (
    <div>
      <Grid width={"100%"} marginRight={"2px"} container component={Paper} >

        {filtered}
      </Grid>
    </div>
  );
}

export default SearchList;