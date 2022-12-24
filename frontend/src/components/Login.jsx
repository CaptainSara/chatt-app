import React, { useState } from 'react'
import { FormControl, FormLabel, VStack, Input, InputGroup, InputRightElement, Button } from '@chakra-ui/react'

export default function Login() {
  
  const [show, setShow] = useState(false)
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()


  const handleClick = () => setShow(!show)

 

  const submitHandler = () => {}

  return (
    <VStack spacing='5px' color='black'>
     
      
      <FormControl id='email' isRequired>
        <FormLabel>E-mail</FormLabel>
          <Input
            placeholder='Enter your e-mail'
            onChange={(e) => setEmail(e.target.value)}
          />
      </FormControl>
      
      <FormControl id='password' isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup size={'md'}>
          <Input
            type={ show?'text':'password' }
            placeholder='Enter your Name'
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputRightElement>
            <Button h={'1.75rem'} size='sm' onClick={handleClick}>
              {show ? 'Hide' : 'Show'}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

 

      <Button
        colorScheme='blue'
        width='100%'
        style={{marginTop: 15}}
        onClick={submitHandler}
      >
        Login
      </Button>

      <Button
        variant='solid'
        colorScheme='red'
        width='100%'
        onClick={ () => {
          setEmail('guest@example.com')
          setPassword('123456')
        }}
      >
        Get Guest USer Credentials
      </Button>
    </VStack>
  )
}
