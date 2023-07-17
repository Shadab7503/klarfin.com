import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import MenuIcon from "@mui/icons-material/Menu";
import { TopBarProps } from "../../utils/interface";
import company from "../../images/company-logo.png";
import settings from "../../images/settings.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import Home from "../Main/Home/Home";
import Investment from "../SuperAdmin/Investment";


const TopBar = (props: TopBarProps) => {
  const navigate = useNavigate();
  const location = useLocation()
  return (
    <Grid
      container
      justifyContent="space-between"
      className="topbar"
      alignItems="center"
    >
      <Grid item xl={2} lg={3} sm={4} xs={6}>
        <Grid container alignItems="center" justifyContent="space-evenly">
          <Grid item>
            <Grid container alignItems="center">
              { (location.pathname !== '/dashboardAdmin/investing')&&<Button variant="contained" onClick={() => {
                navigate(`/dashboardAdmin/investing`)
              }} >HOME</Button>}
            </Grid>
          </Grid>
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
            // onClick={() => props.setSelectedItem("Settings")}
            >

              <Link to='/dashboardAdmin/settings' >
                <img src={settings} alt="settings" />
              </Link>

            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default TopBar;
