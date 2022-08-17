import NavBar from "../Navbar/NavBar";
import Landing from "../Landing/Landing";
import Working from "../Working/Working";
import BusinessCredit from "../BusinessCredit/BusinessCredit";
import CashManagement from "../CashManagement/CashManagement";
import Footer from "../Footer/Footer";
import "./Home.css";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const Home = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
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
