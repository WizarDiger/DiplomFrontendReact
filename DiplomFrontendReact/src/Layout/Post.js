import { Box, Button, List, ListItem, Typography } from '@mui/material';
import React, { Component, useState, useEffect } from 'react';

const Post = (props) => {


    const [myData, setData] = useState("");
    const [isAdmin, setIsAdmin] = useState(false);
    const [isModerator, setIsModerator] = useState(false);

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

    if (myData.Login !== undefined) {

        const isAdmin = async () => {

            fetch('https://localhost:7049/api/Roles', {

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
                        login: 1,
                        password: 1,
                        email: '1',
                        name: 1,
                        surname: '1',
                        patronymic: '1',
                        dateOfBirth: '1',
                        city: '1',
                        UserName: myData.Login
                    }
                )
            })

                .then(res => res.json())
                .then((result) => {
                    setIsAdmin(result);
                },
                    (error) => {
                        alert('Failed');
                    })
        }
        isAdmin();

        const isModerator = async () => {

            fetch('https://localhost:7049/api/Moderator', {

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
                        login: 1,
                        password: 1,
                        email: '1',
                        name: 1,
                        surname: '1',
                        patronymic: '1',
                        dateOfBirth: '1',
                        city: '1',
                        UserName: myData.Login
                    }
                )
            })

                .then(res => res.json())
                .then((result) => {
                    setIsModerator(result);
                },
                    (error) => {
                        alert('Failed');
                    })
        }
        isModerator();
    }
    const handleDelete = async () => {

        fetch(`https://localhost:7049/api/Feed/${props.id}`, {

            method: 'DELETE',
            credentials: 'include',

            headers:
            {
                'Access-Control-Allow-Origin': 'https://localhost:3000/',
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(

            )
        })

            .then(res => res.json())
            .then((result) => {
                console.log(result);
                
            },
                (error) => {
                    console.log(error)
                })
                window.location.reload();
    }
    useEffect(() => {
        
        getUserData();

    }, [""]);


    if (myData.Id === props.sender || isModerator || isAdmin) {
        return (
            <Box marginLeft={'3px'} marginRight={'3px'} marginBottom={'10px'} bgcolor={'whitesmoke'} borderRadius={4}>
                <List>
                    <ListItem >
                        <Typography variant="h5" gutterBottom component="div">
                            <Box width={'120%'}>
                                {props.title}

                            </Box>
                        </Typography>
                        <Box paddingLeft={'30px'}>
                            <Button onClick={handleDelete}>
                                Удалить пост
                            </Button>
                        </Box>
                    </ListItem>
                    <ListItem>
                        <Typography variant="body1" gutterBottom component="div">
                            Опубликовано {props.sendername} в {props.sendtime.substring(0, 16)}
                        </Typography>
                    </ListItem>
                    <ListItem >
                        <Box marginLeft={'10%'}>


                            <img src={props.imagename} width="300px" height={'200px'} />
                        </Box>
                    </ListItem>
                    <ListItem>

                        <p>
                            {props.description}
                        </p>
                    </ListItem>
                </List>
            </Box>
        )
    }
    else {
        return (
            <Box marginLeft={'3px'} marginRight={'3px'} marginBottom={'10px'} bgcolor={'whitesmoke'} borderRadius={4}>
                <List>
                    <ListItem>
                        <Typography variant="h5" gutterBottom component="div">
                            <Box>
                                {props.title}
                            </Box>
                        </Typography>

                    </ListItem>
                    <ListItem>
                        <Typography variant="body1" gutterBottom component="div">
                            Опубликовано {props.sendername} в {props.sendtime.substring(0, 16)}
                        </Typography>
                    </ListItem>
                    <ListItem >
                        <Box marginLeft={'10%'}>


                            <img src={props.imagename} width="300px" height={'200px'} />
                        </Box>
                    </ListItem>
                    <ListItem>

                        <p>
                            {props.description}
                        </p>
                    </ListItem>
                </List>
            </Box>
        )
    }

}

export default Post;