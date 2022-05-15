import { Box, List, ListItem, Typography } from '@mui/material';
import React, { Component, useState, useEffect } from 'react';

const Post = (props) => {


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

export default Post;