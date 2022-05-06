import React, { Component, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import KeyIcon from '@mui/icons-material/Key';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Button from '@mui/material/Button';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Navigate
} from "react-router-dom";
import { Login } from '@mui/icons-material';
import RegisterPage from './RegisterPage';
import { useNavigate } from 'react-router-dom';
import Visibility from '@mui/icons-material/Visibility';

function LoginPage(props) {

  const [myLogin, setLogin] = useState('')
  const [myPassword, setPassword] = useState('')
  
  let errormessage = "";
  let navigate = useNavigate();

  const handleSubmit = async () => {
    
    fetch('https://localhost:7049/api/SignIn', {

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
          login: myLogin,
          password: myPassword,
          email: '1',
          name: myLogin,
          surname: '1',
          patronymic: '1',
          dateOfBirth: '1',
          city: '1',
          UserName: myLogin
        }
      )
    })

      .then(res => res.json())
      .then((result) => {
        if (JSON.stringify(result) === '1') {

          navigate('/MainPage')
        }
        else {
         
          errormessage = "Неправильный логин и/или пароль";
          alert(errormessage);
        }
      },
        (error) => {
          alert('Failed');
        })
  }

  const refreshList = async () => {
    fetch('https://localhost:7049/api/Login')
      .then(response => response.json())
      .then(data => {
        this.setState({ deps: data });
      });
  }
  const componentDidMount = async () => {
    this.refreshList();
  }

  const componentDidUpdate = async () => {
    this.refreshList();
  }


  return (

    <div style={{ width: '100%', marginTop: "10%", textAlign: 'center' }}>
      
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',


          bgcolor: 'background.paper',
          borderRadius: 1,
        }}
      >
        <Box sx={{ mr: -4, my: 3, fontSize: 35 }}>

          Авторизация

        </Box>
        <Box>

          <AccountCircle sx={{ mr: 1, my: 3 }} />
          <TextField  value={myLogin} onChange={(e) => setLogin(e.target.value)} sx={{ my: 1 }}
            id="loginfield"
            label="Логин"
            
          />
        </Box>
        <Box>

          <KeyIcon sx={{ mr: 1, my: 3 }} />
          <TextField  value={myPassword} onChange={(e) => setPassword(e.target.value)} sx={{ my: 1 }}
            id="passwordfield"
            label="Пароль"
            type="password"
            
          />
        </Box>
        <Button onClick={handleSubmit} sx={{ mr: -4, my: 2, fontSize: 20, width: 100 }} variant="contained">Войти</Button>

        <Link to={'/RegisterPage'} style={{ textDecoration: 'none' }}>
          <Button sx={{ mr: -4, my: 2, fontSize: 20, width: 270 }} variant="contained">Зарегистрироваться</Button>
        </Link>
        <div>

          <h1> {errormessage} </h1>

        </div>

      </Box >
    </div >


  );

}

export default LoginPage;