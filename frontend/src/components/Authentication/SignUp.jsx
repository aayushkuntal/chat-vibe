import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useToast } from '@chakra-ui/react'
import { useNavigate } from "react-router-dom";
import axios from 'axios'

const SignUp = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [confirmpassword, setConfirmpassword] = useState();
  const [password, setPassword] = useState();
  const [pic, setPic] = useState();
  const [isLoading, setisLoading] = useState(false);
  const toast = useToast();

  const handleClick = () => setShow(!show);

  const submitHandler = async () => {
    setisLoading(true);
    if (!name || !email || !password || !confirmpassword) {
      setisLoading(false);
      return toast({
        title: "Empty Fields",
        description: "Please fill all the fields",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom"
      });
    }
    if (password !== confirmpassword) {
      setisLoading(false);
      return toast({
        title: "Password Mismatch",
        description: "Please check your password",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom"
      });
    }

    //Make api request
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      };

      const { data } = await axios.post(
        "http://localhost:5000/api/user",
        { name, email, password, pic },
        config
      );

      console.log(data);

      toast({
        title: "Account Created",
        description: "Your account has been created successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "bottom"
      });


      //Set local storage
      localStorage.setItem("userInfo", JSON.stringify(data));
      setisLoading(false);

      //Redirect to home page
      // navigate("/chats");

    } catch (error) {
      //Display error message
      setisLoading(false);
      return toast({
        title: "Error",
        description: error.response.data.message,
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "bottom"
      });
    }
  }

  const postDetails = async (pics) => {
    setisLoading(true);
    if (pics === undefined) {
      return toast({
        title: "No Image Selected",
        description: "Please select an image to upload",
        status: "error",
        duration: 1500,
        isClosable: true,
        position: "bottom"
      });
    }

    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "chat-vibe");
      data.append("cloud_name", "dq6iaaake");

      //Post the image
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/dq6iaaake/image/upload",
        data
      );

      //Get the image url
      const fileUrl = res.data.url.toString();
      setPic(fileUrl);
      setisLoading(false);
      console.log(res);
    } else {
      setisLoading(false);
      return toast({
        title: "Invalid Image",
        description: "Please select a valid image to upload",
        status: "error",
        duration: 1500,
        isClosable: true,
        position: "bottom"
      });
    }
  }

  return (
    <VStack spacing="5px">

      <FormControl id="first-name" isRequired>
        <FormLabel>Name</FormLabel>
        <Input
          placeholder="Enter Your Name"
          onChange={(e) => setName(e.target.value)}
        />
      </FormControl>

      <FormControl id="email" isRequired>
        <FormLabel>Email Address</FormLabel>
        <Input
          type="email"
          placeholder="Enter Your Email Address"
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>

      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup size="md">
          <Input
            type={show ? "text" : "password"}
            placeholder="Enter Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <FormControl id="password" isRequired>
        <FormLabel>Confirm Password</FormLabel>
        <InputGroup size="md">
          <Input
            type={show ? "text" : "password"}
            placeholder="Confirm password"
            onChange={(e) => setConfirmpassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <FormControl id="pic">
        <FormLabel>Upload your Picture</FormLabel>
        <Input
          type="file"
          p={1.5}
          accept="image/*"
          onChange={(e) => postDetails(e.target.files[0])}
        />
      </FormControl>

      <Button
        colorScheme="blue"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
        isLoading={isLoading}
      >
        Sign Up
      </Button>
    </VStack>
  )
}

export default SignUp