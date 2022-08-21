import NavBar2 from "./NavBar2";
import ContactForm from "./ContactForm";
import Footer from "./Footer";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const Contact = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="contact">
      <NavBar2 />
      <ContactForm />
      <Footer />
    </div>
  );
};

export default Contact;
