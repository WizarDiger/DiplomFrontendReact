

import React, { Component, useState, useEffect, useReducer } from 'react';
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
import { Alert, Input, Snackbar } from '@mui/material';
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
  const [open, setOpen] = React.useState(false);
  const [openModeratorNotification, setOpenModeratorNotification] = React.useState(false);
  const [myData, setData] = useState("");
  const [myUsers, setUsers] = useState([]);
  const [myPicture, setPicture] = useState("");
  const [myFeed, setFeed] = useState([]);
  const [FriendList, setFriend] = useState("");
  const [refreshcounter, setRefresh] = useReducer(x => x + 1, 0);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isModerator, setIsModerator] = useState(false);
  const [isThisUserModerator, setIsThisUserModerator] = useState(false);
  const [myStaff, setStaff] = useState([]);
  let currentUserId = useParams().id;
  let isFriend = false;
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
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  const handleCloseModeratorNotification = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
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

  const getStaff = async () => {
    fetch('https://localhost:7049/api/Moderator', {
      method: 'GET',
      credentials: 'include',
    })
      .then((response) => response.json())
      .then((data) => {
        setStaff(data)
      })

  }
  const handleAddFriend = async () => {

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
          Host: myData.Id,
          Friend: currentUserId
        }
      )
    })

      .then(res => res.json())
      .then((result) => {
      },
        (error) => {
          console.log(error);
        })


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
          Friend: myData.Id
        }
      )
    })

      .then(res => res.json())
      .then((result) => {
        setRefresh();

      },
        (error) => {
          console.log(error);
        })
    setRefresh();

  }

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
  const getAllUsersData = async () => {
    fetch('https://localhost:7049/api/Search', {
      method: 'GET',
      credentials: 'include',
    })
      .then((response) => response.json())
      .then((data) => {
        setUsers(data)
      });

  }



  const defineRoles = async () => {


    for (var i = 0; i < myStaff.length; i++) {
      
      if (myStaff[i].UserId == currentUserId && myStaff[i].RoleId == "372292a0-6835-482e-9c80-f945af6bdcfd") {

        setIsThisUserModerator(true);
      }
      if (myStaff[i].UserId == myData.Id && myStaff[i].RoleId == "372292a0-6835-482e-9c80-f945af6bdcfd") {

        setIsModerator(true);
      }
      if (myStaff[i].UserId == myData.Id && myStaff[i].RoleId == "ac8ecd46-fc40-47f6-9473-27aa9adee354") {

        setIsAdmin(true);
      }
    }
    
  }
  const handleSetModerator = async () => {
    setOpenModeratorNotification(true);
    fetch('https://localhost:7049/api/AddToRole', {

      method: 'POST',
      credentials: 'include',

      headers:
      {
        'Access-Control-Allow-Origin': 'https://localhost:3000/',
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(
        {
          UserName: currentUser[0].Login,
          Role: "Moderator"
        }
      )
    })

      .then(res => res.json())
      .then((result) => {
        console.log(result);
        setRefresh();
      },
        (error) => {
          console.log(error);
        })

        window.location.reload();
  
  }
  const handleDeleteFromAllFriends = async () => {


    fetch('https://localhost:7049/api/DeleteFromAllFriendLists', {

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
          Friend: 1
        }
      )
    })

      .then(res => res.json())
      .then((result) => {

      },
        (error) => {
          console.log(error);
        })
  }
  const handleDeleteUser = async () => {
    handleDeleteFromAllFriends();
    fetch(`https://localhost:7049/api/Login/${currentUserId}`, {

      method: 'DELETE',
      credentials: 'include',

      headers:
      {
        'Access-Control-Allow-Origin': 'https://localhost:3000/',
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(

      )
    })

      .then(res => res.json())
      .then((result) => {
        alert("Пользователь успешно заблокирован")
        console.log(result);
        navigate('/MainPage')
      },
        (error) => {
          console.log(error)
        })
    setRefresh();
  }

  const handleDeleteModerator = async () => {
    setOpenModeratorNotification(true);
   
    fetch(`https://localhost:7049/api/AddToRole/${currentUserId}`, {

      method: 'DELETE',
      credentials: 'include',

      headers:
      {
        'Access-Control-Allow-Origin': 'https://localhost:3000/',
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(

      )
    })

      .then(res => res.json())
      .then((result) => {

        console.log(result);

      },
        (error) => {
          console.log(error)
        })
    
      window.location.reload();
  }
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
  const handleDeleteFriend = async () => {

    setOpen(true);
    setRefresh();
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
          Friend: myData.Id
        }
      )
    })

      .then(res => res.json())
      .then((result) => {

      },
        (error) => {
          console.log(error);
        })


    setRefresh();

  }
  for (var i = 0; i < FriendList.length; i++) {

    if (FriendList[i].host === currentUserId && FriendList[i].friend === myData.Id) {

      isFriend = true;
    }
  }
  useEffect(() => {
    getUserData();
    getAllUsersData();
    getFeed();
    getFriends();
    getStaff();
    defineRoles();
    if (myStaff.length === 0 || myData.Id === undefined) {
      setRefresh();
    }
    var cookie = getCookie('jwt');
    if (String(cookie) === "null") {
      navigate('/LoginPage'
      )
    }
  }, [refreshcounter]);

  if (isAdmin && !isModerator && !isFriend && isThisUserModerator) {
    
    return (
      <>
        <Header />
        <div style={{ marginLeft: 'auto', marginRight: 'auto', width: '100%', display: 'flex', backgroundColor: 'whitesmoke' }}>
          <LeftMenu />
          <Box width={'60%'} marginRight={'10%'} textAlign={'start'} display={'flex'} justify-content={'space-between'}>

            <Box paddingTop={3} bgcolor={'white'} borderRadius={3} borderBottom={0} marginTop={'2%'} width={'370px'} height={'370px'} textAlign={'center'} verticalAlign={'top'}>

              <img src={dstu} alt="Dstu" width={"330"} height={"350"} />
              <label htmlFor="contained-button-file">
                <List style={{ marginTop: '30px', backgroundColor: 'white', borderRadius: 20 }}>

                  <ListItem style={{ marginLeft: '18%' }}>

                    <Button onClick={handleAddFriend} variant="contained" component="span">
                      Добавить в друзья
                    </Button>
                    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                      <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                        Друг успешно удалён
                      </Alert>
                    </Snackbar>
                  </ListItem>
                  <ListItem style={{ marginLeft: '14%' }}>
                    <Link to={'/ChatPage/' + currentUserId} style={{ textDecoration: 'none', color: 'inherit' }}>
                      <Button variant='contained'>
                        Написать сообщение
                      </Button>
                    </Link>
                  </ListItem>
                  <ListItem style={{ marginLeft: '22%' }}>
                    <Button onClick={handleDeleteUser} variant='contained'>
                      Заблокировать
                    </Button>
                  </ListItem>
                  <ListItem style={{ marginLeft: '2%' }}>
                    <Button onClick={handleDeleteModerator} variant='outlined'>
                      Снять с должности модератора
                    </Button>
                    <Snackbar open={openModeratorNotification} autoHideDuration={6000} onClose={handleCloseModeratorNotification}>
                      <Alert onClose={handleCloseModeratorNotification} severity="success" sx={{ width: '100%' }}>                       
                        Пользователю выданы права модератора
                      </Alert>
                    </Snackbar>
                  </ListItem>
                </List>
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
                    BirthDaty: {currentUser.map(m => m.DateOfBirth.substring(0,10))}
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
  if (isAdmin && !isModerator && isFriend && isThisUserModerator) {
    return (
      <>
        <Header />
        <div style={{ marginLeft: 'auto', marginRight: 'auto', width: '100%', display: 'flex', backgroundColor: 'whitesmoke' }}>
          <LeftMenu />
          <Box width={'60%'} marginRight={'10%'} textAlign={'start'} display={'flex'} justify-content={'space-between'}>

            <Box paddingTop={3} bgcolor={'white'} borderRadius={3} borderBottom={0} marginTop={'2%'} width={'370px'} height={'370px'} textAlign={'center'} verticalAlign={'top'}>

              <img src={dstu} alt="Dstu" width={"330"} height={"350"} />
              <label htmlFor="contained-button-file">
                <List style={{ marginTop: '30px', backgroundColor: 'white', borderRadius: 20 }}>

                  <ListItem style={{ marginLeft: '18%' }}>

                    <Button onClick={handleDeleteFriend} variant='outlined' component="span">
                      Удалить из друзей
                    </Button>
                    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                      <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                        Друг успешно добавлен
                      </Alert>
                    </Snackbar>
                  </ListItem>
                  <ListItem style={{ marginLeft: '14%' }}>
                    <Link to={'/ChatPage/' + currentUserId} style={{ textDecoration: 'none', color: 'inherit' }}>
                      <Button variant='contained'>
                        Написать сообщение
                      </Button>
                    </Link>
                  </ListItem>
                  <ListItem style={{ marginLeft: '22%' }}>
                    <Button onClick={handleDeleteUser} variant='contained'>
                      Заблокировать
                    </Button>

                  </ListItem>
                  <ListItem style={{ marginLeft: '2%' }}>
                    <Button onClick={handleDeleteModerator} variant='outlined'>
                      Снять с должности модератора
                    </Button>
                    <Snackbar open={openModeratorNotification} autoHideDuration={6000} onClose={handleCloseModeratorNotification}>
                      <Alert onClose={handleCloseModeratorNotification} severity="success" sx={{ width: '100%' }}>
                        Модератор снят с должности
                      </Alert>
                    </Snackbar>
                  </ListItem>
                </List>
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
                    BirthDaty: {currentUser.map(m => m.DateOfBirth.substring(0,10))}
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
  if (isAdmin && !isModerator && !isFriend) {
    return (
      <>
        <Header />
        <div style={{ marginLeft: 'auto', marginRight: 'auto', width: '100%', display: 'flex', backgroundColor: 'whitesmoke' }}>
          <LeftMenu />
          <Box width={'60%'} marginRight={'10%'} textAlign={'start'} display={'flex'} justify-content={'space-between'}>

            <Box paddingTop={3} bgcolor={'white'} borderRadius={3} borderBottom={0} marginTop={'2%'} width={'370px'} height={'370px'} textAlign={'center'} verticalAlign={'top'}>

              <img src={dstu} alt="Dstu" width={"330"} height={"350"} />
              <label htmlFor="contained-button-file">
                <List style={{ marginTop: '30px', backgroundColor: 'white', borderRadius: 20 }}>

                  <ListItem style={{ marginLeft: '18%' }}>

                    <Button onClick={handleAddFriend} variant="contained" component="span">
                      Добавить в друзья
                    </Button>
                    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                      <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                        Друг успешно удалён
                      </Alert>
                    </Snackbar>
                  </ListItem>
                  <ListItem style={{ marginLeft: '14%' }}>
                    <Link to={'/ChatPage/' + currentUserId} style={{ textDecoration: 'none', color: 'inherit' }}>
                      <Button variant='contained'>
                        Написать сообщение
                      </Button>
                    </Link>
                  </ListItem>
                  <ListItem style={{ marginLeft: '22%' }}>
                    <Button onClick={handleDeleteUser} variant='contained'>
                      Заблокировать
                    </Button>
                  </ListItem>
                  <ListItem style={{ marginLeft: '11%' }}>
                    <Button onClick={handleSetModerator} variant='contained'>
                      Назначить модератором
                    </Button>
                  </ListItem>
                </List>
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
                    BirthDaty: {currentUser.map(m => m.DateOfBirth.substring(0,10))}
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
  if (isAdmin && !isModerator && isFriend) {
    return (
      <>
        <Header />
        <div style={{ marginLeft: 'auto', marginRight: 'auto', width: '100%', display: 'flex', backgroundColor: 'whitesmoke' }}>
          <LeftMenu />
          <Box width={'60%'} marginRight={'10%'} textAlign={'start'} display={'flex'} justify-content={'space-between'}>

            <Box paddingTop={3} bgcolor={'white'} borderRadius={3} borderBottom={0} marginTop={'2%'} width={'370px'} height={'370px'} textAlign={'center'} verticalAlign={'top'}>

              <img src={dstu} alt="Dstu" width={"330"} height={"350"} />
              <label htmlFor="contained-button-file">
                <List style={{ marginTop: '30px', backgroundColor: 'white', borderRadius: 20 }}>

                  <ListItem style={{ marginLeft: '18%' }}>

                    <Button onClick={handleDeleteFriend} variant='outlined' component="span">
                      Удалить из друзей
                    </Button>
                    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                      <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                        Друг успешно добавлен
                      </Alert>
                    </Snackbar>
                  </ListItem>
                  <ListItem style={{ marginLeft: '14%' }}>
                    <Link to={'/ChatPage/' + currentUserId} style={{ textDecoration: 'none', color: 'inherit' }}>
                      <Button variant='contained'>
                        Написать сообщение
                      </Button>
                    </Link>
                  </ListItem>
                  <ListItem style={{ marginLeft: '22%' }}>
                    <Button onClick={handleDeleteUser} variant='contained'>
                      Заблокировать
                    </Button>

                  </ListItem>
                  <ListItem style={{ marginLeft: '12%' }}>
                    <Button onClick={handleSetModerator} variant='contained'>
                      Назначить модератором
                    </Button>
                  </ListItem>
                </List>
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
                    BirthDaty: {currentUser.map(m => m.DateOfBirth.substring(0,10))}
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
  if (isModerator && !isFriend) {
    return (
      <>
        <Header />
        <div style={{ marginLeft: 'auto', marginRight: 'auto', width: '100%', display: 'flex', backgroundColor: 'whitesmoke' }}>
          <LeftMenu />
          <Box width={'60%'} marginRight={'10%'} textAlign={'start'} display={'flex'} justify-content={'space-between'}>

            <Box paddingTop={3} bgcolor={'white'} borderRadius={3} borderBottom={0} marginTop={'2%'} width={'370px'} height={'370px'} textAlign={'center'} verticalAlign={'top'}>

              <img src={dstu} alt="Dstu" width={"330"} height={"350"} />
              <label htmlFor="contained-button-file">
                <List style={{ marginTop: '30px', backgroundColor: 'white', borderRadius: 20 }}>

                  <ListItem style={{ marginLeft: '18%' }}>

                    <Button onClick={handleAddFriend} variant="contained" component="span">
                      Добавить в друзья
                    </Button>
                    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                      <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                        Друг успешно удалён
                      </Alert>
                    </Snackbar>
                  </ListItem>
                  <ListItem style={{ marginLeft: '14%' }}>
                    <Link to={'/ChatPage/' + currentUserId} style={{ textDecoration: 'none', color: 'inherit' }}>
                      <Button variant='contained'>
                        Написать сообщение
                      </Button>
                    </Link>
                  </ListItem>
                  <ListItem style={{ marginLeft: '22%' }}>

                    <Button onClick={handleDeleteUser} variant='contained'>
                      Заблокировать
                    </Button>
                  </ListItem>
                </List>
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
                    BirthDaty: {currentUser.map(m => m.DateOfBirth.substring(0,10))}
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
  if (isModerator && isFriend) {
    return (
      <>
        <Header />
        <div style={{ marginLeft: 'auto', marginRight: 'auto', width: '100%', display: 'flex', backgroundColor: 'whitesmoke' }}>
          <LeftMenu />
          <Box width={'60%'} marginRight={'10%'} textAlign={'start'} display={'flex'} justify-content={'space-between'}>
            <Box paddingTop={3} bgcolor={'white'} borderRadius={3} borderBottom={0} marginTop={'2%'} width={'370px'} height={'370px'} textAlign={'center'} verticalAlign={'top'}>
              <img src={dstu} alt="Dstu" width={"330"} height={"350"} />
              <label htmlFor="contained-button-file">
                <List style={{ marginTop: '30px', backgroundColor: 'white', borderRadius: 20 }}>
                  <ListItem style={{ marginLeft: '18%' }}>
                    <Button onClick={handleDeleteFriend} variant='outlined' component="span">
                      Удалить из друзей
                    </Button>
                    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                      <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                        Друг успешно добавлен
                      </Alert>
                    </Snackbar>
                  </ListItem>
                  <ListItem style={{ marginLeft: '14%' }}>
                    <Link to={'/ChatPage/' + currentUserId} style={{ textDecoration: 'none', color: 'inherit' }}>
                      <Button variant='contained'>
                        Написать сообщение
                      </Button>
                    </Link>
                  </ListItem>
                  <ListItem style={{ marginLeft: '22%' }}>
                    <Button onClick={handleDeleteUser} variant='contained'>
                      Заблокировать
                    </Button>
                  </ListItem>
                </List>
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
                    BirthDaty: {currentUser.map(m => m.DateOfBirth.substring(0,10))}
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
  if (!isAdmin && !isModerator && !isFriend) {
    return (
      <>
        <Header />
        <div style={{ marginLeft: 'auto', marginRight: 'auto', width: '100%', display: 'flex', backgroundColor: 'whitesmoke' }}>
          <LeftMenu />
          <Box width={'60%'} marginRight={'10%'} textAlign={'start'} display={'flex'} justify-content={'space-between'}>

            <Box paddingTop={3} bgcolor={'white'} borderRadius={3} borderBottom={0} marginTop={'2%'} width={'370px'} height={'370px'} textAlign={'center'} verticalAlign={'top'}>

              <img src={dstu} alt="Dstu" width={"330"} height={"350"} />
              <label htmlFor="contained-button-file">
                <List style={{ marginTop: '30px', backgroundColor: 'white', borderRadius: 20 }}>
                  <ListItem style={{ marginLeft: '18%' }}>
                    <Button onClick={handleAddFriend} variant="contained" component="span">
                      Добавить в друзья
                    </Button>
                    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                      <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                        Друг успешно удалён
                      </Alert>
                    </Snackbar>
                  </ListItem>
                  <ListItem style={{ marginLeft: '14%' }}>
                    <Link to={'/ChatPage/' + currentUserId} style={{ textDecoration: 'none', color: 'inherit' }}>
                      <Button variant='contained'>
                        Написать сообщение
                      </Button>
                    </Link>
                  </ListItem>
                </List>
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
                    BirthDaty: {currentUser.map(m => m.DateOfBirth.substring(0,10))}
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

  if (!isAdmin && !isModerator && isFriend) {
    return (
      <>
        <Header />
        <div style={{ marginLeft: 'auto', marginRight: 'auto', width: '100%', display: 'flex', backgroundColor: 'whitesmoke' }}>
          <LeftMenu />
          <Box width={'60%'} marginRight={'10%'} textAlign={'start'} display={'flex'} justify-content={'space-between'}>

            <Box paddingTop={3} bgcolor={'white'} borderRadius={3} borderBottom={0} marginTop={'2%'} width={'370px'} height={'370px'} textAlign={'center'} verticalAlign={'top'}>

              <img src={dstu} alt="Dstu" width={"330"} height={"350"} />
              <label htmlFor="contained-button-file">
                <List style={{ marginTop: '30px', backgroundColor: 'white', borderRadius: 20 }}>
                  <ListItem style={{ marginLeft: '18%' }}>
                    <Button onClick={handleDeleteFriend} variant='outlined' component="span">
                      Удалить из друзей
                    </Button>
                    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                      <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                        Друг успешно добавлен
                      </Alert>
                    </Snackbar>
                  </ListItem>
                  <ListItem style={{ marginLeft: '14%' }}>
                    <Link to={'/ChatPage/' + currentUserId} style={{ textDecoration: 'none', color: 'inherit' }}>
                      <Button variant='contained'>
                        Написать сообщение
                      </Button>
                    </Link>
                  </ListItem>
                </List>
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
}

export default OtherUserPage;