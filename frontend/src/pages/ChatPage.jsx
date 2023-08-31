import React from 'react';
import { Box } from '@chakra-ui/react';
import { ChatState } from '../context/ChatProvider'; // Assuming ChatState is imported correctly
import SideDrawer from '../components/Miscellaneous/SideDrawer';
import MyChats from '../components/Miscellaneous/MyChats';
import ChatBox from '../components/Miscellaneous/ChatBox';

const ChatPage = () => {
  const { user } = ChatState();

  return (
    <div style={{ width: '98%' }}>
      {user && <SideDrawer />}
      <Box
        display='flex'
        justifyContent='space-between'
        w="100%"
        h="91.5vh"
        padding=".5rem 0rem"
      >
        {user && <MyChats />}
        {user && <ChatBox />} 
      </Box>
    </div>
  );
};

export default ChatPage;
