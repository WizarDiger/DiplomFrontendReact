

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
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
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

function NewsPage(props) {


    const [myData, setData] = useState("");
    const [myPicture, setPicture] = useState("");
    const [open, setOpen] = React.useState(false);
    const [openProduct, setOpenProduct] = React.useState(false);
    const [myTitle, setTitle] = useState('')
    const [myDescription, setDescription] = useState('')
    const [myPrice, setPrice] = useState('')
    const [myAmount, setAmount] = useState('')
    const [myFeed, setFeed] = useState([])
    const [myFriends, setFriends] = useState([]);
    const [myStaff, setAllStaff] = useState([]);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleClickOpenProduct = () => {
        setOpenProduct(true);
    };

    const handleCloseProduct = () => {
        setOpenProduct(false);
    };
    const handlePublish = () => {

        fetch('https://localhost:7049/api/Feed', {
            method: 'POST',
            headers:
            {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    SenderId: myData.Id,
                    Title: myTitle,
                    SenderName: myData.Name,
                    SendTime: 1,
                    Description: myDescription,
                    ImageName: dstu
                }
            )
        })

            .then(res => res.json())
            .then((result) => {

                if (JSON.stringify(result) === '1') {


                }
            },
                (error) => {
                    alert(error);
                })
        setOpen(false);
    };

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
                    ImagePath: './2374-ed4_wide.jpg'

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
    };

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
    const getAllStaff = async () => {
        fetch('https://localhost:7049/api/Moderator', {
          method: 'GET',
          credentials: 'include',
        })
          .then((response) => response.json())
          .then((data) => {
            setAllStaff(data)
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
    let feedData = [];
    for (var i = 0; i < filteredFriends.length; i++) {

        let buffArray = myFeed.filter(
            post => {
                return (
                    post.sender.includes(filteredFriends[i].friend) ||
                    post.sender.includes(filteredFriends[i].host) ||
                    post.sender.includes(myData.Id)
                )
            }
        )
        for (var j = 0; j < buffArray.length; j++) {
            if (!feedData.includes(buffArray[j])) {

                feedData.push(buffArray[j]);
            }
        }

    }
    for (var i = 0; i < myStaff.length; i++)
    {
   
        let buffArray = myFeed.filter(
            post => {
                return (
                    post.sender.includes(myStaff[i].UserId)
                )
            }
        )
       
        for (var j = 0; j < buffArray.length; j++) {
            if (!feedData.includes(buffArray[j])) {

                feedData.push(buffArray[j]);
            }
        }
    }
    feedData.reverse();
    let feed = [];
    if (feedData[0] !== undefined) {

        feed = feedData
            .map(m => <Post
                key={Date.now() * Math.random()}
                id={m.id}
                sender={m.sender}
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
    useEffect(() => {

        getUserData();
        getFeed();
        getFriends();
        getAllStaff();
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


                    <Box textAlign={'center'} bgcolor={'white'} borderRadius={3} borderTop={0} marginLeft={'2%'} marginTop={'2%'} width={'50%'} >


                        <List>
                            <ListItem>
                                <Typography marginLeft={'40%'} variant="h5" gutterBottom component="div">

                                    Новости
                                </Typography>
                            </ListItem>
                            <ColoredLine color="black" />
                            <ListItem>
                                <Button onClick={handleClickOpen} variant="contained">Создать пост</Button>
                                <Dialog open={open} onClose={handleClose}>
                                    <DialogTitle>Создать пост</DialogTitle>
                                    <DialogContent>
                                        <TextField value={myTitle} onChange={(e) => setTitle(e.target.value)}
                                            autoFocus
                                            margin="dense"
                                            id="name"
                                            label="Заголовок"
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

                                        <p>
                                            <Input accept="image/*" id="contained-button-file" multiple type="file" onChange={handleChange} />
                                        </p>

                                    </DialogContent>
                                    <DialogActions>
                                        <Button onClick={handleClose}>Отмена</Button>
                                        <Button onClick={handlePublish}>Опубликовать</Button>
                                    </DialogActions>
                                </Dialog>
                                <Button style={{ marginLeft: "45%" }} onClick={handleClickOpenProduct} variant="contained">Выставить товар</Button>
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
                            </ListItem>
                            <Typography variant="h6" gutterBottom component="div">

                                {feed}
                            </Typography>
                        </List>

                    </Box>
                </Box>


            </div>
            <Footer />
        </>

    );

}

export default NewsPage;