import React, { Component, useState, useEffect, useRef, useReducer } from 'react';
import { useNavigate } from 'react-router-dom';

import dstu from './dstu.jpg'
import { Box } from '@mui/system';
import { List, ListItem } from '@mui/material';
import { Typography } from '@mui/material';
import { Avatar } from '@mui/material';
import { Button } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Card({ person, currentUserId }) {

  const [refreshcounter, setRefresh] = useReducer(x => x + 1, 0);
  const [open, setOpen] = React.useState(false);
  const [FriendList, setFriend] = useState("");
  const [isFriend, setCheckFriend] = useState(0);


  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  let check = 0;
  let url = window.location.href;
  for (var i = 0; i < FriendList.length; i++) {
    if (FriendList[i].host === currentUserId && FriendList[i].friend === person.Id || FriendList[i].friend === currentUserId && FriendList[i].host === person.Id) {
      check = 1;
    }
  }
  const getFriends = async () => {
    fetch('https://localhost:7049/api/ChatSearch', {
      method: 'GET',
      credentials: 'include',
    })
      .then((response) => response.json())
      .then((data) => {
        setFriend(data)
      })

  }

  useEffect(() => {

    getFriends();
  }, [refreshcounter]);

  const handleSubmit = async () => {

    setOpen(true);
    fetch('https://localhost:7049/api/AddFriend', {

      method: 'POST',
      credentials: 'include',

      headers:
      {

        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(
        {
          Host: currentUserId,
          Friend: person.Id
        }
      )
    })

      .then(res => res.json())
      .then((result) => {
        if (JSON.stringify(result) === '1') {

        }
        else {

        }
      },
        (error) => {
          alert('Failed');
        })

    setRefresh();
  }

  const handleDelete = async () => {

    setOpen(true);
    fetch('https://localhost:7049/api/AddFriend', {

      method: 'DELETE',
      credentials: 'include',

      headers:
      {

        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(
        {
          Host: currentUserId,
          Friend: person.Id
        }
      )
    })

      .then(res => res.json())
      .then((result) => {

      },
        (error) => {
          alert(error);
        })
    setRefresh();
  }
  if (String(url) === "https://localhost:3000/ChatPage") {
    return (
      <Box display={'inline-block'}>
        <Box display={'flex'} width={'20%'}>

          <Avatar src={dstu} sx={{ width: 50, height: 50, marginTop: '25%', marginLeft: "10px" }} />
          <List>
            <Box  width='100%'>
              <Button  style={{marginLeft:'5px', width:'150px'}} variant="text">   <Typography variant="body1"  gutterBottom component="div">

                {person.Name} {person.Surname}
              </Typography></Button>
            </Box>
          </List>
        </Box>

      </Box>
    );
  }
  if (currentUserId === person.Id) {

    return (
      <Box display={'inline-block'}>
        <Box display={'flex'} width={'40%'}>

          <Avatar src={dstu} sx={{ width: 80, height: 80, marginTop: '3%', marginLeft: "10px" }} />
          <List>
            <ListItem>
              <Typography variant="h5" gutterBottom component="div">

                {person.Name} {person.Surname}
              </Typography>
            </ListItem>
            <ListItem>
              {person.Email}
            </ListItem>


            <Box paddingLeft={"20px"} width='300px'>
              <Button variant="text">Это вы</Button>
            </Box>
          </List>
        </Box>

      </Box>
    );
  }

  if (check === 0) {
    return (
      <Box display={'inline-block'}>

        <Box display={'flex'} width={'40%'}>

          <Avatar src={dstu} sx={{ width: 80, height: 80, marginTop: '3%', marginLeft: "10px" }} />
          <List>
            <ListItem>
              <Typography variant="h5" gutterBottom component="div">

                {person.Name} {person.Surname}
              </Typography>
            </ListItem>
            <ListItem>
              {person.Email}
            </ListItem>


            <Box paddingLeft={"20px"} width='300px'>
              <Button onClick={handleSubmit} variant="contained">Добавить в друзья</Button>
            </Box>
          </List>
        </Box>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
            Друг успешно удалён
          </Alert>
        </Snackbar>

      </Box>
    );
  }
  else {
    return (
      <Box display={'inline-block'}>

        <Box display={'flex'} width={'40%'}>

          <Avatar src={dstu} sx={{ width: 80, height: 80, marginTop: '3%', marginLeft: "10px" }} />
          <List>
            <ListItem>
              <Typography variant="h5" gutterBottom component="div">

                {person.Name} {person.Surname}
              </Typography>
            </ListItem>
            <ListItem>
              {person.Email}
            </ListItem>


            <Box paddingLeft={"20px"} width='300px'>
              <Button onClick={handleDelete} variant="outlined">Удалить из друзей</Button>
            </Box>
          </List>
        </Box>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
            Друг успешно добавлен
          </Alert>
        </Snackbar>

      </Box>
    );
  }
}

export default Card;