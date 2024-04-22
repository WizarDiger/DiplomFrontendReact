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

import { PieChart } from '@mui/x-charts/PieChart';
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


    return (
        <Box >
            <Button onClick={handleClickOpenMoodRecord} style={{ width: '500%', justifyContent: "flex-start", textTransform: 'none' }} variant="theme">
                <Typography width='100%' variant="h5" gutterBottom component="div">

                    <Box display={'inline-block'} marginRight={'25%'}>
                        {moodRecord.keyword}
                    </Box>
                    <Box display={'inline-block'} marginRight={'25%'} color={'green'}>
                        {moodRecord.positive}
                    </Box>
                    <Box display={'inline-block'} marginRight={'25%'} marginLeft={'0'} color={'red'}>
                        {moodRecord.negative}
                    </Box>


                </Typography>
            </Button>
            <Dialog open={openMoodRecord} onClose={handleCloseMoodRecord}>
                <DialogTitle variant="h4">Ключевое слово - {moodRecord.keyword}</DialogTitle>
                <DialogContent>
                    <Typography
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Название"
                        type="email"
                        
                        variant="h5"
                    >
                        Позитивные реакции: {moodRecord.positive }
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
                                    { id: 0, value: 10, label: 'series A' },
                                    { id: 1, value: 15, label: 'series B' },
                                    { id: 2, value: 20, label: 'series C' },
                                ],
                            },
                        ]}
                        width={400}
                        height={200}
                    />

                </DialogContent>

            </Dialog>

        </Box >
    );
}

export default MoodRecordCard;