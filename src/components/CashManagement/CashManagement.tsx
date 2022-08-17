import "./CashManagement.css";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import CheckIcon from "@mui/icons-material/Check";

const CashManagement = () => {
  return (
    <div className="cash-management">
      <h1 className="cash-management-heading section-heading">
        Cash Management
      </h1>
      <Grid container justifyContent="center" alignItems="center">
        <Grid item lg={5} md={6}>
          <List>
            <ListItem>
              <ListItemIcon>
                <KeyboardDoubleArrowRightIcon className="points-icon" />
              </ListItemIcon>
              <h1 className="cash-management-points">
                Access 360&#176; insights into your Cashflow positions
              </h1>
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <KeyboardDoubleArrowRightIcon className="points-icon" />
              </ListItemIcon>
              <h1 className="cash-management-points">
                Easily forecast your Cash flows under different scenarios
              </h1>
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <KeyboardDoubleArrowRightIcon className="points-icon" />
              </ListItemIcon>
              <h1 className="cash-management-points">
                Check you payables & receivables
              </h1>
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <KeyboardDoubleArrowRightIcon className="points-icon" />
              </ListItemIcon>
              <h1 className="cash-management-points">
                Track & control every spend
              </h1>
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <KeyboardDoubleArrowRightIcon className="points-icon" />
              </ListItemIcon>
              <h1 className="cash-management-points">
                Send payment reminders to customers through email, whatsapp &
                keep track of outstanding invoice
              </h1>
            </ListItem>
          </List>
        </Grid>
        <Grid item lg={5} md={6}>
          <List>
            <ListItem>
              <ListItemIcon>
                <CheckIcon className="points-icon2" />
              </ListItemIcon>
              <h1 className="cash-management-points2">
                Made for CEOs, CFOs & CXOs
              </h1>
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CheckIcon className="points-icon2" />
              </ListItemIcon>
              <h1 className="cash-management-points2">
                Used for making strategic decisions
              </h1>
            </ListItem>
          </List>
        </Grid>
      </Grid>
    </div>
  );
};

export default CashManagement;
