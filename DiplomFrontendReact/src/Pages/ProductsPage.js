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
const ProductsPage = () => {

    const [myProducts, setProducts] = useState("");
    let navigate = useNavigate();
    const getUserData = async () => {
      fetch('https://localhost:7049/api/Products', {
        method: 'GET',
        credentials: 'include',
      })
        .then((response) => response.json())
        .then((data) => {
          setProducts(data)
       
        });
    
    }
    useEffect(() => {
       
      getUserData();     
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
                <div style={{width:'60%'}}>
                    <Search details={myProducts} />
                </div>
            </div>
            <Footer />
        </>
    );
};


export default ProductsPage;