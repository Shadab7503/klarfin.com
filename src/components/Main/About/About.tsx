import NavBar from "../NavBar";
import Footer from "../Footer";
import Mission from "../Home/Mission";

import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const About = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return (
    <div className="about">
      <NavBar />
      <Mission />
      <Footer />
    </div>
  );
};

export default About;
