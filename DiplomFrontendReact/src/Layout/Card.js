import React, { Component, useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import dstu from './dstu.jpg'
import { Box } from '@mui/system';
import { List, ListItem } from '@mui/material';
import { Typography } from '@mui/material';
import { Avatar } from '@mui/material';
import { Button } from '@mui/material';

function Card({ person }) {

  const [myData, setData] = useState("");

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
  useEffect(() => {
    
    getUserData();
 
  }, []);
  const handleSubmit = async () => {
   
  
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
          Host: myData.Id,
          Friend: person.Id
        }
      )
    })

      .then(res => res.json())
      .then((result) => {
        if (JSON.stringify(result) === '1') {
          alert('Success');          
        }
        else {
          alert(myData.Id);
          alert(person.Id);
          alert(result);
        }
      },
        (error) => {
          alert('Failed');
        })
  }

  return (
    <Box display={'flex'}>


      <Avatar src={dstu} sx={{ width: 80, height: 80, marginTop: '3%', marginLeft: "10px" }} />
      <List>
        <ListItem>
          <Typography variant="h5" gutterBottom component="div">

            {person.Name} {person.Surname}
          </Typography>
        </ListItem>
        <ListItem>
          {person.Email}
          <Box paddingLeft={"100px"} width='300px'>
          <Button onClick={handleSubmit} variant="contained">Добавить в друзья</Button>
        </Box>
        </ListItem>

        
      </List>


    </Box>
  );
}

export default Card;