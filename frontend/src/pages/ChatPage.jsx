import { ChatState } from "../context/ChatProvider"
import { Box } from "@chakra-ui/react"
import Chatbox from "../components/ChatBox";
import MyChats from "../components/MyChats";
import SideDrawer from "../components/SideDrawer";
import { useState } from "react";

export default function ChatPage() {
  const { user } = ChatState()
  
  const [fetchAgain, setFetchAgain] = useState(false);
  
  
  return (
    <div style={{ width: "100%" }}>
      {user && <SideDrawer />}
      <Box d="flex" justifyContent="space-between" w="100%" h="91.5vh" p="10px">
        {user && <MyChats fetchAgain={fetchAgain} />}
        {user && (
          <Chatbox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        )}
      </Box>
    </div>
  )
}
