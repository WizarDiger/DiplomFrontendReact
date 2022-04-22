import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import KeyIcon from '@mui/icons-material/Key';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Button from '@mui/material/Button';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


function LoginPage() {
 
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
        <Box sx={{ mr: -4, my:3,fontSize: 35 }}>
          Авторизация
        </Box>
        <Box>

          <AccountCircle sx={{ mr: 1, my: 3 }} />
          <TextField sx={{ my: 1 }}
            id="outlined-password-input"
            label="Логин"

          />
        </Box>
        <Box>

          <KeyIcon sx={{ mr: 1, my: 3 }} />
          <TextField sx={{ my: 1 }}
            id="outlined-password-input"
            label="Пароль"
            type="password"
          />
        </Box>
        <Button sx={{ mr:-4,my: 2, fontSize: 20, width: 100 }} variant="contained">Войти</Button>
        
        <Link to={'/RegisterPage'}  style={{ textDecoration: 'none' }}>
        <Button sx={{ mr:-4,my: 2, fontSize: 20, width: 270 }} variant="contained">Зарегистрироваться</Button>
        </Link>
        

      </Box >
    </div>


  );
}
export default LoginPage;