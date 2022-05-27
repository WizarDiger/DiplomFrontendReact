import React, { useState, useEffect, useRef } from 'react';
import { HubConnectionBuilder } from '@microsoft/signalr';


import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

import ChatInput from '../Layout/ChatInput';
import LeftMenu from '../Layout/LeftMenu';
import Footer from '../Layout/Footer';
import Header from '../Layout/Header';
import { useParams } from 'react-router';


const ChatPage = () => {
    const [chat, setChat] = useState([]);
    const latestChat = useRef(null);

    latestChat.current = chat;
    const [myUsers, setData] = useState([]);
    const [myFriends, setFriends] = useState([]);
    let currentChatFriendId = useParams().id;
    const [loadedChat, loadChat] = useState([]);
    const getAllUsers = async () => {
        fetch('https://localhost:7049/api/Search', {
            method: 'GET',
            credentials: 'include',
        })
            .then((response) => response.json())
            .then((data) => {
                setData(data)


            })

    }
    const [myCurrentUser, setCurrentUser] = useState("");
    const currentReciever = myUsers.filter(

        person => {
            return (
                person
                    .Id
                    .includes(currentChatFriendId)
            );

        }
    );


    const getUserData = async () => {
        fetch('https://localhost:7049/api/Login', {
            method: 'GET',
            credentials: 'include',
        })
            .then((response) => response.json())
            .then((data) => {
                setCurrentUser(data)
            });

    }

    const getChat = async () => {
        fetch('https://localhost:7049/api/ChatSaveToDB', {
            method: 'GET',
            credentials: 'include',
        })
            .then((response) => response.json())
            .then((data) => {
                loadChat(data)
            });

    }

    const savedChat = loadedChat.filter(

        chat => {
            return (
                chat
                    .sender
                    .includes(myCurrentUser.Id) &&
                chat
                    .reciever
                    .includes(currentChatFriendId) ||
                chat
                    .reciever
                    .includes(myCurrentUser.Id) &&
                chat
                    .sender
                    .includes(currentChatFriendId)
            );

        }
    );

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


    useEffect(() => {
        const connection = new HubConnectionBuilder()
            .withUrl('https://localhost:7049/hubs/chat')
            .withAutomaticReconnect()
            .build();

        connection.start()
            .then(result => {
                console.log('Connected!');

                connection.on('ReceiveMessage', message => {
                    const updatedChat = [...latestChat.current];
                    updatedChat.push(message);
                    console.log(updatedChat);
                    setChat(updatedChat);
                });
            })
            .catch(e => console.log('Connection failed: ', e));


        getUserData()
        getFriends();
        getAllUsers();
        getChat();

    }, []);

    useEffect(() => {
        setChat(savedChat);
    }, [currentChatFriendId])

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
            await fetch('https://localhost:7049/api/ChatSaveToDB', {
                method: 'POST',
                headers:
                {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                    {
                        Sender: myCurrentUser.Id,
                        Reciever: currentChatFriendId,
                        SenderName: myCurrentUser.Name,
                        RecieverName: currentReciever[0].Name,
                        Message: chatMessage.message

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
                <List style={{ width: '100%' }}>
                    <ListItem >

                        <ChatInput sendMessage={sendMessage} chat={chat} friendList={myFriends} allUsers={myUsers} />
                    </ListItem>

                </List>
            </div>
            <Footer />
        </>
    );
};


export default ChatPage;