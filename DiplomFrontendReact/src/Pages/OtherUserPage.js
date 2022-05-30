

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
  const [myData, setData] = useState("");
  const [myUsers, setUsers] = useState([]);
  const [myPicture, setPicture] = useState("");
  const [myFeed, setFeed] = useState([]);
  const [FriendList, setFriend] = useState("");
  const [myModerators, setModerators] = useState([]);
  const [refreshcounter, setRefresh] = useReducer(x => x + 1, 0);

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
  const getModerators = async () => {
    fetch('https://localhost:7049/api/AddToRole', {
      method: 'GET',
      credentials: 'include',
    })
      .then((response) => response.json())
      .then((data) => {
        setModerators(data)
      })

  }
  const handleAddFriend = async () => {

    setOpen(true);
    setRefresh();
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
          alert('Failed');
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
          alert('Failed');
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
  const [isAdmin, setIsAdmin] = useState(false);
  const [isModerator, setIsModerator] = useState(false);

  useEffect(() => {
    getUserData();
    getAllUsersData();
    getFeed();
    getFriends();
    getModerators();
    var cookie = getCookie('jwt');
    if (String(cookie) === "null") {
      navigate('/LoginPage'
      )
    }
  }, [""]);


  if (myData.Login !== undefined) {
    const isAdmin = async () => {

      fetch('https://localhost:7049/api/Roles', {

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
            login: 1,
            password: 1,
            email: '1',
            name: 1,
            surname: '1',
            patronymic: '1',
            dateOfBirth: '1',
            city: '1',
            UserName: myData.Login
          }
        )
      })

        .then(res => res.json())
        .then((result) => {
          setIsAdmin(result);
        },
          (error) => {
            alert('Failed');
          })
    }
    isAdmin();

    const isModerator = async () => {

      fetch('https://localhost:7049/api/Moderator', {

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
            login: 1,
            password: 1,
            email: '1',
            name: 1,
            surname: '1',
            patronymic: '1',
            dateOfBirth: '1',
            city: '1',
            UserName: myData.Login
          }
        )
      })

        .then(res => res.json())
        .then((result) => {
          setIsModerator(result);
        },
          (error) => {
            alert('Failed');
          })
    }
    isModerator();
  }


  const handleSetModerator = async () => {

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
      },
        (error) => {
          alert('Failed');
        })
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
          alert(error);
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
        alert("Права успешно сняты")
        console.log(result);

      },
        (error) => {
          console.log(error)
        })
    setRefresh();
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
          alert(error);
        })

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
          Host: myData.Id,
          Friend: currentUserId
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
  for (var i = 0; i < FriendList.length; i++) {

    if (FriendList[i].host === currentUserId && FriendList[i].friend === myData.Id) {

      isFriend = true;
    }
  }

  let isThisUserModerator = false;
  for (var i = 0; i < myModerators.length; i++) {
    if (myModerators[i].UserId == currentUserId) {
      isThisUserModerator = true;
    }
  }
  console.log(isThisUserModerator);

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
                <List >

                  <ListItem style={{ marginLeft: '18%' }}>

                    <Button onClick={handleAddFriend} variant="contained" component="span">
                      Добавить в друзья
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
                <List >

                  <ListItem style={{ marginLeft: '18%' }}>

                    <Button onClick={handleDeleteFriend} variant='outlined' component="span">
                      Удалить из друзей
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
                <List >

                  <ListItem style={{ marginLeft: '18%' }}>

                    <Button onClick={handleAddFriend} variant="contained" component="span">
                      Добавить в друзья
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
                <List >

                  <ListItem style={{ marginLeft: '18%' }}>

                    <Button onClick={handleDeleteFriend} variant='outlined' component="span">
                      Удалить из друзей
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
                <List>

                  <ListItem style={{ marginLeft: '18%' }}>

                    <Button onClick={handleAddFriend} variant="contained" component="span">
                      Добавить в друзья
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
                <List>
                  <ListItem style={{ marginLeft: '18%' }}>
                    <Button onClick={handleDeleteFriend} variant='outlined' component="span">
                      Удалить из друзей
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
                  <ListItem>
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
                <List>
                  <ListItem style={{ marginLeft: '18%' }}>
                    <Button onClick={handleAddFriend} variant="contained" component="span">
                      Добавить в друзья
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
                <List>
                  <ListItem>
                  </ListItem>
                  <Button onClick={handleDeleteFriend} variant='outlined' component="span">
                    Удалить из друзей
                  </Button>
                  <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                      Друг успешно удалён
                    </Alert>
                  </Snackbar>
                  <ListItem style={{ marginLeft: '17%' }}>
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