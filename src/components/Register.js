import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, TextField, Button } from "@mui/material";
//import toast from "react-hot-toast";
import axios from "axios";
const Register = () => {
  const navigate = useNavigate();
  //state
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
  });

  //handle input change
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  //form handle
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/v1/user/register", {
        username: inputs.name,
        email: inputs.email,
        password: inputs.password,
      });
      if (data.success) {
        toast.success("User Register Successfully");
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <Box
          maxWidth={450}
          display="flex"
          flexDirection={"column"}
          alignItems="center"
          justifyContent={"center"}
          margin="auto"
          marginTop={5}
          boxShadow="10px 10px 20px #ccc"
          padding={3}
          borderRadius={5}
        >
          <Typography
            variant="h4"
            sx={{ textTransform: "uppercase" }}
            padding={3}
            textAlign="center"
          >
            Register
          </Typography>
          <TextField
            placeholder="name"
            value={inputs.name}
            onChange={handleChange}
            name="name"
            margin="normal"
            type={"text"}
            required
          />
          <TextField
            placeholder="email"
            value={inputs.email}
            name="email"
            margin="normal"
            type={"email"}
            required
            onChange={handleChange}
          />
          <TextField
            placeholder="password"
            value={inputs.password}
            name="password"
            margin="normal"
            type={"password"}
            required
            onChange={handleChange}
          />

          <Button
            type="submit"
            sx={{ borderRadius: 3, marginTop: 3 }}
            variant="contained"
            color="primary"
          >
            Submit
          </Button>
          <Button
            onClick={() => navigate("/login")}
            sx={{ borderRadius: 3, marginTop: 3 }}
          >
            Already Registerd ? Please Login
          </Button>
        </Box>
      </form>
    </>
  );
};

export default Register

//ABOUT MULTIPLE STATE CHANGE:-----|
//There are a couple of significant changes that have been made, in addition to the new input field. A new lastName string has been added to
//state to store the data from this input, and each of the input elements have a new name prop.
//These name props will show up in the DOM as a name attributes on the input HTML elements.
//We'll consume them in an adjustment to the handler code:
//In addition to getting the value from the event target, we get the name of that target as well. This is the essential point for handling
//multiple input fields with one handler. We funnel all changes through that one handler but then distinguish which input the change is coming
//from using the name.This example is using [evt.target.name], with the name in square brackets, to create a dynamic key name in the object.
//Because the form name props match the state property keys, the firstName input will set the firstName state and the lastName input will
//separately set the lastName state.Also note that, because we are using a single state object that contains multiple properties, we're
//spreading (...state) the existing state back into the new state value, merging it manually, when calling setState.
//This is required when using React.useState in the solution.
