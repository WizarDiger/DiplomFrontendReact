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

  const [refreshcounter, setRefresh] = useReducer(x=>x+1,0);
  const [open, setOpen] = React.useState(false);
  const [isFriend, setFriend] = useState("");


  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const checkIfAlreadyFriend = async () => {
    
    fetch('https://localhost:7049/api/CheckFriend', {
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


        setFriend(result);

      },
        (error) => {
          alert(error);
        })
      
  }

  useEffect(() => {
    checkIfAlreadyFriend(); 
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
  if (currentUserId === person.Id)
  {
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

  if (isFriend === 0) {
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