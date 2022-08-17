import "./About.css";
import NavBar2 from "../NavBar2/NavBar2";
import Footer from "../Footer/Footer";
import Mission from "../Mission/Mission";

import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const About = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return (
    <div className="about">
      <NavBar2 />
      <Mission />
      <Footer />
    </div>
  );
};

export default About;
