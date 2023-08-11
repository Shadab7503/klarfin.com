import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import MenuIcon from "@mui/icons-material/Menu";
import { TopBarProps } from "../../utils/interface";
import company from "../../images/company-logo.png";
import settings from "../../images/settings.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button, MenuItem, TextField } from "@mui/material";
import Home from "../Main/Home/Home";
import Investment from "../SuperAdmin/Investment";
import { useAppContext } from '../../Store/AppContext';
import { useState, useEffect } from "react";
import axios from "axios";
import Loading from "../Admin/Loading";


const TopBar = ({ accessToken, companyName }) => {
  const [storeState, dispatch] = useAppContext();
  const [defaultInvestor, setDefaultInvestor] = useState({});
  const [defaultUser, setDefaultUser] = useState({})
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation()

  const getReceivablesData = async (filter: { page: number; limit: number }) => {
    setLoading(true);
    const { page, limit } = filter;
    await axios
      .get(`${process.env.REACT_APP_BACKEND_HOST}v1/user/investment/invest`, {
        headers: { Authorization: `Bearer ${accessToken}` },
        params: {
          limit,
          page,
        },
      })
      .then(({ data }) => {
        const Data = data.investments.filter((ele)=>ele.fundType === "Various funds through NSE");
        console.log("Data ",Data)
        dispatch({ type: "SET_INVESTORS", payload: Data})
        dispatch({ type: "SET_ACTIVE_INVESTORS", payload: Data[0] })
        setDefaultInvestor(Data[0])
        setLoading(false);
      });
  };

  const HandlerChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setDefaultInvestor(value)
    dispatch({ type: "SET_ACTIVE_INVESTORS", payload: value })
  }

  useEffect(() => {
    getReceivablesData({ page: 1, limit: 20 });
  }, []);
  

  if (loading) return <Loading />
  return (
    <Grid
      container
      justifyContent="space-between"
      className="topbar"
      alignItems="center"
      position="fixed"
      height="60px"
      width="82vw"
      display="flex"
    >
      <Grid item xl={2} lg={3} sm={4} xs={6}>
        <Grid container sx={{ ml: 4 }}>
          <Grid item>
            <Grid item >
              {(location.pathname !== '/dashboardAdmin/investing') && <Button variant="contained" onClick={() => {
                navigate(`/dashboardAdmin/investing`)
              }} >HOME</Button>}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xl={4} lg={5} sm={4} xs={6}>
        <Grid item sx={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-end", marginRight: "20px" }} >
          <Grid item sx={{ marginRight: "20px" }} >
            <Grid item>
              <Grid item >
                <Button variant="contained" sx={{ width: "100px" }} onClick={() => {
                  navigate(`/dashboardAdmin/nse/order/${storeState.ACTIVEINVETOR.folio.Folio}`, { state: { status: 0 } });
                }} >Invest</Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item sx={{ marginRight: "20px" }} >
            <Grid item>
              <Grid item >
                <Button variant="contained" sx={{ width: "150px" }} onClick={() => {
                  navigate(`/dashboardAdmin/add-investment`, { state: { status: 0 } });
                }} >Add Investor</Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item alignItems="center">
            <TextField
              name="investor"
              size="small"
              select
              onChange={HandlerChange}
              style={{ width: "300px" }}
              defaultChecked
              value={defaultInvestor}
            >
              {storeState.INVESTORS.map((ele, indx) => {
                return <MenuItem key={indx} value={ele} >{`${ele.user_id.companyName} (${ele.folio.TAX}) `}</MenuItem>
              })}
            </TextField>
          </Grid>
        </Grid>
        {/* <Grid item>
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
          </Grid> */}
      </Grid>
    </Grid >
  );
};

export default TopBar;
