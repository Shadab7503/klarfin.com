import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import MenuIcon from "@mui/icons-material/Menu";
import { TopBarProps } from "../../utils/interface";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import company from "../../images/company-logo.png";
import settings from "../../images/settings.png";

const TopBar = (props: TopBarProps) => {
  return (
    <Grid
      container
      justifyContent="space-between"
      className="topbar"
      alignItems="center"
    >
      <Grid item>
        <Grid container alignItems="center">
          <IconButton
            onClick={() => props.setDrawerOpen(true)}
            color="inherit"
            sx={{ display: { sm: "inline-block", md: "none" } }}
          >
            <MenuIcon style={{ fontSize: "1.8rem" }} />
          </IconButton>
        </Grid>
      </Grid>
      <Grid item xl={2} lg={3} sm={4} xs={6}>
        <Grid container alignItems="center" justifyContent="space-evenly">
          <Grid item>
            <Grid container alignItems="center">
              <img src={company} alt="company-logo" width="25px" />
              <span className="company-name">{props.companyName}</span>
            </Grid>
          </Grid>
          <Grid item>
            <Grid
              container
              alignItems="center"
              style={{ cursor: "pointer" }}
              onClick={() => props.setSelectedItem("Settings")}
            >
              <img src={settings} alt="settings" />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default TopBar;
