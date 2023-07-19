import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import ReactTypingEffect from "react-typing-effect";

const Landing = () => {
  return (
    <Grid container className="landing" justifyContent="center">
      <Grid item xl={9} xs={11.5}>
        <Grid
          container
          direction="column"
          justifyContent="center"
          height="100%"
        >
          <Grid item className="heading1">
            <span>
              For CXOs of Growing{" "}
              <ReactTypingEffect
                text={["SMBs", "Startups"]}
                speed={200}
                typingDelay={1000}
                eraseDelay={3000}
                displayTextRenderer={(text, i) => {
                  return (
                    <span
                      style={{
                        color: "#16213E",
                        fontFamily: "Montserrat",
                        fontWeight: 600,
                      }}
                    >
                      {text.split("").map((char, i) => {
                        const key = `${i}`;
                        return <span key={key}>{char}</span>;
                      })}
                    </span>
                  );
                }}
              />
            </span>
          </Grid>
          <Grid item className="heading2">
            <span>Give Boost to your Cash Flows with </span>
          </Grid>
          <Grid item className="heading2">
            <span>Klarfin’s Cash Management & Credit Platform</span>
          </Grid>
          <Grid item className="get-started">
            <a href="/register">
              <Button
                sx={{
                  background: "#231955",
                  fontFamily: "Work Sans",
                  fontWeight: "bold",
                  padding: "0.7rem 2rem",
                  borderRadius: "2rem",
                  fontSize: "1.5rem",
                  marginTop: "1rem",
                  "&:hover": {
                    backgroundColor: "#231955",
                  },
                  "@media (max-width: 500px)": {
                    fontSize: "1rem",
                  },
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
    </Grid>
  );
};

export default Landing;
