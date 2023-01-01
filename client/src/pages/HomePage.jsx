import React from 'react'
import { Container, Box, Text, Tabs, TabList, Tab, TabPanel, TabPanels } from '@chakra-ui/react'
import { useEffect } from "react"
import { useNavigate } from "react-router"
import Login from '../components/Login'
import Signup from '../components/Signup'

export default function HomePage() {

   const navigateTo = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));

    if (user) navigateTo.push("/chats");
  }, [navigateTo]);

  return (
    <Container maxW='xl' centerContent>
      <Box d='flex' justifyContent='center' p={3} bg={'white'} w='100%' m='40px 0 15px 0' borderRadius='lg' borderWidth='1px'>
        <Text fontSize={'4xl'} fontFamily='Work sans' color='black'>Let's Chat</Text>
      </Box>

      <Box bg='white' w='100%' p={4} borderRadius='lg' borderWidth='1px' color='black'>
        <Tabs variant='soft-rounded' >
          <TabList mb='1em'>
            <Tab width='50%'>Login</Tab>
            <Tab width='50%'>Register</Tab>
          </TabList>
          <TabPanels>
            <TabPanel><Login/></TabPanel>
            <TabPanel><Signup/></TabPanel>
          </TabPanels>
        </Tabs>
      </Box>

    </Container>
  )
}
