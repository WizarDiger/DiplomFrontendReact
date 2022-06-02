
import React, { useEffect, useState } from 'react';
import Scroll from './Scroll';
import SearchList from './SearchList';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Input, Typography } from '@mui/material';
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
  const [openProduct, setOpenProduct] = React.useState(false);
  const [myTitle, setTitle] = useState('')
  const [myDescription, setDescription] = useState('')
  const [myPrice, setPrice] = useState('')
  const [myAmount, setAmount] = useState('')
  const [myImageString, setImageString] = useState('')
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
  function handleChange(event) {
  
    console.log(event.target.files[0]);
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result
        .replace('data:', '')
        .replace(/^.+,/, '');
      console.log(base64String);
      setImageString(base64String);
    };
    reader.readAsDataURL(file);
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
    if (String(url).includes("https://localhost:3000/ChatPage")) {


      var buff = filteredPersons.concat(allchatswithstrangers);
      var allDialogs = [...new Set(buff)];
      return (
        <Scroll>
          <SearchList filteredPersons={allDialogs} />
        </Scroll>
      );
    }
    else {
      return (
        <Scroll>
          <SearchList filteredPersons={filteredPersons} />
        </Scroll>
      );
    }
  }

  const handleAddProduct = () => {

    fetch('https://localhost:7049/api/Products', {
      method: 'POST',
      headers:
      {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(
        {
          Title: myTitle,
          Description: myDescription,
          Price: myPrice,
          Amount: myAmount,
          SenderId: myData.Id,
          SenderName: myData.Name + " " + myData.Surname,
          ImagePath: myImageString

        }
      )
    })

      .then(res => res.json())
      .then((result) => {

        console.log(result);
      },
        (error) => {
          console.log(error);
        })
    setOpenProduct(false);
    window.location.reload()
  };

  const handleClickOpenProduct = () => {
    setOpenProduct(true);
  };

  const handleCloseProduct = () => {
    setOpenProduct(false);
  };

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

            <Button style={{ marginLeft: "2%" }} onClick={handleClickOpenProduct} variant="contained">Выставить товар</Button>
            <Dialog open={openProduct} onClose={handleCloseProduct}>
              <DialogTitle>Выставить товар</DialogTitle>
              <DialogContent>
                <TextField value={myTitle} onChange={(e) => setTitle(e.target.value)}
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Название"
                  type="email"
                  fullWidth
                  variant="standard"
                />
                <TextField value={myDescription} onChange={(e) => setDescription(e.target.value)}
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Описание"
                  type="email"
                  fullWidth
                  variant="standard"
                />
                <TextField value={myPrice} onChange={(e) => setPrice(e.target.value)}
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Цена"
                  type="email"
                  fullWidth
                  variant="standard"
                />
                <TextField value={myAmount} onChange={(e) => setAmount(e.target.value)}
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Количество"
                  type="email"
                  fullWidth
                  variant="standard"
                />
                <p>
                  <Input accept="image/*" id="contained-button-file" multiple type="file" onChange={handleChange} />
                </p>

              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseProduct}>Отмена</Button>
                <Button onClick={handleAddProduct}>Выставить</Button>
              </DialogActions>
            </Dialog>
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
            <Button style={{ marginLeft: "2%" }} onClick={handleClickOpenProduct} variant="contained">Выставить товар</Button>
            <Dialog open={openProduct} onClose={handleCloseProduct}>
              <DialogTitle>Выставить товар</DialogTitle>
              <DialogContent>
                <TextField value={myTitle} onChange={(e) => setTitle(e.target.value)}
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Название"
                  type="email"
                  fullWidth
                  variant="standard"
                />
                <TextField value={myDescription} onChange={(e) => setDescription(e.target.value)}
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Описание"
                  type="email"
                  fullWidth
                  variant="standard"
                />
                <TextField value={myPrice} onChange={(e) => setPrice(e.target.value)}
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Цена"
                  type="email"
                  fullWidth
                  variant="standard"
                />
                <TextField value={myAmount} onChange={(e) => setAmount(e.target.value)}
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Количество"
                  type="email"
                  fullWidth
                  variant="standard"
                />
                <p>
                  <Input accept="image/*" id="contained-button-file" multiple type="file" onChange={handleChange} />
                </p>

              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseProduct}>Отмена</Button>
                <Button onClick={handleAddProduct}>Выставить</Button>
              </DialogActions>
            </Dialog>
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