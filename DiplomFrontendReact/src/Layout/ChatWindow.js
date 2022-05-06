import React from 'react';
import Message from './Message';
import LeftMenu from './LeftMenu';


const ChatWindow = (props) => {
    const chat = props.chat
        .map(m => <Message 
            key={Date.now() * Math.random()}
            user={m.user}
            message={m.message}/>);

    return(
        <div style={{ verticalAlign: 'top', width: '100%', marginTop: "0%", textAlign: 'start', backgroundColor: 'whitesmoke' }}>
             
            {chat}
        </div>
    )
};

export default ChatWindow;