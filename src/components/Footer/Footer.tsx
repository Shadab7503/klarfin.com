import "./Footer.css";
import Grid from "@mui/material/Grid";
import { Link, animateScroll as scroll } from "react-scroll";

const Footer = () => {
  return (
    <div className="footer">
      <Grid container justifyContent="space-evenly">
        <Grid item md={3} sm={3.5} xs={12} className="footer-logo">
          <a href="/">
            <h1 className="footer-logo-text">Klarfin</h1>
          </a>
        </Grid>
        <Grid item md={3} sm={3.5} xs={5} className="footer-product">
          <h1 className="footer-links-heading">Product</h1>
          <Link to="business-credit" smooth={true} offset={-70} duration={500}>
            <h1 className="footer-links">Business Credit</h1>
          </Link>
          <Link to="cash-management" smooth={true} offset={-70} duration={500}>
            <h1 className="footer-links">Cash Management</h1>
          </Link>
        </Grid>
        <Grid item md={3} sm={3.5} xs={5} className="footer-company">
          <h1 className="footer-links-heading">Company</h1>
          <a href="/about">
            <h1 className="footer-links">About</h1>
          </a>
          <a href="/contact">
            <h1 className="footer-links">Contact Us</h1>
          </a>
        </Grid>
      </Grid>
      <div className="copyright">
        &#169;KLARCAP TECHNOLOGIES PRIVATE LIMITED
      </div>
    </div>
  );
};

export default Footer;
