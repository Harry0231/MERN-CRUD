import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import CircularProgress from "@mui/material/CircularProgress";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const validate = () => {
    let result = true;
    if (!username) {
      result = false;
      toast.warning("Please enter a username");
    }
    if (!password) {
      result = false;
      toast.warning("Please enter a password");
    }
    return result;
  };

  const proceedLogin = async (e) => {
    e.preventDefault();
  
    if (!validate()) {
      return;
    }
  
    setLoading(true);
  
    try {
      const response = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          email: username,
          password,
        }),
      });
      if (response.ok) {
        const data = await response.json();
        toast.success("Login successful");
        sessionStorage.setItem("username", data.user.name);
        navigate("/");
      } else {
        const errorData = await response.json();
        toast.error(`Login failed: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error during login:", error);
      toast.error("Failed to login. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="row"
      style={{ display: "flex", justifyContent: "center", marginTop: "150px" }}
    >
      <div className="col-lg-6" style={{ marginTop: "100px" }}>
        <form onSubmit={proceedLogin} className="container">
          <Card>
            <CardHeader title="User Login" />
            <CardContent>
              <TextField
                label="User Email *"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                fullWidth
                margin="normal"
                variant="outlined"
                style={{ marginBottom: "8px" }}
              />
              <TextField
                label="Password *"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
                margin="normal"
                variant="outlined"
                style={{ marginBottom: "8px" }}
              />
            </CardContent>
            <CardActions>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={loading}
              >
                {loading ? <CircularProgress size={20} /> : "Login"}
              </Button>
              <Link to="/register">
                <Button variant="contained" color="success">
                  New User
                </Button>
              </Link>
            </CardActions>
          </Card>
        </form>
      </div>
    </div>
  );
};

export default Login;