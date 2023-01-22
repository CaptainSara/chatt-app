import { ArrowBackIcon } from '@chakra-ui/icons'
import { Box, IconButton, Text } from '@chakra-ui/react'
import React from 'react'
import { ChatState } from './ChatProvider'
import UpdateGroupChatModal from './UpdateGroupChatModal'
import { getSender, getSenderFull } from '../config/ChatLogics'
import ProfileModal from './ProfileModal'

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  
  const {user, selectedChat, setSelectedChat} = ChatState()

  /* const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [istyping, setIsTyping] = useState(false);
  const toast = useToast(); */
  
  return (
    <div>
      { selectedChat ?
        (<>
          <Text fontSize={{ base: "28px", md: "30px" }}
            pb={3}
            px={2}
            w="100%"
            fontFamily="Work sans"
            display={"flex"}
            justifyContent={{ base: "space-between" }}
            alignItems="center">
            
            <IconButton display={{base: "flex", md: "none"}} icon={<ArrowBackIcon/>} onClick={() => setSelectedChat("")}/>
            { !selectedChat.isGroupChat ? (
              <>
                { getSender(user, selectedChat.users) }
                <ProfileModal user={getSenderFull(user, selectedChat.users)} />
            </>) : (
              <>{ selectedChat.chatName.toUpperCase() }
              <UpdateGroupChatModal fetchAgain={fetchAgain} setFetchAgain={setFetchAgain}/>
              </>
              )}
          </Text>
          <Box display={"flex"}
            flexDir="column"
            justifyContent="flex-end"
            p={3}
            bg="#E8E8E8"
            w="100%"
            h="100%"
            borderRadius="lg"
            overflowY="hidden">
            {/* Messages here */}
          </Box>
        </>) : (
        <Box display={ "flex" } alignItems={"center" }justifyContent={ "center" } h="100%">
          <Text fontSize="3xl" pb={3} fontFamily="Work sans">
            Click on a user to startchatting
          </Text>
        </Box>
      )}
    </div>
  )
}

export default SingleChat


