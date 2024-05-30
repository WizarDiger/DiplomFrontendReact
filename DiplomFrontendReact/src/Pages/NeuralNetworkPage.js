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
const NeuralNetworkPage = () => {

    const [myMoodRecords, setMoodRecords] = useState([]);
    const [myTestPython, setTestPython] = useState([]);

    let navigate = useNavigate();
    const getMoodRecords = async () => {
        fetch('https://localhost:7049/api/NeuralNetwork', {
            method: 'GET',
            credentials: 'include',

        })
            .then((response) => response.json())
            .then((data) => {
                setMoodRecords(data)
                postTestPython()
            });

    }
    const getTestPython = async () => {
        
        fetch("http://127.0.0.1:8000/api/getmood/", {
            method: 'GET',
            credentials: 'include',             
        })

            .then((response) => response.json())
            .then((data) => {          
                console.log(data)
                setTestPython(data)
            
            },
                (error) => {
                    alert(error);
            })


    }
    const postTestPython = async () => {

        fetch('http://127.0.0.1:8000/api/getmood/', {

            method: 'POST',
            credentials: 'omit',

            headers:
            {
                'Access-Control-Allow-Origin': 'https://localhost:3000/',
                'Access-Control-Allow-Headers' :true,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    phrase: 'TESTPHRASE'
                }
            )
        })

            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                setTestPython(data)

            },
                (error) => {
                    alert(error);
                })


    }
    useEffect(() => {
      
        getMoodRecords();
        getTestPython()
       
        var cookie = getCookie('jwt');
        if (String(cookie) === "null") {
            navigate('/LoginPage'
            )
        }
    }, [""]);
    

    return (
        <>
            <Header />
            <div style={{ marginLeft: 'auto', marginRight: 'auto', width: '100%', display: 'flex', backgroundColor: 'whitesmoke' }}>
                <LeftMenu />              
                <div style={{ width: '60%' }}>
                    <Search details={myMoodRecords} />
                </div>
            </div>
            <Footer />
        </>
    );
};


export default NeuralNetworkPage;