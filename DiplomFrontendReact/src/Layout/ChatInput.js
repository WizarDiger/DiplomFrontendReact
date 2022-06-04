import React, { Component, useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';



import { Paper } from '@mui/material';
import { Grid } from '@mui/material';

import { Divider } from '@mui/material';
import { TextField } from '@mui/material';
import { Typography } from '@mui/material';
import { List } from '@mui/material';
import { ListItem } from '@mui/material';
import { ListItemIcon } from '@mui/material';
import { ListItemText } from '@mui/material';
import { Avatar } from 'react-chat-engine';
import { Fab } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import Search from './Search';
import Message from './Message';



const ChatInput = (props) => {
    const [user, setUser] = useState('');


    const [myData, setData] = useState("");
    const [myMessage, setMessage] = useState("");




    const filteredFriends = props.friendList.filter(

        person => {

            return (
                person
                    .host
                    .includes(myData.Id)
            );
        }
    );
    let friendsData = [];
    for (var i = 0; i < filteredFriends.length; i++) {

        let buffArray = props.allUsers.filter(
            user => {
                return (

                    user.Id.includes(filteredFriends[i].friend)
                )
            }
        )

        friendsData.push(buffArray[0]);
    }

    
    const chat = props.chat
        .map(m => <Message
            key={Date.now() * Math.random()}
            user={m.user}
            sendername={m.sendername}
            message={m.message} currentUser={myData.Name} />);



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
    let navigate = useNavigate();
    useEffect(() => {

        getUserData();
        var cookie = getCookie('jwt');
        if (String(cookie) === "null") {
            navigate('/LoginPage'
            )
        }
    }, []);


    function onSubmit() {

        const isMessageProvided = myMessage && myMessage !== '';

        if (isMessageProvided) {
            props.sendMessage(myData.Name, myMessage);
        }
        else {
            alert('Please insert a message.');
        }
        setMessage('');

    }



    return (
        <div style={{ width: '100%', display: 'flex' }}>
           

              
                <div style={{width:'25%'}}>
                    <Search details={friendsData} />
                </div>
                 
         

            <div style={{ width: '40%', display: 'flex', backgroundColor: 'whitesmoke' }}>
                <Grid style={{ verticalAlign: 'end' }} container component={Paper} >

                    <Grid item xs={90}>
                        <Paper style={{height: 670, maxHeight: 670, overflow: 'auto' }}>

                            <List>
                                {chat}
                            </List>
                        </Paper>
                        <Divider />
                        <Grid container style={{ padding: '20px' }}>
                            <Grid width={'90%'}>
                                <TextField value={myMessage} onChange={(e) => setMessage(e.target.value)} id="outlined-basic-email" label="Сообщение" fullWidth />
                            </Grid>
                            <Grid marginLeft={'1%'} xs={1} align="right">
                                <Fab onClick={onSubmit} color="primary" aria-label="add"><SendIcon /></Fab>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        </div>
    )
};

export default ChatInput;