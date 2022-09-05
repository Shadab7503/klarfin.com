import Grid from "@mui/material/Grid";
import { Link } from "react-scroll";

const Footer = () => {
  return (
    <div className="footer">
      <Grid container justifyContent="space-evenly">
        {/* <Grid item xl={1} md={1} sm={2} xs={12} className="footer-logo">
          <a href="/">
            <h1 className="footer-logo-text">Klarfin</h1>
          </a>
        </Grid> */}
        <Grid item xl={1} md={2} sm={2} xs={3.5} className="footer-product">
          <h1 className="footer-links-heading">Product</h1>
          <Link
            to="features"
            smooth={true}
            offset={-70}
            duration={800}
            onClick={() => {
              if (window.location.pathname !== "/")
                window.location.assign("/#features");
            }}
          >
            <h1 className="footer-links" id="features-footer-link">
              Features
            </h1>
          </Link>
          <Link
            to="works"
            smooth={true}
            offset={-70}
            duration={500}
            onClick={() => {
              if (window.location.pathname !== "/")
                window.location.assign("/#works");
            }}
          >
            <h1 className="footer-links" id="works-footer-link">
              How it Works
            </h1>
          </Link>
        </Grid>
        <Grid item xl={1} md={2} sm={2} xs={3.5} className="footer-company">
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
        &#169; {new Date().getFullYear()} KLARCAP TECHNOLOGIES PRIVATE LIMITED.
        All rights reserved
      </div>
    </div>
  );
};

export default Footer;
