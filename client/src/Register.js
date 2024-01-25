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

const Register = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("");
  const [loading, setLoading] = useState(false);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isValidate()) {
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:8080/register", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          name,
          password,
          email,
          phone,
          address,
          gender,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data)
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
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
                margin="normal"
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
