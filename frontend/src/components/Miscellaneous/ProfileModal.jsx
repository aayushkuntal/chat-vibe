import React from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  IconButton,
  Image,
  Text,
} from '@chakra-ui/react'
import { ViewIcon } from '@chakra-ui/icons'

const ProfileModal = ({ user, children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <div>
      {children ? (<span onClick={onOpen}>{children}</span>) : (
        <IconButton display={{ base: "flex" }} icon={<ViewIcon />} onClick={onOpen}>
        </IconButton>
      )}

      <Modal size="lg" onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent h="45vh">
          <ModalHeader
            fontSize="40px"
            fontFamily="Arial"
            display="flex"
            justifyContent="center"
          >{user.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody
            display="flex"
            flexDir="column"
            alignItems="center"
            justifyContent="space-between"
          >

            <Image
              borderRadius="full"
              boxSize="150px"
              src={user.pic}
              alt={user.name}
            />

            <Text
              fontSize={{ base: "28px", md: "30px" }}
              fontFamily="Sans-serif"
            >
              Email: {user.email}
            </Text>
          </ModalBody>


          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

    </div>
  )
}

export default ProfileModal