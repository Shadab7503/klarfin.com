import "../styles/styles.css";
import NavBar from "./NavBar";
import Landing from "./Landing";
import Working from "./Working";
import BusinessCredit from "./BusinessCredit";
import CashManagement from "./CashManagement";
import Footer from "./Footer";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import data from "../api/data.json";
import axios from "axios";

const Home = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    // axios(data.item[0].item[0].request)
    //   .then((response) => console.log(response))
    //   .catch((err) => console.log(err));
  }, [pathname]);
  return (
    <div className="main">
      <NavBar />
      <Landing />
      <Working />
      <BusinessCredit />
      <CashManagement />
      <Footer />
    </div>
  );
};

export default Home;
