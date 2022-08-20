import "../styles/styles.css";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const Mission = () => {
  return (
    <div className="mission">
      <Grid container alignItems="center" justifyContent="space-around">
        <Grid item lg={4} md={4}>
          <h1 className="about-heading">About Us</h1>
        </Grid>
        <Grid item lg={4} md={6} className="mission-text">
          Our mission is to boost or improve the cash flows of fast growing SMEs
          & Startups by providing them with
          <List>
            <ListItem style={{ padding: "0rem" }}>
              <ListItemIcon>
                <ArrowForwardIosIcon className="mission-points-icon" />
              </ListItemIcon>
              <h1 className="mission-points">
                Instant credit at critical moments
              </h1>
            </ListItem>
            <ListItem style={{ padding: "0rem" }}>
              <ListItemIcon>
                <ArrowForwardIosIcon className="mission-points-icon" />
              </ListItemIcon>
              <h1 className="mission-points">
                A single window to stay on top of their cash flow using
                budgeting, spend management & collection management tools.
              </h1>
            </ListItem>
          </List>
        </Grid>
      </Grid>
    </div>
  );
};

export default Mission;
