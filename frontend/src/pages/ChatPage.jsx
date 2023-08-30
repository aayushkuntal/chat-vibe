import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { ChatState } from '../context/ChatProvider';
import SideDrawer from '../components/Miscellaneous/SideDrawer';
import MyChats from '../components/Miscellaneous/MyChats';
import ChatBox from '../components/Miscellaneous/ChatBox';
import { Box } from '@chakra-ui/react';

const ChatPage = () => {

  const {user} = ChatState(); 

  return (
    <div style = {{width:'98%'}}>
      {user && <SideDrawer/>}
      <Box 
        display='flex'
        justifyContent='space-between'
        w="100%"
        h="91.5vh"
        padding="0 1rem"
      >
        {user && <MyChats />}
        {user && <ChatBox />}
      </Box>
    </div>
  )
}

export default ChatPage