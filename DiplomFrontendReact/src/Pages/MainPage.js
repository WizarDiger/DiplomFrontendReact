

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
import Header from '../Layout/Header';
import { Input } from '@mui/material';
import { Button } from '@mui/material';
import Post from '../Layout/Post';
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
  const [myPicture, setPicture] = useState("");
  const [myFeed, setFeed] = useState([]);
  const [myFriends, setFriends] = useState([]);
  const getUserData = async () => {
    fetch('https://localhost:7049/api/Login', {
      method: 'GET',
      credentials: 'include',
    })
      .then((response) => response.json())
      .then((data) => {
        data.DateOfBirth = data.DateOfBirth.toString().substring(0,10);
        setData(data)
      });

  }



  let myPosts = myFeed.filter(
    post => {
      return (
        post.sender.includes(myData.Id)
      )
    }
  )


  const getFeed = async () => {
    fetch('https://localhost:7049/api/Feed', {
      method: 'GET',
      credentials: 'include',
    })
      .then((response) => response.json())
      .then((data) => {
        setFeed(data)
      });

  }
  let feed = [];
  if (myPosts[0] !== undefined) {

    feed = myPosts
      .map(m => <Post
        key={Date.now() * Math.random()}
        sendername={m.sendername}
        title={m.title}
        sendtime={m.sendtime}
        description={m.description}
        imagename={m.imagename}
      />);
  }
  else {
    feed = ["Сейчас постов нет"];
  }
  useEffect(() => {

    getUserData();
    getFeed();
    getFriends();
    console.log(myData);
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
  function handleChange(event) {
    setPicture(event.target.files[0].name)
    alert(event.target.files[0].name)
  }
  const getFriends = async () => {
    fetch('https://localhost:7049/api/ChatSearch', {
      method: 'GET',
      credentials: 'include',
    })
      .then((response) => response.json())
      .then((data) => {
        setFriends(data)
      })

  }

  const filteredFriends = myFriends.filter(

    person => {

      return (
        person
          .host
          .includes(myData.Id)
      );
    }
  );
  return (
    <>

      <Header />
      <div style={{ marginLeft: 'auto', marginRight: 'auto', width: '100%', display: 'flex', backgroundColor: 'whitesmoke' }}>
        <LeftMenu />
        <Box width={'60%'} marginRight={'10%'} textAlign={'start'} display={'flex'} justify-content={'space-between'}>

          <Box paddingTop={3} bgcolor={'white'} borderRadius={3} borderBottom={0} marginTop={'2%'} width={'370px'} height={'370px'} textAlign={'center'} verticalAlign={'top'}>

            <img src={dstu} alt="Dstu" width={"330"} height={"350"} />
            <Box paddingTop={3}>
              <label htmlFor="contained-button-file">
                <Input accept="image/*" id="contained-button-file" multiple type="file" onChange={handleChange} />
              </label>
              <Button variant="contained" component="span">
                Upload
              </Button>
            </Box>
            <Box bgcolor={'white'} borderRadius={2} marginTop={'5%'} paddingTop={'15px'} paddingBottom={'15px'}>
              <Box marginLeft={'25px'} marginRight={'25px'}>

                <Link to={'/FriendsPage'} style={{ textDecoration: 'none', color: 'inherit' }}>

                  <Button fullWidth variant="contained">Друзья {filteredFriends.length}</Button>
                </Link>
              </Box>

            </Box>
          </Box>
          <Box textAlign={'center'} bgcolor={'white'} borderRadius={3} borderTop={0} marginLeft={'2%'} marginTop={'2%'} width={'50%'} >


            <List>
              <ListItem>

                <Typography variant="h5" gutterBottom component="div">
                  <p>
                    {myData.Name} {myData.Patronymic} {myData.Surname}
                  </p>
                </Typography>
              </ListItem>
              <ListItem>

                <ColoredLine color="black" />
              </ListItem>
              <Typography variant="h6" gutterBottom component="div">

                <ListItem>
                  E-mail: {myData.Email}
                </ListItem>
                <ListItem>
                  City: {myData.City}
                </ListItem>
                <ListItem>
                  BirthDaty: {myData.DateOfBirth}
                </ListItem>
              </Typography>
            </List>
            <ColoredLine color="black" />
            {feed}
          </Box>
        </Box>


      </div>
      <Footer />
    </>

  );

}

export default MainPage;