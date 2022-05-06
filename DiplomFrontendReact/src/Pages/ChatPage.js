import {CharEgnine, ChatEngine} from 'react-chat-engine';
import './ChatPage.css';
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
const ChatPage = () =>{

    
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
    return(
        <ChatEngine
            height = "100vh"
            projectID="29672749-0cb6-4599-8aa8-3199e4b45a53"
            userName=""
            userSecret=""


        />
    )
}
export default ChatPage();