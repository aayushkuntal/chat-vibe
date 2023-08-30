import { Avatar, Box, Button, Text, Tooltip } from '@chakra-ui/react'
import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 'react-router-dom';
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
} from '@chakra-ui/react'
import { BellIcon, ChevronDownIcon } from '@chakra-ui/icons';
import { ChatState } from '../../context/ChatProvider';
import ProfileModal from './ProfileModal.jsx';

const SideDrawer = () => {

  const { user } = ChatState();
  const navigate = useNavigate();
  const [search, setsearch] = useState()
  const [searchResults, setsearchResults] = useState()
  const [searchResultsLoading, setsearchResultsLoading] = useState(false)
  const [loadingChat, setloadingChat] = useState(false)

  const logoutHandler = () => {
    localStorage.removeItem('userInfo')
    navigate('/')
  }

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      bg="white"
      width="100%"
      p="5px 10px 5px 10px"
      marginTop={2}
      borderRadius={10}
    >
      <Tooltip label='Search Users to chat' hasArrow placement='bottom-end'>
        <Button variant='ghost' display="flex" alignItems="center"> {/* Added display and alignItems */}
          <i className="fa-solid fa-magnifying-glass"></i>
          <Text display={{ base: "none", md: "flex" }} px='3'>
            Search User
          </Text>
        </Button>
      </Tooltip>

      <Text>Chat Vibe</Text>
      <div>
        <Menu>
          <MenuButton p={1}>
            <BellIcon fontSize={"2x1"} m={1} />
          </MenuButton>
          {/* <MenuList></MenuList> */}
        </Menu>

        <Menu>
          <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
            <Avatar size='sm' cursor='pointer' name={user.name} src={user.pic} />
          </MenuButton>
          <MenuList>
            <ProfileModal user={user}>
              <MenuItem>My Profile</MenuItem>{" "}
            </ProfileModal>
            <MenuDivider />
            <MenuItem>My Chats</MenuItem>
            <MenuDivider />
            <MenuItem onClick={logoutHandler}>Logout</MenuItem>
          </MenuList>
        </Menu>
      </div>
    </Box>
  )
}

export default SideDrawer
