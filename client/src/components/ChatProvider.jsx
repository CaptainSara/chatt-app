import React, { createContext, useEffect, useState } from "react";
import { useHistory} from "react-router-dom";

export const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const [selectedChat, setSelectedChat] = useState();
  const [user, setUser] = useState();
  const [notification, setNotification] = useState([]);
  const [chats, setChats] = useState();

  const navigateTo = useHistory();


  console.log("Values set initially in the ChatContext",
        selectedChat,
        setSelectedChat,
        user,
        setUser,
        notification,
        setNotification,
        chats,
        setChats)

  useEffect(() => {
    //const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    //setUser(userInfo);

    //if (!userInfo) navigateTo.push("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [history]);

  return (
    
    <ChatContext.Provider
      value={{
        selectedChat,
        setSelectedChat,
        user,
        setUser,
        notification,
        setNotification,
        chats,
        setChats,
      }}
    >
      {children}
      </ChatContext.Provider>
      
  );
};

export default ChatProvider;