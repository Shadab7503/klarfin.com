import Grid from "@mui/material/Grid";
import { Link } from "react-scroll";

const Footer = () => {
  return (
    <div className="footer">
      <Grid
        container
        justifyContent="flex-end"
        pr={{ xl: 40, lg: 20, md: 10, sm: 10, xs: 5 }}
      >
        <Grid item xl={4.5} lg={6} md={7} sm={8} xs={10}>
          <Grid container justifyContent="space-between">
            <Grid
              item
              xl={3.5}
              lg={4}
              md={4.5}
              sm={5}
              xs={5}
              className="footer-product"
            >
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
                  Cash Management
                </h1>
              </Link>
              <Link
                to="instant-credit"
                smooth={true}
                offset={-70}
                duration={800}
                onClick={() => {
                  if (window.location.pathname !== "/")
                    window.location.assign("/#instant-credit");
                }}
              >
                <h1 className="footer-links" id="features-footer-link">
                  Business Credit
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
            <Grid
              item
              xl={3.5}
              lg={4}
              md={4.5}
              sm={5}
              xs={5}
              className="footer-company"
            >
              <h1 className="footer-links-heading">Company</h1>
              <a href="/about">
                <h1 className="footer-links">About</h1>
              </a>
              <a href="/contact">
                <h1 className="footer-links">Contact Us</h1>
              </a>
            </Grid>
          </Grid>
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
