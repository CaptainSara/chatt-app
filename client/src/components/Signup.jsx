import React from 'react'
import { FormControl, FormLabel, VStack, Input, InputGroup, InputRightElement, Button, useToast } from '@chakra-ui/react'
import { useState } from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'


export default function Signup() {

  const [show, setShow] = useState(false)
  const handleClick = () => setShow(!show)
  const toast = useToast()
  const navigateTo = useNavigate();

  const [name, setName] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [confirmpassword, setConfirmpassword] = useState()
  const [pic, setPic] = useState()
  const [picLoading, setPicLoading] = useState(false)
  

  const submitHandler = async () => {
    setPicLoading(true)
    if (!name || !email || !password || !confirmpassword) {
      toast({
        title: "Please Fill all the Fields",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      })
      setPicLoading(false)
      return
    }

    
    let letterUp = /[A-Z]/
    let sign = /[@$!%*?&]/
    

    if (password.length < 8 || !letterUp.test(password) || !sign.test(password)) {
      if (password.length < 8) {
        toast({
          title: "Password must containg more than 8 letter",
          status: "warning",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        })
        return
      } 

      if (!letterUp.test(password)) {
        toast({
          title: "Password must containg a big letter",
          status: "warning",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        })
        return
      } 

      if (!sign.test(password)) {
        toast({
          title: "Password must containg a sign",
          status: "warning",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        })
        return
      } 
      
    }


    if (password !== confirmpassword) {
      toast({
        title: "Passwords Do Not Match",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      })
      return
    }
    console.log(name, email, password, pic);
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      }
      const { data } = await axios.post(
        "/api/user",
        {
          name,
          email,
          password,
          pic,
        },
        config
      )
      console.log(data);
      toast({
        title: "Registration Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      })
      localStorage.setItem("userInfo", JSON.stringify(data))
      setPicLoading(false);
      navigateTo("/chats");
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      })
      setPicLoading(false)
    }
  }

  const postDetails = (pics) => {
    setPicLoading(true)
    if (pics === undefined) {
      toast({
        title: "Please Select an Image",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      })
      return
    }
    console.log(pics)

    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData()
      data.append("file", pics)
      data.append("upload_present", "chatt-app")
      data.append("cloud_name", "duurcmffu")

      fetch("https://api.cloudinary.com/v1_1/duurcmffu/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString())
          console.log(data.url.toString())
          setPicLoading(false)
        })
        .catch((err) => {
          console.log(err)
          setPicLoading(false)
      })
    } else {
      toast({
        title: "Please Select an Image",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      })
      setPicLoading(false)
      return
    }
  } 

  
  
  

  return (
    <VStack spacing='5px' color='black'>
      <FormControl id='first-name' isRequired>
        <FormLabel>Name</FormLabel>
          <Input
            placeholder='Enter your Name'
            onChange={(e) => setName(e.target.value)}
          />
      </FormControl>
      
      <FormControl id='email' isRequired>
        <FormLabel>E-mail</FormLabel>
        <Input
          type='email'
            placeholder='Enter your e-mail'
            onChange={(e) => setEmail(e.target.value)}
          />
      </FormControl>
      
      <FormControl id='password' isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup size='md'>
          <Input
            type={ show?'text':'password' }
            placeholder='Enter password'
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputRightElement width='4.5rem'>
            <Button h={'1.75rem'} size='sm' onClick={handleClick}>
              {show ? 'Hide' : 'Show'}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <FormControl id='password' isRequired>
        <FormLabel>Confirm Password</FormLabel>
        <InputGroup size='md'>
          <Input
            type={ show?'text':'password' }
            placeholder='Confirm password'
            onChange={(e) => setConfirmpassword(e.target.value)}
          />
          <InputRightElement width='4.5rem'>
            <Button h={'1.75rem'} size='sm' onClick={handleClick}>
              {show ? 'Hide' : 'Show'}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <FormControl id='pic'>
        <FormLabel>Upload your Picture</FormLabel>
          <Input
            type='file'
            p={ 1.5 }
            accept='image/*'
            onChange={(e) => postDetails(e.target.files[0])}
          />
      </FormControl>

      <Button
        colorScheme='blue'
        width='100%'
        style={{marginTop: 15}}
        onClick={ submitHandler }
        isLoading={picLoading}
      >
        Sign Up
      </Button>
    </VStack>
  )
}
