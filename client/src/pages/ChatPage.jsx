import { Box } from "@chakra-ui/react"
import { useState } from "react"
import { ChatState } from "../components/ChatProvider"
import Chatbox from "../components/ChatBox"
import MyChats from "../components/MyChats"
import SideDrawer from "../components/SideDrawer"


export default function ChatPage() {
  
  const [fetchAgain, setFetchAgain] = useState(false);
  const  {user}  = ChatState()
  
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
