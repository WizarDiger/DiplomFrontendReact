import React from 'react';
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

function RegisterPage() {
    const [value, setValue] = React.useState(null);
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

                <Box>

                    <KeyIcon sx={{ mr: 1, my: 3 }} />
                    <TextField sx={{ my: 1 }}
                        id="outlined-password-input"
                        label="Повторите пароль"
                        type="password"
                    />
                </Box>
                <Box>

                    <EmailIcon sx={{ mr: 1, my: 3 }} />
                    <TextField sx={{ my: 1 }}
                        id="outlined-password-input"
                        label="Почта"

                    />
                </Box>

                <Box>

                    <BadgeIcon sx={{ mr: 1, my: 3 }} />
                    <TextField sx={{ my: 1 }}
                        id="outlined-password-input"
                        label="Имя"

                    />
                </Box>
                <Box>

                    <BadgeIcon sx={{ mr: 1, my: 3 }} />
                    <TextField sx={{ my: 1 }}
                        id="outlined-password-input"
                        label="Фамилия"

                    />
                </Box>
                <Box>

                    <BadgeIcon sx={{ mr: 1, my: 3 }} />
                    <TextField sx={{ my: 1 }}
                        id="outlined-password-input"
                        label="Отчество (при наличии)"

                    />
                </Box>
                <Box>
                    <CakeIcon sx={{ mr: 1, my: 3 }} />
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            label="Дата рождения"
                            value={value}
                            onChange={(newValue) => {
                                setValue(newValue);
                            }}
                            renderInput={(params) => <TextField sx={{ my: 1, width:225}} {...params} />}
                        />
                    </LocalizationProvider>


                </Box>
                <Box>

                    <LocationCityIcon sx={{ mr: 1, my: 3 }} />
                    <TextField sx={{ my: 1 }}
                        id="outlined-password-input"
                        label="Город"
                        type="password"
                    />
                </Box>
                <Button sx={{ mr: -4, my: 2, fontSize: 20, width: 270 }} variant="contained">Зарегистрироваться</Button>

            </Box >
        </div>


    );
}

export default RegisterPage;