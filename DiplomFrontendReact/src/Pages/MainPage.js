

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
  const ColoredLine = ({ color }) => (
    <hr
        style={{
            color: color,
            backgroundColor: color,
            width: "100%"
        }}
    />
);
  const componentDidMount = async () => {

  }

  return (
    <>
      <div style={{ verticalAlign: 'top', width: '100%', marginTop: "0%", textAlign: 'start', display: 'flex', backgroundColor: 'whitesmoke' }}>
        <LeftMenu />
        <Box width={'60%'} marginRight={'10%'} textAlign={'start'} display={'flex'}  justify-content={'space-between'}>

          <Box  paddingTop={3}  bgcolor={'white'} borderRadius={3} borderBottom={0} marginTop={'2%'} width={'370px'} height={'370px'}  textAlign={'center'} verticalAlign={'top'}>

            <img src={dstu} alt="Dstu" width={"330"} height={"350"} />
          </Box>
          <Box textAlign={'center'}   bgcolor={'white'} borderRadius={3} borderTop={0} marginLeft={'2%'} marginTop={'2%'} width={'50%'} >
           
         
            <List>
              <ListItem>

                <Typography variant="h5" gutterBottom component="div">
                  <p>
                    {myData.Name} {myData.Surname} {myData.Patronymic}
                  </p>
                </Typography>
              </ListItem>
              <ListItem>
                
                <ColoredLine color="black"/>
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
      <Footer />
    </>

  );

}

export default MainPage;