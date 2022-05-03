

import React, { Component, useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import { useNavigate } from 'react-router-dom';
import { wait } from '@testing-library/user-event/dist/utils';
import LeftMenu from './LeftMenu';
import Typography from '@mui/material/Typography';
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

function MainPage(props) {


  const [myData, setData] = useState("");
  let check = 0;
  const getUserData = async () => {
    fetch('https://localhost:7049/api/Login', {
      method: 'GET',
      credentials: 'include',
    })
      .then((response) => response.json())
      .then((data) => { setData(data) });
    check = 11;
  }
  useEffect(() => {

    getUserData();


    if (check === 11) {
      checkLogin();
    }
    else {
      alert("ABOBA")
    }


  }, [""]);


  let navigate = useNavigate();
  const checkLogin = async () => {
    var myCookie = getCookie("jwt");

    if (myCookie === null) {

    }
    else {
      alert("ABOBUS");
    }
  }

  const componentDidMount = async () => {

  }

  return (
    <div style={{ verticalAlign: 'top', width: '70%', marginTop: "%", textAlign: 'center', display: 'inline-block' }}>
      <Box width={'40%'} display={'inline-block'}>
        {myData.Surname}
      </Box>
      <Box width={'60%'} display={'inline-block'}>
        <li>
          {myData.Name}

        </li>
      </Box>


    </div>


  );

}

export default MainPage;