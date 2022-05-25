
import React, { useEffect, useState } from 'react';
import Scroll from './Scroll';
import SearchList from './SearchList';
import { Box, Button, Grid, Typography } from '@mui/material';
import { TextField } from '@mui/material';
import { Paper } from '@mui/material';
import { Link } from 'react-router-dom';
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
  const [myData, setData] = useState("");
  const [myChat, setChat] = useState([]);
  const [myUsers, setUsers] = useState([]);

  var filteredProducts = [];
  var filteredPersons = [];
  var filteredMyProducts = [];
  var chatwithstrangers = [];
  var allchatswithstrangers = [];
  var array = json2array(details);
  var section = 0;
  const getUserData = async () => {
    fetch('https://localhost:7049/api/Login', {
      method: 'GET',
      credentials: 'include',
    })
      .then((response) => response.json())
      .then((data) => {
        setData(data)
      });

  }
  const getAllUsers = async () => {
    fetch('https://localhost:7049/api/Search', {
      method: 'GET',
      credentials: 'include',
    })
      .then((response) => response.json())
      .then((data) => {
        setUsers(data)
      });

  }
  const getChat = async () => {
    fetch('https://localhost:7049/api/ChatSaveToDB', {
      method: 'GET',
      credentials: 'include',
    })
      .then((response) => response.json())
      .then((data) => {
        setChat(data)
      });

  }
  let url = window.location.href;

  useEffect(() => {

    getUserData();
    getChat();
    getAllUsers();
  }, [""]);

  chatwithstrangers = myChat.filter(

    chatEntry => {

      return (

        chatEntry
          .sender
          .toLowerCase()
          .includes(myData.Id) ||
        chatEntry
          .reciever
          .toLowerCase()
          .includes(myData.Id)

      );
    }
  );

  if (String(url) === "https://localhost:3000/ProductsPage/AllProducts") {

    filteredProducts = array.filter(

      product => {

        return (

          product
            .title
            .toLowerCase()
            .includes(searchField.toLowerCase())
        );
      }
    );
  }

  if (String(url) === "https://localhost:3000/ProductsPage/MyProducts") {
    const myProductsArray = array.filter(

      product => {

        return (

          product
            .senderid
            .toLowerCase()
            .includes(myData.Id)
        );
      }
    );
    filteredMyProducts = myProductsArray.filter(

      product => {

        return (

          product
            .title
            .toLowerCase()
            .includes(searchField.toLowerCase())
        );
      }
    );
  }
  if (String(url).substring(0, 35) !== "https://localhost:3000/ProductsPage") {

    filteredPersons = array.filter(

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

  }
  const handleChange = e => {
    setSearchField(e.target.value);
  };

  for (var i = 0; i < chatwithstrangers.length; i++) {

    let buffArray = myUsers.filter(

      person => {

        return (

          person
            .Id
            .toLowerCase()
            .includes(chatwithstrangers[i].sender) ||
          person
            .Id
            .toLowerCase()
            .includes(chatwithstrangers[i].reciever)

        );
      }
    );
    if (!allchatswithstrangers.includes(buffArray)) {
      for (var j = 0; j < buffArray.length; j++) {
        if (!allchatswithstrangers.includes(buffArray[j])) {
          for (var k = 0; k < filteredPersons.length; k++) {

            if (!filteredPersons[0].Name.includes(buffArray[j].Name)) {              
              allchatswithstrangers.push(buffArray[j]);
            }
          }
        }
      }
    }
  }
  console.log(allchatswithstrangers);
  function searchList() {
    if (String(url) === "https://localhost:3000/ProductsPage/MyProducts") {
      return (
        <Scroll>
          <SearchList filteredPersons={filteredMyProducts} />
        </Scroll>
      );
    }
    if (String(url) === "https://localhost:3000/ProductsPage/AllProducts") {
      return (
        <Scroll>
          <SearchList filteredPersons={filteredProducts} />
        </Scroll>
      );
    }
    else {
      console.log(filteredPersons.concat(allchatswithstrangers))
      var buff = filteredPersons.concat(allchatswithstrangers);
      var allDialogs = [...new Set(buff)];
      return (
        <Scroll>
          <SearchList filteredPersons={allDialogs} />
        </Scroll>
      );
    }
  }




  if (String(url) === "https://localhost:3000/ProductsPage/AllProducts") {


    return (
      <>
        <Typography marginLeft={'35%'} marginTop={'1%'} variant="h4" gutterBottom component="div">
          Товары
        </Typography>
        <Box container component={Paper}>


          <Box width={'100%'}>
            <TextField onChange={handleChange} id="outlined-basic-email" label="Поиск" fullWidth />
          </Box>
          <Box width={'100%'} marginTop={'1%'}>
            <Link to={'/ProductsPage/AllProducts'} style={{ textDecoration: 'none', color: 'inherit' }}>
              <Button style={{ marginLeft: '2%' }} variant='contained'>Все товары</Button>
            </Link>
            <Link to={'/ProductsPage/MyProducts'} style={{ textDecoration: 'none', color: 'inherit' }}>
              <Button style={{ marginLeft: '2%' }} variant='outlined'>Мои товары</Button>
            </Link>

          </Box>
          {searchList()}
        </Box>
      </>
    );
  }
  if (String(url) === "https://localhost:3000/ProductsPage/MyProducts") {


    return (
      <>
        <Typography marginLeft={'35%'} marginTop={'1%'} variant="h4" gutterBottom component="div">
          Товары
        </Typography>
        <Box container component={Paper}>


          <Box width={'100%'}>
            <TextField onChange={handleChange} id="outlined-basic-email" label="Поиск" fullWidth />
          </Box>
          <Box width={'100%'} marginTop={'1%'}>
            <Link to={'/ProductsPage/AllProducts'} style={{ textDecoration: 'none', color: 'inherit' }}>
              <Button style={{ marginLeft: '2%' }} variant='outlined'>Все товары</Button>
            </Link>
            <Link to={'/ProductsPage/MyProducts'} style={{ textDecoration: 'none', color: 'inherit' }}>
              <Button style={{ marginLeft: '2%' }} variant='contained'>Мои товары</Button>
            </Link>

          </Box>
          {searchList()}
        </Box>
      </>
    );
  }
  if (String(url) === "https://localhost:3000/FriendsPage") {

    return (
      <>
        <Typography marginLeft={'35%'} marginTop={'1%'} variant="h4" gutterBottom component="div">
          Друзья
        </Typography>
        <Box container component={Paper}>


          <Box width={'100%'}>
            <TextField onChange={handleChange} id="outlined-basic-email" label="Поиск" fullWidth />
          </Box>
          {searchList()}
        </Box>
      </>
    );
  }
  if (String(url).substring(0, 32) === "https://localhost:3000/ChatPage/") {

    return (
      <Box container component={Paper}>

        <Typography marginLeft={'35%'} marginTop={'1%'} variant="h6" gutterBottom component="div">
          Диалоги
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