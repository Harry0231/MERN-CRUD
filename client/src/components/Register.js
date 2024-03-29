import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import { IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const Register = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("");
  const [loading, setLoading] = useState(false);
  const [profilePic, setProfilePic] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const isValidate = () => {
    let isProceed = true;
    let errorMessage = "Please enter a value in ";

    if (!name) {
      isProceed = false;
      errorMessage += "Full Name";
    }
    if (!password) {
      isProceed = false;
      errorMessage += "Password";
    }
    if (!email) {
      isProceed = false;
      errorMessage += "Email";
    }

    if (!isProceed) {
      toast.warning(errorMessage);
    } else {
      if (!/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email)) {
        isProceed = false;
        toast.warning("Please enter a valid email");
      }
    }
    return isProceed;
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setProfilePic(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isValidate()) {
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("password", password);
      formData.append("email", email);
      formData.append("phone", phone);
      formData.append("address", address);
      formData.append("gender", gender);
      if (profilePic) {
        formData.append("profilePic", profilePic);
      }

      const response = await fetch("http://localhost:8080/register", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        toast.success("Registered successfully.");
        navigate("/login");
      } else {
        const errorData = await response.json();
        toast.error(`Registration failed: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error during registration:", error);
      toast.error("Failed to register. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div style={{ width: "50%" }}>
        <form onSubmit={handleSubmit}>
          <Card>
            <CardHeader title="User Registration" />
            <CardContent>
              <TextField
                label="Full Name *"
                value={name}
                onChange={(e) => setName(e.target.value)}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Password *"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
                margin="normal"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                label="Email *"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                fullWidth
                margin="normal"
                multiline
                rows={3}
              />
              <TextField
                label="Upload Profile"
                type="file"
                accept="image/*"
                onChange={handleFileChange} 
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <RadioGroup
                row
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="Male"
                />
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label="Female"
                />
              </RadioGroup>
            </CardContent>
            <CardActions>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={loading}
              >
                {loading ? "Registering..." : "Register"}
              </Button>
              <Link to={"/login"} style={{ marginLeft: "auto" }}>
                <Button variant="contained" color="secondary">
                  Back
                </Button>
              </Link>
            </CardActions>
          </Card>
        </form>
      </div>
    </div>
  );
};

export default Register;
