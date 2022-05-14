import React, { Component, useState, useEffect } from 'react';

const Message = (props) => {
 
    if (props.currentUser === props.sendername || props.currentUser === props.user) {

        
        return (

            <div style={{ background: "#eee", borderRadius: '5px', padding: '0 10px' }}>
                <p><strong>{props.sendername}</strong><strong>{props.user}</strong> says:</p>
                <p>{props.message}</p>
            </div>
        )
    }
    if (props.currentUser !== props.sendername || props.currentUser !== props.user) {

        
        return (

            <div style={{ textAlign:'right', background: "#eee", borderRadius: '5px', padding: '0 10px' }}>
                <p><strong>{props.sendername}</strong> <strong>{props.user}</strong> says:</p>
                <p>{props.message}</p>
            </div>
        )
    }
    if (props.currentUser === props.user) {

        
        return (

            <div style={{ background: "#eee", borderRadius: '5px', padding: '0 10px' }}>
                <p><strong>{props.user}</strong> says:</p>
                <p>{props.message}</p>
            </div>
        )
    }
    else
    {
        return (

            <div style={{ textAlign:'right', background: "#eee", borderRadius: '5px', padding: '0 10px' }}>
                <p><strong>{props.user}</strong> says:</p>
                <p>{props.message}</p>
            </div>
        )
    }

}

export default Message;