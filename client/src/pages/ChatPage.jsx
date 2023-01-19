import { Box } from "@chakra-ui/react"
import { useState, useContext } from "react"
import { ChatContext } from "../components/ChatProvider"
import Chatbox from "../components/ChatBox"
import MyChats from "../components/MyChats"
import SideDrawer from "../components/SideDrawer"


export default function ChatPage() {

  const [fetchAgain, setFetchAgain] = useState(false);
  const chatState = useContext(ChatContext);
  console.log("chatState", chatState)
  
  return (
    <div style={{ width: "100%" }}>
      {chatState && <SideDrawer />}
      <Box d="flex" justifyContent="space-between" w="100%" h="91.5vh" p="10px">
        {chatState && <MyChats fetchAgain={fetchAgain} />}
        {chatState && (
          <Chatbox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        )}
      </Box>
    </div>
  )
}
