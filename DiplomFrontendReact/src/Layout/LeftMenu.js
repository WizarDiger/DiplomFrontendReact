

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
import { BrowserRouter as Router, Link, Navigate } from "react-router-dom";
import FeedIcon from '@mui/icons-material/Feed';
import PeopleIcon from '@mui/icons-material/People';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';
function LeftMenu(props) {
  return (

    <div style={{ marginBottom: '30%', width: '35%', marginTop: "1.1%", textAlign: 'right', display: 'flex' }}>

      <Box borderRadius={3} sx={{ marginLeft: '55%', width: '100%', maxWidth: 360, bgcolor: 'background.paper', marginRight: '5%' }}>
        <nav aria-label="main mailbox folders">
          <List>
            <Link to={'/MainPage'} style={{ textDecoration: 'none', color: 'inherit' }}>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <InboxIcon />
                  </ListItemIcon>
                  <ListItemText primary="Моя страница" />
                </ListItemButton>
              </ListItem>
            </Link>
            <Link to={'/NewsPage'} style={{ textDecoration: 'none', color: 'inherit' }}>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <FeedIcon/>
                  </ListItemIcon>
                  <ListItemText primary="Новости" />
                </ListItemButton>
              </ListItem>
            </Link>
            <Link to={'/ChatPage/default'} style={{ textDecoration: 'none', color: 'inherit' }}>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <DraftsIcon />
                  </ListItemIcon>
                  <ListItemText primary="Сообщения" />
                </ListItemButton>

              </ListItem>
            </Link>
            <Link to={'/FriendsPage'} style={{ textDecoration: 'none', color: 'inherit' }}>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <PeopleIcon />
                  </ListItemIcon>
                  <ListItemText primary="Друзья" />
                </ListItemButton>
              </ListItem>
            </Link>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <PhotoCameraIcon />
                </ListItemIcon>
                <ListItemText primary="Фотографии" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <ShoppingCartIcon />
                </ListItemIcon>
                <ListItemText primary="Товары" />
              </ListItemButton>
            </ListItem>
            <Link to={'/FindPeoplePage'} style={{ textDecoration: 'none', color: 'inherit' }}>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <SearchIcon />
                  </ListItemIcon>
                  <ListItemText primary="Найти людей" />
                </ListItemButton>
              </ListItem>
            </Link>
          </List>
        </nav>
        <Divider />
       
      </Box>
    </div>
  )
}
export default LeftMenu;