import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./components/App";
import Add from "./components/Add";
import Edit from "./components/Edit";
import Login from "./components/Login";
import Register from "./components/Register";
import { ToastContainer } from "react-toastify";
import Profile from "./components/Profile";
import "./App.css";
import Appheader from "./components/Appheader";

const AppRouter = () => {
  return (
    <div className="App">
      <ToastContainer theme="light" position="top-right"></ToastContainer>

      <BrowserRouter>
        <Appheader />
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/create" element={<Add />} />
          <Route path="/update/:id" element={<Edit />} />
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default AppRouter;
