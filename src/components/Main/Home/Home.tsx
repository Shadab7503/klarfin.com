import NavBar from "../NavBar";
import Landing from "./Landing";
import Features from "./Features";
import Works from "./Works";
import Footer from "../Footer";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const Home = () => {
  const { pathname } = useLocation();

  useEffect(() => {
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
      setTimeout(() => {
        var element = document.getElementsByClassName("works")[0];
        var headerOffset = 70;
        var elementPosition = element?.getBoundingClientRect().top;
        var offsetPosition =
          elementPosition! + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }, 500);
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
