import React, { Component, useState, useEffect, useRef, useReducer } from 'react';
import { useNavigate } from 'react-router-dom';

import dstu from './dstu.jpg'
import { Box, fontSize, textAlign } from '@mui/system';
import { List, ListItem } from '@mui/material';
import { Typography } from '@mui/material';
import { Avatar } from '@mui/material';
import { Button } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { Link } from 'react-router-dom';
import { createTheme } from '@mui/material/styles';
import { BrowserRouter } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function ProductPreview({ product, currentUserId }) {

  const [refreshcounter, setRefresh] = useReducer(x => x + 1, 0);
  const [open, setOpen] = React.useState(false);
  const [FriendList, setFriend] = useState("");
  const [isFriend, setCheckFriend] = useState(0);

  const theme = createTheme({
    status: {
      danger: '#e53e3e',
    },
    palette: {
      primary: {
        main: '#0971f1',
        darker: '#053e85',
      },
      neutral: {
        main: '#64748B',
        contrastText: '#fff',
      },
    },
  });
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  let check = 0;
  let url = window.location.href;

  const getFriends = async () => {
    fetch('https://localhost:7049/api/Products', {
      method: 'GET',
      credentials: 'include',
    })
      .then((response) => response.json())
      .then((data) => {
        setFriend(data)
      })

  }

  useEffect(() => {

    getFriends();
  }, [refreshcounter]);





  return (
    <Box display={'inline-block'} width={'30%'}>

      <List>
        <ListItem>

          <Box marginLeft={'10%'} width='100%'>
            <List>
              <ListItem>
                <Button style={{ width: '100%', justifyContent: "flex-start", textTransform: 'none', fontSize: '25px' }} variant="theme" onClick={handleClickOpen} >{product.title}</Button>
                <Dialog maxWidth={'70%'} open={open} onClose={handleClose}>
                  <DialogTitle> <b>{product.title}</b></DialogTitle>
                  <DialogContent>
                    <Box>
                      <List>
                        <ListItem>
                          <img src={dstu} width={'400px'} height={'400px'}>

                          </img>
                          <List>
                            <ListItem>
                              <Typography variant="h4" gutterBottom component="div">

                                {product.title}
                              </Typography>

                            </ListItem>
                            <ListItem>
                              {product.description}
                            </ListItem>
                            <ListItem>
                              <Typography variant="h6" gutterBottom component="div">
                                Количество: {product.amount} 
                              </Typography>
                            </ListItem>
                            <ListItem>
                              <Typography variant="h4" gutterBottom component="div">
                                Цена: {product.price} ₽
                              </Typography>
                            </ListItem>
                            <ListItem>
                               <Link to={'/ChatPage/'+product.senderid} style={{ textDecoration: 'none', color: 'inherit' }}>
                                <Button variant='contained'>
                                  Связаться с продавцом
                                </Button>
                              </Link>
                            </ListItem>
                          </List>
                        </ListItem>
                      </List>
                    </Box>

                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose}>Отмена</Button>

                  </DialogActions>
                </Dialog>

              </ListItem>
              <ListItem>

                <img src={dstu} style={{ marginLeft: '10%', width: '200px', height: 200 }} />
              </ListItem>
              <ListItem>
                <b>
                  Цена: {product.price}
                </b>
              </ListItem>
              <ListItem>
                <Button variant='contained'>
                  Связаться с продавцом
                </Button>
              </ListItem>
            </List>
          </Box>
        </ListItem>
      </List>


    </Box >
  );



}

export default ProductPreview;