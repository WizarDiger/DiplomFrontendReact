import React, { Component, useState, useEffect, useRef, useReducer } from 'react';
import { useNavigate } from 'react-router-dom';

import dstu from './dstu.jpg'
import { Box, textAlign } from '@mui/system';
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
import placeholder from './placeholder.png'
import {  Dialog, DialogActions, DialogContent, DialogTitle, Grid, Input } from '@mui/material';
import { TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import { PieChart } from '@mui/x-charts/PieChart';
import Paper from '@mui/material/Paper';
const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function MoodRecordCard({ moodRecord, currentUserId }) {

    const [refreshcounter, setRefresh] = useReducer(x => x + 1, 0);
    const [open, setOpen] = React.useState(false);
    const [FriendList, setFriend] = useState("");
    const [isFriend, setCheckFriend] = useState(0);
    const [openMoodRecord, setOpenMoodRecord] = React.useState(false);
    const [myProfilePictures, setProfilePictures] = useState([]);

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
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };


    let url = window.location.href;


    useEffect(() => {

    }, [refreshcounter]);



    const handleClickOpenMoodRecord = () => {
        setOpenMoodRecord(true);
    };

    const handleCloseMoodRecord = () => {
        setOpenMoodRecord(false);
    };

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));

    return (
        <Box width={'200%'} display={'inline-block'}>

            <Button onClick={handleClickOpenMoodRecord} style={{ width: '100%', justifyContent: "flex-start", textTransform: 'none' }} variant="theme">
                <Typography width='100%' variant="h5" gutterBottom component="div">
                    <Grid container rowSpacing={1} columnSpacing={{ xs: 5, sm: 2, md: 3 }}>
                        <Grid item xs={4}>
                            
                                <Box display={'inline-block'}>
                                    {moodRecord.keyword}
                                </Box>
                           
                        </Grid>
                        <Grid item xs={4}>
                        <Box  display={'inline-block'}  color={'green'}>
                            {moodRecord.positive}
                        </Box>
                        </Grid>
                        <Grid item xs={4}>
                        <Box  display={'inline-block'}  color={'red'}>
                            {moodRecord.negative}
                        </Box>
                        </Grid>

                    </Grid>

                </Typography>
            </Button>
            <Dialog maxWidth='100%' open={openMoodRecord} onClose={handleCloseMoodRecord} >
                <DialogTitle variant="h4">Ключевое слово - {moodRecord.keyword} </DialogTitle>
                <DialogContent>
                    <Typography
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Название"
                        type="email"

                        variant="h5"
                    >
                        Позитивные реакции: {moodRecord.positive}
                    </Typography>
                    <Typography
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Название"
                        type="email"

                        variant="h5"
                    >
                        Негативные реакции: {moodRecord.negative}
                    </Typography>
                    <PieChart
                        series={[
                            {
                                data: [
                                    { id: 0, value: moodRecord.positive, label: 'Позитивные реакции' },
                                    { id: 1, value: moodRecord.negative, label: 'Негативные реакции' },

                                ],
                            },
                        ]}
                        width={700}
                        height={350}
                    />

                </DialogContent>

            </Dialog>

        </Box >
    );
}

export default MoodRecordCard;