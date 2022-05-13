import React, { useState, useEffect, useRef } from 'react';
import { HubConnectionBuilder } from '@microsoft/signalr';


import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { useNavigate } from 'react-router-dom';
import { Paper } from '@mui/material';
import { Grid } from '@mui/material';
import TextField from '@mui/material/TextField';
import ChatInput from '../Layout/ChatInput';
import LeftMenu from '../Layout/LeftMenu';
import Footer from '../Layout/Footer';
import Header from '../Layout/Header';
import Search from '../Layout/Search';
function getCookie(name) {
    var dc = document.cookie;
    var prefix = name + "=";
    var begin = dc.indexOf("; " + prefix);
    if (begin == -1) {
        begin = dc.indexOf(prefix);
        if (begin != 0) return null;
    }
    else {
        begin += 2;
        var end = document.cookie.indexOf(";", begin);
        if (end == -1) {
            end = dc.length;
        }
    }
    return decodeURI(dc.substring(begin + prefix.length, end));
}
const FriendsPage = () => {

    const [user, setUser] = useState('');


    const [myData, setData] = useState("");


    const [myUsers, setUsers] = useState([]);
    const [myFriends, setFriends] = useState([]);

    const getAllUsers = async () => {
        fetch('https://localhost:7049/api/Search', {
            method: 'GET',
            credentials: 'include',
        })
            .then((response) => response.json())
            .then((data) => {
                setUsers(data)
            })

    }

    const getFriends = async () => {
        fetch('https://localhost:7049/api/ChatSearch', {
            method: 'GET',
            credentials: 'include',
        })
            .then((response) => response.json())
            .then((data) => {
                setFriends(data)
            })

    }

    const filteredFriends = myFriends.filter(

        person => {

            return (
                person
                    .host
                    .includes(myData.Id)

            );
        }
    );
    let friendsData = [];
    for (var i = 0; i < filteredFriends.length; i++) {

        let buffArray = myUsers.filter(
            user => {
                return (

                    user.Id.includes(filteredFriends[i].friend)
                )
            }
        )

        friendsData.push(buffArray[0]);
    }


 



    function getCookie(name) {
        var dc = document.cookie;
        var prefix = name + "=";
        var begin = dc.indexOf("; " + prefix);
        if (begin == -1) {
            begin = dc.indexOf(prefix);
            if (begin != 0) return null;
        }
        else {
            begin += 2;
            var end = document.cookie.indexOf(";", begin);
            if (end == -1) {
                end = dc.length;
            }
        }
        return decodeURI(dc.substring(begin + prefix.length, end));
    }
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
    let navigate = useNavigate();
    useEffect(() => {

        getUserData();
        var cookie = getCookie('jwt');
        if (String(cookie) === "null") {
            navigate('/LoginPage'
            )
        }
        getFriends();
        getAllUsers();
    }, []);

    return (
        <>
            <Header />
            <div style={{ marginLeft: 'auto', marginRight: 'auto', width: '100%', display: 'flex', backgroundColor: 'whitesmoke' }}>
                <LeftMenu />
                <div style={{ width: '30%' }}>
                    <Search details={friendsData} />
                </div>
            </div>
            <Footer />
        </>
    );
};


export default FriendsPage;