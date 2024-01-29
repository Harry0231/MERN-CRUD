import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Add = () => {
  const [inputdata, setInputData] = useState({ name: "", email: "" });
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      // Check if the email already exists
      const existingData = await axios.get("http://localhost:8080/data");
      if (existingData.data.some((data) => data.email === inputdata.email)) {
        toast.warning("Email already exists. Please use a different email.");
        return;
      }

      // If email is unique, proceed with the POST request
      await axios.post("http://localhost:8080/data", inputdata);
      toast.success("Data added");
      navigate("/");
    } catch (error) {
      console.error("Error adding data:", error);
      toast.error("Error adding data");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="100vh"
      >
        <TextField
          label="Name"
          name="name"
          margin="normal"
          variant="outlined"
          onChange={(e) => setInputData({ ...inputdata, name: e.target.value })}
        />
        <TextField
          label="Email"
          name="email"
          type="email"
          margin="normal"
          variant="outlined"
          onChange={(e) =>
            setInputData({ ...inputdata, email: e.target.value })
          }
        />
        <Button type="submit" variant="contained" color="primary" mt={2}>
          Submit
        </Button>
        <Box mt={2}>
          <Link to="/" className="btn btn-secondary">
            Back
          </Link>
        </Box>
      </Box>
    </form>
  );
};

export default Add;
