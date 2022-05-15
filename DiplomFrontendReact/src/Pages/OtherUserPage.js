

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
import { useParams } from 'react-router';
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

function OtherUserPage(props) {
  const [myData, setData] = useState("");
  const [myUsers, setUsers] = useState([]);
  const [myPicture, setPicture] = useState("");
  const [myFeed, setFeed] = useState([])
  let currentUserId = useParams().id;

  const currentUser = myUsers.filter(

    person => {
      return (
        person
          .Id
          .includes(currentUserId)
      );

    }
  );
  let myPosts = myFeed.filter(
    post => {
      return (
        post.sender.includes(currentUserId)
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
  console.log(myPosts);
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

  const getUserData = async () => {
    fetch('https://localhost:7049/api/Search', {
      method: 'GET',
      credentials: 'include',
    })
      .then((response) => response.json())
      .then((data) => {
        setUsers(data)
      });

  }


  useEffect(() => {

    getUserData();
    getFeed();
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

  return (
    <>

      <Header />


      <div style={{ marginLeft: 'auto', marginRight: 'auto', width: '100%', display: 'flex', backgroundColor: 'whitesmoke' }}>
        <LeftMenu />
        <Box width={'60%'} marginRight={'10%'} textAlign={'start'} display={'flex'} justify-content={'space-between'}>

          <Box paddingTop={3} bgcolor={'white'} borderRadius={3} borderBottom={0} marginTop={'2%'} width={'370px'} height={'370px'} textAlign={'center'} verticalAlign={'top'}>

            <img src={dstu} alt="Dstu" width={"330"} height={"350"} />
            <label htmlFor="contained-button-file">
              <Input accept="image/*" id="contained-button-file" multiple type="file" onChange={handleChange} />
              <Button variant="contained" component="span">
                Upload
              </Button>
            </label>
          </Box>
          <Box textAlign={'center'} bgcolor={'white'} borderRadius={3} borderTop={0} marginLeft={'2%'} marginTop={'2%'} width={'50%'} >


            <List>
              <ListItem>

                <Typography variant="h5" gutterBottom component="div">
                  <p>
                    {currentUser.map(m => m.Name)} {currentUser.map(m => m.Patronymic)} {currentUser.map(m => m.Surname)}
                  </p>
                </Typography>
              </ListItem>
              <ListItem>

                <ColoredLine color="black" />
              </ListItem>
              <Typography variant="h6" gutterBottom component="div">

                <ListItem>
                  E-mail: {currentUser.map(m => m.Email)}
                </ListItem>
                <ListItem>
                  City: {currentUser.map(m => m.City)}
                </ListItem>
                <ListItem>
                  BirthDaty: {currentUser.map(m => m.DateOfBirth)}
                </ListItem>
              </Typography>
            </List>

            {feed}
          </Box>
        </Box>

      </div>
      <Footer />
    </>

  );

}

export default OtherUserPage;