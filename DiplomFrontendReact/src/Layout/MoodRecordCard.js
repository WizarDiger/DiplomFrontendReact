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

    const [positiveReactions, setPositiveReactions] = useState("");
    const [negativeReactions, setNegativeReactions] = useState("");
    const [allAge, setAllAge] = useState(0);
    const [amountOfRecords, setAmountOfRecords] = useState(0);
    const [openMoodRecord, setOpenMoodRecord] = React.useState(false);
    const [usersBelowTwenty, setUsersBelowTwenty] = useState(0);
    const [usersFromTwentyToThrity, setUsersFromTwentyToThirty] = useState(0);
    const [usersFromThirtyToForty, setUsersFromThirtyToForty] = useState(0);
    const [usersFromFortyToFifty, setUsersFromFortyToFifty] = useState(0);
    const [usersFromFiftyToSixty, setUsersFromFiftyToSixty] = useState(0);
    const [usersAboveSixty, setUsersAboveSixty] = useState(0);
    const [pieChartCities, setPieChartCities] = useState([]);
    var cityCounts = [];
   
    var filteredPositive = [];
    var filteredNegative = [];
    var filteredBelowTwenty = [];
    var filteredFromTwentyToThirty = [];
    var filteredFromThirtyToForty = [];
    var filteredFromFortyToFifty = [];
    var filteredFromFiftyToSixty = [];
    var filteredAboveSixty = [];
    var allCities = [];
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
    const getMoodRecords = () => {

        fetch('https://localhost:7049/api/MoodRecord', {
            method: 'POST',
            headers:
            {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    Keyword: moodRecord.keyword,
                    Age: moodRecord.age,
                    City: moodRecord.city,
                    Mood: moodRecord.mood
                }
            )
        })

            .then(res => res.json())
            .then((result) => {

                //alert(JSON.stringify(result));
                filteredPositive = result.filter((moodRecords) => {
                    return (
                        moodRecords.mood === "positive"
                    );
                }
                );
                filteredNegative = result.filter((moodRecords) => {
                    return (
                        moodRecords.mood === "negative"
                    );
                }
                );
                filteredBelowTwenty = result.filter((moodRecords) => {
                    return (
                        moodRecords.age < 20
                    );
                }
                );
                filteredFromTwentyToThirty = result.filter((moodRecords) => {
                    return (
                        moodRecords.age >= 20 && moodRecord.age < 30
                    );
                }
                );
                filteredFromThirtyToForty = result.filter((moodRecords) => {
                    return (
                        moodRecords.age >= 30 && moodRecord.age < 40
                    );
                }
                );
                filteredFromFortyToFifty = result.filter((moodRecords) => {
                    return (
                        moodRecords.age >= 40 && moodRecord.age < 50
                    );
                }
                );
                filteredFromFiftyToSixty = result.filter((moodRecords) => {
                    return (
                        moodRecords.age >= 50 && moodRecord.age < 60
                    );
                }
                );
                filteredAboveSixty = result.filter((moodRecords) => {
                    return (
                        moodRecords.age > 60
                    );
                }
                );
                setAmountOfRecords(0);
                setAmountOfRecords(result.length);
                setAllAge(0);
                let allAgeBuff = 0;
                result.forEach(record => { allAgeBuff = record.age + allAgeBuff; })
                setAllAge(allAgeBuff);
                setPositiveReactions(filteredPositive.length)
                setNegativeReactions(filteredNegative.length)
                setUsersBelowTwenty(filteredBelowTwenty.legnth)
                setUsersFromTwentyToThirty(filteredFromTwentyToThirty.length)
                setUsersFromThirtyToForty(filteredFromThirtyToForty.length)
                setUsersFromFortyToFifty(filteredFromFortyToFifty.length)
                setUsersFromFiftyToSixty(filteredFromFiftyToSixty.length)
                setUsersAboveSixty(filteredAboveSixty.legnth);

                result.forEach(record => { allCities.push(record.city) })
                allCities.forEach(function (x) { cityCounts[x] = (cityCounts[x] || 0) + 1; });
                let uniqueCities = [... new Set(allCities)];
                var pieChartCitiesBuff = [];                         
                uniqueCities.forEach(city => (pieChartCitiesBuff.push({ value: cityCounts[city], label: city })))
               
                setPieChartCities(pieChartCitiesBuff);
               
                //console.log(filteredBelowTwenty);
                //console.log(filteredPositive.length);
            },
                (error) => {
                    alert(error);
                })

    };

    let url = window.location.href;
    

    useEffect(() => {
        //alert(JSON.stringify(moodRecord));
        getMoodRecords();
    
    }, [refreshcounter]);



    const handleClickOpenMoodRecord = () => {
        setOpenMoodRecord(true);
    };

    const handleCloseMoodRecord = () => {
        setOpenMoodRecord(false);
    };

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
                            {positiveReactions}
                        </Box>
                        </Grid>
                        <Grid item xs={4}>
                        <Box  display={'inline-block'}  color={'red'}>
                            {negativeReactions}
                        </Box>
                        </Grid>

                    </Grid>

                </Typography>
            </Button>
            <Dialog open={openMoodRecord} onClose={handleCloseMoodRecord} fullWidth maxWidth="md">
                <DialogTitle variant="h4">Ключевое слово - {moodRecord.keyword} </DialogTitle>
                <DialogContent>
                    <Typography
                        autoFocus
                        margin="dense"                      
                        variant="h5"
                    >
                        Позитивные реакции: {positiveReactions}
                    </Typography>
                    <Typography
                        autoFocus
                        margin="dense"                      
                        variant="h5"
                    >
                        Негативные реакции: {negativeReactions}
                    </Typography>
                    <PieChart
                        series={[
                            {
                                data: [
                                    { id: 0, value: positiveReactions, label: 'Позитивные реакции' },
                                    { id: 1, value: negativeReactions, label: 'Негативные реакции' },

                                ],
                            },
                        ]}
                        width={700}
                        height={350}
                    />
                    <Typography autoFocus margin="dense" variant="h5" >
                        Средний возраст пользователя: {allAge/amountOfRecords}
                    </Typography>

                    <PieChart
                        series={[
                            {
                                data: [
                                    { id: 0, value: usersBelowTwenty, label: 'До 20 лет' },
                                    { id: 1, value: usersFromTwentyToThrity, label: 'От 20 до 30 лет' },
                                    { id: 2, value: usersFromThirtyToForty, label: 'От 30 до 40 лет' },
                                    { id: 3, value: usersFromFortyToFifty, label: 'От 40 до 50 лет' },
                                    { id: 4, value: usersFromFiftyToSixty, label: 'От 50 до 60 лет' },
                                    { id: 5, value: usersAboveSixty, label: 'От 60 лет' },

                                ],
                            },
                        ]}
                        width={700}
                        height={350}
                    />

                    <Typography autoFocus margin="dense" id="name" label="Название" variant="h5" >
                        Города пользователей
                    </Typography>

                    <PieChart 
                        series={[
                            {
                                data: pieChartCities
                                   
                                     
                               
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