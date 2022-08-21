import { useState } from "react";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import MenuIcon from "@mui/icons-material/Menu";
import Button from "@mui/material/Button";
import { Link, animateScroll as scroll } from "react-scroll";

const NavBar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const drawer = (
    <Grid container spacing={2.5} my={2}>
      <Grid item xs={12} className="drawerItem">
        <Link
          to="business-credit"
          smooth={true}
          offset={-70}
          duration={500}
          onClick={() => setDrawerOpen(false)}
        >
          Business Credit
        </Link>
      </Grid>
      <Grid item xs={12} className="drawerItem">
        <Link
          to="cash-management"
          smooth={true}
          offset={-70}
          duration={500}
          onClick={() => setDrawerOpen(false)}
        >
          Cash Management
        </Link>
      </Grid>
      <Grid item xs={12} style={{ textAlign: "center" }}>
        <Button
          sx={{
            background: "black",
            fontFamily: "Work Sans",
            fontWeight: "bold",
            "&:hover": {
              backgroundColor: "black",
            },
            padding: "0.7rem 2rem",
          }}
          variant="contained"
          className="login"
        >
          Login
        </Button>
      </Grid>
    </Grid>
  );

  return (
    <Grid container className="navBar">
      <Grid item xl={9} lg={10} sm={12} xs={10}>
        <Grid container justifyContent="space-between">
          <Grid item lg={2} md={3} sm={4} style={{ textAlign: "center" }}>
            <span className="logo" onClick={() => scroll.scrollToTop()}>
              Klarfin
            </span>
          </Grid>
          <Grid item xl={4} lg={4.5} md={5} sm={7}>
            <Grid
              container
              alignItems="center"
              style={{ height: "100%" }}
              justifyContent="space-evenly"
            >
              <Grid item sx={{ display: { xs: "none", sm: "block" } }}>
                <Link
                  to="business-credit"
                  smooth={true}
                  offset={-70}
                  duration={500}
                >
                  <div className="navItem">Business Credit</div>
                </Link>
              </Grid>
              <Grid item sx={{ display: { xs: "none", sm: "block" } }}>
                <Link
                  to="cash-management"
                  smooth={true}
                  offset={-70}
                  duration={500}
                >
                  <div className="navItem">Cash Management</div>
                </Link>
              </Grid>
              <a href="/login">
                <Button
                  sx={{
                    display: { xs: "none", sm: "block" },
                    background: "black",
                    fontFamily: "Work Sans",
                    fontWeight: "bold",
                    "&:hover": {
                      backgroundColor: "black",
                    },
                    padding: "0.7rem 2rem",
                  }}
                  variant="contained"
                  className="login"
                >
                  Login
                </Button>
              </a>
            </Grid>
          </Grid>
          <IconButton
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={() => setDrawerOpen(true)}
            color="inherit"
            sx={{ display: { xs: "block", sm: "none" } }}
          >
            <MenuIcon style={{ fontSize: "2rem" }} />
          </IconButton>
        </Grid>
      </Grid>

      <Drawer
        anchor="top"
        variant="temporary"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            margin: "0rem",
          },
        }}
      >
        {drawer}
      </Drawer>
    </Grid>
  );
};

export default NavBar;
