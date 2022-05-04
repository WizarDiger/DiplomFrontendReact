

import React, { Component, useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import { useNavigate } from 'react-router-dom';
import { wait } from '@testing-library/user-event/dist/utils';
import LeftMenu from '../Layout/LeftMenu';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import dstu from './PageImages/dstu.jpg'
import { BrowserRouter as Router, Link, Navigate } from "react-router-dom";
import Footer from '../Layout/Footer';

function getCookie(name) {
  var dc = document.cookie;
  var prefix = name + "=";
  var begin = dc.indexOf("; " + prefix);
  if (begin == -1) {
    begin = dc.indexOf(prefix);
    if (begin != 0) return null;
  }
  else {
    begin += 2;
    var end = document.cookie.indexOf(";", begin);
    if (end == -1) {
      end = dc.length;
    }
  }
  return decodeURI(dc.substring(begin + prefix.length, end));
}

function MainPage(props) {


  const [myData, setData] = useState("");
  let check = 0;
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

    var cookie = getCookie('jwt');
    if (String(cookie) === "null") {
      navigate('/LoginPage'
      )
    }
  }, [""]);

  let navigate = useNavigate();

  const componentDidMount = async () => {

  }

  return (
    <>
      <LeftMenu />
      <div style={{ verticalAlign: 'top', width: '60%', marginTop: "1%", textAlign: 'center', display: 'inline-block' }}>
        <Box width={'100%'} textAlign={'start'}>

          <Box borderBottom={1} marginTop={'0'} width={'330'} display={'inline-block'}>

            <img src={dstu} alt="Dstu" width={"330"} height={"350"} />
          </Box>
          <Box borderTop={1} marginLeft={'2%'} marginTop={'0%'} width={'50%'} display={'inline-block'} >
            <List>
              <ListItem>

                <Typography variant="h3" gutterBottom component="div">
                  <p>
                    {myData.Name} {myData.Surname} {myData.Patronymic}
                  </p>
                </Typography>
              </ListItem>

              <Typography variant="h6" gutterBottom component="div">

                <ListItem>
                  E-mail: {myData.Email}
                </ListItem>
                <ListItem>
                  City: {myData.City}
                </ListItem>
              </Typography>
            </List>
          </Box>
        </Box>


      </div>
      <Footer/>
    </>

  );

}

export default MainPage;