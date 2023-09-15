import { Box, Button, List, ListItem, Typography } from '@mui/material';
import React, { Component, useState, useEffect, useReducer } from 'react';
import { Link } from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';
const Post = (props) => {


    const [myData, setData] = useState("");

    const [isUserAdmin, setIsAdmin] = useState(false);
    const [isUserModerator, setIsModerator] = useState(false);
    const [myStaff, setStaff] = useState([]);
    const [myLikes, setLikes] = useState(props.likecounter);
    const [myAllLikes, setAllLikes] = useState([]);
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
    const getStaff = async () => {
        fetch('https://localhost:7049/api/Moderator', {
            method: 'GET',
            credentials: 'include',
        })
            .then((response) => response.json())
            .then((data) => {
                setStaff(data)
            })

    }

    const getLikes = async () => {
        fetch('https://localhost:7049/api/Like', {
            method: 'GET',
            credentials: 'include',
        })
            .then((response) => response.json())
            .then((data) => {
                setAllLikes(data)
            })

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
        setRefresh();
        window.location.reload();
    }



    const didThisUserLike = myAllLikes.filter(

        like => {

            return (
                like
                    .likesender
                    .includes(myData.Id) &&
                like
                    .postid
                    .includes(props.id)
            );
        }
    );


    const handleLike = async () => {
        if (didThisUserLike[0] === undefined) {
            fetch('https://localhost:7049/api/Feed', {
                method: 'PUT',
                headers:
                {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                    {
                        FeedId: props.id,
                        SenderId: 1,
                        Title: 1,
                        SenderName: 1,
                        SendTime: 1,
                        Description: 1,
                        ImageName: 1,
                        LikeCounter: (props.likecounter + 1)

                    }
                )
            })

                .then(res => res.json())
                .then((result) => {
                    console.log(result);
                    setRefresh();

                },
                    (error) => {
                        alert(error);
                    })

            fetch('https://localhost:7049/api/Like', {
                method: 'POST',
                headers:
                {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                    {
                        PostId: props.id,
                        LikeSender: myData.Id
                    }
                )
            })

                .then(res => res.json())
                .then((result) => {
                    console.log(result);
                    setRefresh();

                },
                    (error) => {
                        alert(error);
                    })

            setLikes(myLikes + 1)
        }
        else {
            fetch('https://localhost:7049/api/Feed', {
                method: 'PUT',
                headers:
                {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                    {
                        FeedId: props.id,
                        SenderId: 1,
                        Title: 1,
                        SenderName: props.sendtime,
                        SendTime: 1,
                        Description: 1,
                        ImageName: 1,
                        LikeCounter: (props.likecounter - 1)

                    }
                )
            })

                .then(res => res.json())
                .then((result) => {
                    console.log(result);
                    setRefresh();

                },
                    (error) => {
                        alert(error);
                    })

            fetch(`https://localhost:7049/api/Like/${didThisUserLike[0].postid}`, {

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
            setLikes(myLikes - 1)
        }
        setRefresh();


    };

    const defineRoles = async () => {
        for (var i = 0; i < myStaff.length; i++) {

            if (myStaff[i].UserId == myData.Id && myStaff[i].RoleId == "372292a0-6835-482e-9c80-f945af6bdcfd") {
                setIsModerator(true);
            }
            if (myStaff[i].UserId == myData.Id && myStaff[i].RoleId == "ac8ecd46-fc40-47f6-9473-27aa9adee354") {
                setIsAdmin(true);
            }
        }

    }
    useEffect(() => {

        getUserData();
        getStaff();
        defineRoles();
        getLikes();
        if (myStaff.length === 0 || myData.Id === undefined) {
            setRefresh();
        }
    }, [myLikes, refreshcounter]);
  
    if (myData.Id === props.sender || isUserAdmin || isUserModerator) {
        return (
            <Box marginLeft={'3px'} marginRight={'3px'} marginBottom={'10px'} bgcolor={'whitesmoke'} borderRadius={4}>
                <List>
                    <ListItem >
                        <Typography variant="h5" gutterBottom component="div">
                            <Box width={'100%'}>
                                {props.title}

                            </Box>
                        </Typography>
                        <Box width={'200px'} paddingLeft={'30px'}>
                            <Button onClick={handleDelete}>
                                Удалить пост
                            </Button>
                        </Box>
                    </ListItem>
                    <ListItem>
                        <Typography variant="body1" gutterBottom component="div">
                            Опубликовано  <Link to={'/OtherUserPage/' + props.sender} style={{ textDecoration: 'none', color: 'Highlight' }}> {props.sendername}</Link> в {props.sendtime.substring(0, 16)}
                        </Typography>
                    </ListItem>
                    <ListItem >
                        <Box marginLeft={'10%'}>


                            <img src={`data:image/jpeg;base64,${props.imagename}`} width={"90%"} height={"5000%"} />
                        </Box>
                    </ListItem>
                    <ListItem>

                        {props.description}

                    </ListItem>
                    <ListItem>
                        <Button onClick={(e) => { handleLike() }}>
                            <FavoriteIcon /> {myLikes}
                        </Button>

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
                            Опубликовано  <Link to={'/OtherUserPage/' + props.sender} style={{ textDecoration: 'none', color: 'Highlight' }}> {props.sendername}</Link> в {props.sendtime.substring(0, 16)}
                        </Typography>
                    </ListItem>
                    <ListItem >
                        <Box marginLeft={'10%'}>


                            <img src={`data:image/jpeg;base64,${props.imagename}`} width={'90%'} height={'5000%'} />
                        </Box>
                    </ListItem>
                    <ListItem>

                        <p>
                            {props.description}
                        </p>
                    </ListItem>
                    <ListItem>
                        <Button onClick={(e) => { handleLike() }}>
                            <FavoriteIcon /> {myLikes}
                        </Button>
                    </ListItem>
                </List>
            </Box>
        )
    }

}

export default Post;