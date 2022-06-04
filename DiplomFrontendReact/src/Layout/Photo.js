import { Box, Button, List, ListItem, Typography } from '@mui/material';
import React, { Component, useState, useEffect, useReducer } from 'react';
import { Link } from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';
const Photo = (props) => {


    const [myData, setData] = useState("");
    const [isAdmin, setIsAdmin] = useState(false);
    const [isModerator, setIsModerator] = useState(false);
    const [refreshcounter, setRefresh] = useReducer(x => x + 1, 0);
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

    }, [refreshcounter]);
    let image;
    if (props.photo.imagepath !== undefined)
    {
        image = props.photo.imagepath;
    }
    else
    {
        image = props.photo.picture;
    }
    console.log (props);
  
    return (
        <Box marginLeft={'3px'} marginRight={'3px'} marginBottom={'10px'} bgcolor={'whitesmoke'} borderRadius={4}>
            <List>
               
                <ListItem>
                    <Typography variant="body1" gutterBottom component="div">
             
                    </Typography>
                </ListItem>
                <ListItem >
                    <Box >
                        <img src={`data:image/jpeg;base64,${image}`} width="300px" height={'200px'} />
                    </Box>
                </ListItem>
               
            </List>
        </Box>
    )
}



export default Photo;