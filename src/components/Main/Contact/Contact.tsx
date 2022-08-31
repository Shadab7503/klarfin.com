import NavBar from "../NavBar";
import ContactForm from "./ContactForm";
import Footer from "../Home/Footer";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const Contact = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="contact">
      <NavBar />
      <ContactForm />
      <Footer />
    </div>
  );
};

export default Contact;
