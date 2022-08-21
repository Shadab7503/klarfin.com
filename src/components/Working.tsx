import "../styles/styles.css";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import RequestPageIcon from "@mui/icons-material/RequestPage";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import SavingsIcon from "@mui/icons-material/Savings";
import Paper from "@mui/material/Paper";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import working from "../images/working.jpg";

const Working = () => {
  return (
    <div className="working">
      <h1 className="how">How It Works?</h1>
      <Grid container alignItems="center" justifyContent="center">
        <Grid item sm={6}>
          <Grid
            container
            justifyContent="center"
            direction="column"
            alignItems="center"
          >
            <h1 className="working1 section-heading">Sync your data</h1>
            <h1 className="working2">
              Integrate your accounting software, banks and other tools with
              Klarfin
            </h1>
            <List>
              <Paper elevation={3} className="working-points">
                <ListItem>
                  <ListItemIcon>
                    <RequestPageIcon
                      style={{ fontSize: "3rem", color: "#10884d" }}
                    />
                  </ListItemIcon>
                  <h1 className="listItem">Monitor Cash Flows </h1>
                </ListItem>
              </Paper>
              <Paper elevation={3} className="working-points">
                <ListItem>
                  <ListItemIcon>
                    <TrendingUpIcon
                      style={{ fontSize: "3rem" }}
                      color="primary"
                    />
                  </ListItemIcon>
                  <h1 className="listItem">Forecast Cash Flows</h1>
                </ListItem>
              </Paper>
              <Paper elevation={3} className="working-points">
                <ListItem>
                  <ListItemIcon>
                    <SavingsIcon
                      style={{ fontSize: "3rem", color: "#f2adbd" }}
                    />
                  </ListItemIcon>
                  <h1 className="listItem">
                    Track, prioritize and control every spend
                  </h1>
                </ListItem>
              </Paper>
              <Paper elevation={3} className="working-points">
                <ListItem>
                  <ListItemIcon>
                    <AccountBalanceWalletIcon
                      style={{ fontSize: "3rem", color: "#002B5B" }}
                    />
                  </ListItemIcon>
                  <h1 className="listItem">Get Instant Credit</h1>
                </ListItem>
              </Paper>
            </List>
          </Grid>
        </Grid>
        <Grid item sm={6}>
          <img
            src={working}
            className="working-image"
            alt="Business growth"
          ></img>
        </Grid>
      </Grid>
    </div>
  );
};

export default Working;
