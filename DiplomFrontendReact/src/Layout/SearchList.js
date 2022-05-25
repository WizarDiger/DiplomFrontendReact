import React, { Component, useState, useEffect, useRef } from 'react';
import Card from './Card';
import { Box, Grid } from '@mui/material';
import { Paper } from '@mui/material';
import ProductPreview from './ProductPreview';
import { Button } from 'react-chat-engine';
function SearchList({ filteredPersons }) {
  const [myData, setData] = useState("");
  const getUserData = async () => {
    fetch('https://localhost:7049/api/Login', {
      method: 'GET',
      credentials: 'include',
    })
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      });

  }
  let url = window.location.href;
  useEffect(() => {

    getUserData();

  }, []);

  if (String(url) === "https://localhost:3000/ProductsPage/MyProducts" ) 
  {
    const filtered = filteredPersons.map(product => <ProductPreview key={product.id} product={product} currentUserId={myData.Id} />);
  
    return (
      <div>
       
        <Grid width={"100%"} marginRight={"2px"} container component={Paper} >

          {filtered}
        </Grid>
      </div>
    );
  }

  if (String(url) === "https://localhost:3000/ProductsPage/AllProducts" ) {
    const filtered = filteredPersons.map(product => <ProductPreview key={product.id} product={product} currentUserId={myData.Id} />);
  
    return (
      <div>
       
        <Grid width={"100%"} marginRight={"2px"} container component={Paper} >

          {filtered}
        </Grid>
      </div>
    );
  }

  else {
    
    const filtered = filteredPersons.map(person => <Card key={person.id} person={person} currentUserId={myData.Id} />);
    return (
      <div>
        <Grid width={"100%"} marginRight={"2px"} container component={Paper} >

          {filtered}
        </Grid>
      </div>
    );
  }
}

export default SearchList;