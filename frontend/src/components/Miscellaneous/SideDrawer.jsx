import { Box, Button, Text, Tooltip } from '@chakra-ui/react'
import React from 'react'
import { useState } from 'react';

const SideDrawer = () => {

  const [search, setsearch] = useState()
  const [searchResults, setsearchResults] = useState()
  const [searchResultsLoading, setsearchResultsLoading] = useState(false)
  const [loadingChat, setloadingChat] = useState(false)

  return (
    <Box>
      <Tooltip label='Search Users to chat' hasArrow placement='bottom-end'>
        <Button variant='ghost' display="flex" alignItems="center"> {/* Added display and alignItems */}
          <i className="fa-solid fa-magnifying-glass"></i>
          <Text display={{ base: "none", md: "flex" }} px='4'>
            Search User
          </Text>
        </Button>
      </Tooltip>
    </Box>
  )
}

export default SideDrawer
