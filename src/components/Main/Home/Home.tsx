import NavBar from "../NavBar";
import Landing from "./Landing";
import Features from "./Features";
import Works from "./Works";
import Footer from "./Footer";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const Home = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    console.log(window.location.hash);
    if (window.location.hash === "#features") {
      var element = document.getElementsByClassName("features")[0];
      var headerOffset = 70;
      var elementPosition = element?.getBoundingClientRect().top;
      var offsetPosition = elementPosition! + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    } else if (window.location.hash === "#works") {
      var element = document.getElementsByClassName("cash-management")[0];
      var headerOffset = 70;
      var elementPosition = element?.getBoundingClientRect().top;
      var offsetPosition = elementPosition! + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    } else window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="main">
      <NavBar />
      <Landing />
      <Features />
      <Works />
      <Footer />
    </div>
  );
};

export default Home;
