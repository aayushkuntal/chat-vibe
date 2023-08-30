import { Avatar } from "@chakra-ui/avatar";
import { Box, Text } from "@chakra-ui/layout";
import { ChatState } from "../../context/ChatProvider";

const UserListItem = ({ handleFunction }) => {
    const { user } = ChatState();

    return (
        <Box
            onClick={handleFunction}
            cursor="pointer"
            bg="#E8E8E8"
            _hover={{
                background: "#00a6fb",
                color: "white",
            }}
            width="100%"
            display="flex"
            flexDirection="column"
            color="black"
            px={3}
            py={2}
            mb={2}
            borderRadius="lg"
        >
            <Box display="flex" flexDirection="row" alignItems="center">
                <Avatar
                mr={2}
                size="sm"
                cursor="pointer"
                name={user.name}
                src={user.pic}
            />
                <Text>{user.name}</Text>
            </Box>


            <Box>
                <Text fontSize="xs">
                    <b>Email : </b>
                    {user.email}
                </Text>
            </Box>
        </Box>
    );
};

export default UserListItem;