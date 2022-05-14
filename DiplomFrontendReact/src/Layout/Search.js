
import React, { useState } from 'react';
import Scroll from './Scroll';
import SearchList from './SearchList';
import { Box, Grid, Typography } from '@mui/material';
import { TextField } from '@mui/material';
import { Paper } from '@mui/material';
function json2array(json) {
  var result = [];
  var keys = Object.keys(json);
  keys.forEach(function (key) {
    result.push(json[key]);
  });
  return result;
}


function Search({ details }) {

  const [searchField, setSearchField] = useState("");



  var array = json2array(details)
  const filteredPersons = array.filter(

    person => {

      return (

        person
          .Email
          .toLowerCase()
          .includes(searchField.toLowerCase()) ||
        (person.Name + " " + person.Surname + " " + person.Patronymic)
          .toLowerCase()
          .includes(searchField.toLowerCase())
      );
    }
  );

  const handleChange = e => {
    setSearchField(e.target.value);
  };

  function searchList() {
    return (
      <Scroll>
        <SearchList filteredPersons={filteredPersons} />
      </Scroll>
    );
  }
  let url = window.location.href;

  if (String(url) === "https://localhost:3000/FriendsPage") {

    return (
      <Box container component={Paper}>

        <Typography marginLeft={'35%'} marginTop={'1%'} variant="h4" gutterBottom component="div">
          Друзья
        </Typography>

        <Box width={'100%'}>
          <TextField onChange={handleChange} id="outlined-basic-email" label="Поиск" fullWidth />
        </Box>
        {searchList()}
      </Box>
    );
  }
  if (String(url).substring(0,32) === "https://localhost:3000/ChatPage/") {

    return (
      <Box container component={Paper}>

        <Typography marginLeft={'35%'} marginTop={'1%'} variant="h6" gutterBottom component="div">
          Друзья
        </Typography>

        <Box width={'100%'}>
          <TextField onChange={handleChange} id="outlined-basic-email" label="Поиск" fullWidth />
        </Box>
        {searchList()}
      </Box>
    );
  }
  else {


    return (
      <section className="garamond">

        <Typography marginLeft={'30%'} marginTop={'1%'} variant="h4" gutterBottom component="div">
          Поиск людей
        </Typography>

        <Grid width={'100%'} container component={Paper} >
          <TextField onChange={handleChange} id="outlined-basic-email" label="Поиск" fullWidth />
        </Grid>
        {searchList()}
      </section>
    );
  }
}

export default Search;