import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Edit = () => {
  const [data, setData] = useState({ name: "", email: "" });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch data based on the ID when the component mounts
    axios
      .get(`http://localhost:8080/data/${id}`)
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      // Fetch the original data to compare with the updated data
      const originalDataResponse = await axios.get(`http://localhost:8080/data/${id}`);

      if (originalDataResponse.status !== 200) {
        console.error("Error fetching original data:", originalDataResponse);
        toast.error("Error fetching original data");
        return;
      }

      const originalData = originalDataResponse.data;

      // Check if the email has been changed
      if (data.email !== originalData.email) {
        // Fetch all existing data to check for duplicate emails
        const existingDataResponse = await axios.get("http://localhost:8080/data");

        if (existingDataResponse.status === 200) {
          const existingData = existingDataResponse.data;

          // Check if the email already exists
          if (existingData.some((existing) => existing.email === data.email)) {
            toast.warning("Email already exists. Please enter a different email.");
            return;
          }
        } else {
          // Handle the case where fetching existing data fails
          console.error("Error fetching existing data:", existingDataResponse);
          toast.error("Error fetching existing data");
          return;
        }
      }

      // If email is unique or unchanged, proceed with the PUT request
      await axios.patch(`http://localhost:8080/data/${id}`, data);
      toast.success("Data updated");
      navigate("/");
    } catch (error) {
      console.error("Error updating data:", error);
      toast.error("Error updating data");
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
          value={data.name}
          onChange={(e) => setData({ ...data, name: e.target.value })}
          InputLabelProps={{
            shrink: !!data.name,
          }}
        />
        <TextField
          label="Email"
          name="email"
          type="email"
          margin="normal"
          variant="outlined"
          value={data.email}
          onChange={(e) => setData({ ...data, email: e.target.value })}
          InputLabelProps={{
            shrink: !!data.email,
          }}
        />
        <Button type="submit" variant="contained" color="primary" mt={2}>
          Update
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

export default Edit;
