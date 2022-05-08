import React, { useState, useEffect, useRef } from 'react';
import { HubConnectionBuilder } from '@microsoft/signalr';


import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

import { Paper } from '@mui/material';
import { Grid } from '@mui/material';
import TextField from '@mui/material/TextField';
import ChatInput from '../Layout/ChatInput';
import LeftMenu from '../Layout/LeftMenu';
import Footer from '../Layout/Footer';
import Header from '../Layout/Header';
const ChatPage = () => {
    const [chat, setChat] = useState([]);
    const latestChat = useRef(null);

    latestChat.current = chat;

    useEffect(() => {

    }, []);

    const sendMessage = async (user, message) => {
        const chatMessage = {
            user: user,
            message: message
        };

        try {
            await fetch('https://localhost:7049/api/Chat/messages', {
                method: 'POST',
                body: JSON.stringify(chatMessage),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }
        catch (e) {
            console.log('Sending message failed.', e);
        }
    }

    return (
        <>
            <Header />
            <div style={{ verticalAlign: 'top', width: '100%', marginTop: "0%", textAlign: 'start', display: 'flex', backgroundColor: 'whitesmoke' }}>

                <LeftMenu />
                <Grid marginTop={'1%'} width={'30%'} container component={Paper}>

                    <TextField id="outlined-search" label="Поиск" type="search" fullWidth />
                </Grid>


            </div>
            <Footer />
        </>
    );
};


export default ChatPage;