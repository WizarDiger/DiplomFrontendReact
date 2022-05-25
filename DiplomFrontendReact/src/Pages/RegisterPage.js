import React, { Component, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import KeyIcon from '@mui/icons-material/Key';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Button from '@mui/material/Button';
import EmailIcon from '@mui/icons-material/Email';
import BadgeIcon from '@mui/icons-material/Badge';
import CakeIcon from '@mui/icons-material/Cake';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Alert } from '@mui/material';
import ruLocale from 'date-fns/locale/ru';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Navigate
} from "react-router-dom";

import { useNavigate } from 'react-router-dom';

function RegisterPage(props) {

    const [myLogin, setLogin] = useState('')
    const [myPassword, setPassword] = useState('')
    const [myEmail, setEmail] = useState('')
    const [myName, setName] = useState('')
    const [mySurname, setSurname] = useState('')
    const [myPatronymic, setPatronymic] = useState('')
    const [myDateOfBirth, setDateOfBirth] = useState('')
    const [myCity, setCity] = useState('')

    const [value, setValue] = React.useState(null);
    let navigate = useNavigate();

    const handleSubmit = async () => {


        fetch('https://localhost:7049/api/Login', {
            method: 'POST',
            headers:
            {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    Login: myLogin,
                    Password: myPassword,
                    Email: myEmail,
                    Name: myName,
                    Surname: mySurname,
                    Patronymic: myPatronymic,
                    DateOfBirth: myDateOfBirth,
                    City: myCity,
                    UserName: myLogin
                }
            )
        })

            .then(res => res.json())
            .then((result) => {
                if (JSON.stringify(result) === '1') {
                    
                    navigate('/LoginPage')
                }
                else
                {

                    alert(result)  
                }
            },
                (error) => {
                    
                    alert(error);
                })
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
                    Регистрация
                </Box>
                <Box>

                    <AccountCircle sx={{ mr: 1, my: 3 }} />
                    <TextField value={myLogin} onChange={(e) => setLogin(e.target.value)} sx={{ my: 1 }}
                        id="outlined-password-input"
                        label="Логин"

                    />
                </Box>
                <Box>

                    <KeyIcon sx={{ mr: 1, my: 3 }} />
                    <TextField value={myPassword} onChange={(e) => setPassword(e.target.value)} sx={{ my: 1 }}
                        id="outlined-password-input"
                        label="Пароль"
                        type="password"
                    />
                </Box>

                <Box>

                    <KeyIcon sx={{ mr: 1, my: 3 }} />
                    <TextField required sx={{ my: 1 }}
                        id="outlined-password-input"
                        label="Повторите пароль"
                        type="password"
                    />
                </Box>
                <Box>

                    <EmailIcon sx={{ mr: 1, my: 3 }} />
                    <TextField required value={myEmail} onChange={(e) => setEmail(e.target.value)} sx={{ my: 1 }}
                        id="outlined-password-input"
                        label="Почта"

                    />
                </Box>

                <Box>

                    <BadgeIcon sx={{ mr: 1, my: 3 }} />
                    <TextField required value={myName} onChange={(e) => setName(e.target.value)} sx={{ my: 1 }}
                        id="outlined-password-input"
                        label="Имя"

                    />
                </Box>
                <Box>

                    <BadgeIcon sx={{ mr: 1, my: 3 }} />
                    <TextField required value={mySurname} onChange={(e) => setSurname(e.target.value)} sx={{ my: 1 }}
                        id="outlined-password-input"
                        label="Фамилия"

                    />
                </Box>
                <Box>

                    <BadgeIcon sx={{ mr: 1, my: 3 }} />
                    <TextField value={myPatronymic} onChange={(e) => setPatronymic(e.target.value)} sx={{ my: 1 }}
                        id="outlined-password-input"
                        label="Отчество (при наличии)"

                    />
                </Box>

                <Box>


                    <CakeIcon sx={{ mr: 1, my: 3 }} />
                    <LocalizationProvider dateAdapter={AdapterDateFns} locale={ruLocale}>
                        <DatePicker
                            label="Дата рождения"
                            value={myDateOfBirth}
                            onChange={(newValue) => {
                                setDateOfBirth(newValue);
                            }}
                            renderInput={(params) => <TextField sx={{ my: 1, width: 225 }} {...params} />}
                        />
                    </LocalizationProvider>



                </Box>
                <Box>

                    <LocationCityIcon sx={{ mr: 1, my: 3 }} />
                    <TextField required value={myCity} onChange={(e) => setCity(e.target.value)} sx={{ my: 1 }}
                        id="outlined-password-input"
                        label="Город"

                    />
                </Box>


                <Button type='submit' onClick={handleSubmit} sx={{ mr: -4, my: 2, fontSize: 20, width: 270 }} variant="contained">Зарегистрироваться</Button>



            </Box >
        </div>


    );

}

export default RegisterPage;