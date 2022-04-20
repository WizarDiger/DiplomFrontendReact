import React from 'react';
import TodoList from './TodoList';
import Header from './Header';
import LoginPage from './LoginPage'
import { Box } from '@mui/system';
function App() {
    return (
        <>
       <Box
         sx={{
            width: 300,
            height: 80,   
          }}
       >
        <Header />
       </Box>
  

        <Box
          sx={{
            width: 2000,
            height: 300,
          
          }}
        >
        <LoginPage  />
        </Box>
      
        </>
        
   )
}
export default App;