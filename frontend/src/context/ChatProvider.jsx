import { createContext, useContext } from "react";
import { useEffect, useState } from "react";

const ChatContext = createContext();

const ChatProvider = ({ children }) => {

    const [selectedChat, setSelectedChat] = useState();
    const [user, setUser] = useState();
    const [notification, setNotification] = useState([]);
    const [chats, setChats] = useState([]);

    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'))
        setUser(userInfo);

        if (!userInfo) {
            navigate('/');
        }
    }, [])

    return (
        <ChatContext.Provider value={{ user, setUser, selectedChat, setSelectedChat, chats, setChats }}>
            {children}
        </ChatContext.Provider>
    )
}

export const ChatState = () => {
    return useContext(ChatContext);
};

export default ChatProvider;