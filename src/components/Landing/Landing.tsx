import "./Landing.css";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import bg from "../../images/bg.jpg";

const Landing = () => {
  return (
    <Grid container className="landing" justifyContent="center">
      <Grid item xl={6} xs={11.5}>
        <Grid
          container
          direction="column"
          justifyContent="center"
          height="100%"
        >
          <Grid item className="heading1">
            <span>For Fast Growing SMEs and Startups</span>
          </Grid>
          <Grid item className="heading2">
            <span>
              Improve Cash Flows With Klarfin's Credit & Cash Management
              Software
            </span>
          </Grid>
          <Grid item className="get-started">
            <Button
              sx={{
                background: "black",
                fontFamily: "Work Sans",
                fontWeight: "bold",
                padding: "0.7rem 2rem",
                borderRadius: "2rem",
                fontSize: "1.2rem",
                marginTop: "1rem",
                "&:hover": {
                  backgroundColor: "black",
                },
                "@media (max-width: 500px)": {
                  fontSize: "1rem",
                },
              }}
              variant="contained"
              className="login"
            >
              Get started
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Landing;
