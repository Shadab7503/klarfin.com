import Home from "./components/Main/Home/Home";
import About from "./components/Main/About/About";
import Contact from "./components/Main/Contact/Contact";
import Login from "./components/UserEntry/Login";
import LoginSuper from "./components/SuperAdmin/LoginSuper";
import DashboardSuper from "./components/SuperAdmin/DashboardSuper";
import SignUp from "./components/UserEntry/SignUp";
import Dashboard from "./components/Dashboard/Dashboard";
import Verify from "./components/Verify/Verify";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./styles/styles.css";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/" element={<Home />} />
        <Route path="/loginSuper" element={<LoginSuper />} />
        <Route path="/dashboardSuper" element={<DashboardSuper />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/verify" element={<Verify />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
