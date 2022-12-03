import { useState } from "react";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import MenuIcon from "@mui/icons-material/Menu";
import Button from "@mui/material/Button";
import { Link } from "react-scroll";

const NavBar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const drawer = (
    <Grid container spacing={2.5} py={3}>
      <Grid item xs={12} className="drawerItem">
        <Link
          to="features"
          smooth={true}
          offset={-70}
          duration={500}
          onClick={() => {
            setDrawerOpen(false);
            if (window.location.pathname !== "/")
              window.location.assign("/#features");
          }}
        >
          Features
        </Link>
      </Grid>
      <Grid item xs={12} className="drawerItem">
        <Link
          to="works"
          smooth={true}
          offset={-70}
          duration={500}
          onClick={() => {
            setDrawerOpen(false);
            if (window.location.pathname !== "/")
              window.location.assign("/#works");
          }}
        >
          How it Works
        </Link>
      </Grid>
      <Grid item xs={12} className="drawerItem">
        <Link to="/login">Login</Link>
      </Grid>
      <Grid item xs={12} style={{ textAlign: "center" }}>
        <a href="/register">
          <Button
            sx={{
              background: "#6395fa",
              fontFamily: "Work Sans",
              fontWeight: "bold",
              fontSize: "1.2rem",
              "&:hover": {
                backgroundColor: "black",
              },
              borderRadius: "1rem",
              padding: "0.7rem 2rem",
            }}
            variant="contained"
            className="login"
          >
            Start Free Trial
          </Button>
        </a>
      </Grid>
    </Grid>
  );

  return (
    <Grid container className="navBar">
      <Grid item xl={9} lg={10} md={11} sm={10} xs={10}>
        <Grid container justifyContent="space-between" py={1.5}>
          <Grid item lg={2} md={2} sm={4} style={{ textAlign: "center" }}>
            <a href="/">
              <span className="logo">KLARFIN</span>
            </a>
          </Grid>
          <Grid item lg={9} md={10} sm={6}>
            <Grid
              container
              alignItems="center"
              style={{ height: "100%" }}
              spacing={3}
              justifyContent="flex-end"
            >
              <Grid item sx={{ display: { xs: "none", md: "block" } }}>
                <Link
                  to="features"
                  smooth={true}
                  offset={-70}
                  duration={500}
                  onClick={() => {
                    if (window.location.pathname !== "/")
                      window.location.assign("/#features");
                  }}
                >
                  <div className="navItem">Features</div>
                </Link>
              </Grid>
              <Grid item sx={{ display: { xs: "none", md: "block" } }}>
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
                  <div className="navItem">How it Works</div>
                </Link>
              </Grid>
              <Grid item sx={{ display: { xs: "none", md: "block" } }}>
                <a href="/login">
                  <div className="navItem">Login</div>
                </a>
              </Grid>
              <Grid item>
                <a href="/register">
                  <Button
                    sx={{
                      display: { xs: "none", md: "inline" },
                      background: "#231955",
                      fontFamily: "Work Sans",
                      fontWeight: "bold",
                      "&:hover": {
                        backgroundColor: "#231955",
                      },
                      padding: "0.7rem 1rem",
                    }}
                    variant="contained"
                    className="login"
                  >
                    Start Free Trial
                  </Button>
                </a>
              </Grid>
            </Grid>
          </Grid>
          <IconButton
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={() => setDrawerOpen(true)}
            color="inherit"
            sx={{ display: { xs: "block", md: "none" } }}
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
          display: { xs: "block", md: "none" },
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
