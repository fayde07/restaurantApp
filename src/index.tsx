import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./routes/HomePage/Home";
import About from "./routes/AboutPage/About";
import Login from "./routes/Login/Login";
import RegistrationForm from "./routes/Register/RegistrationForm";
import "./index.css";
import Dashboard from "./routes/DashboardPage/Dashboard";
import UserContext from "./contexts/UserContext";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      {/* <UserContext> */}
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="home" element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<RegistrationForm />} />
          </Route>
        </Routes>
      {/* </UserContext> */}
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root"),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
