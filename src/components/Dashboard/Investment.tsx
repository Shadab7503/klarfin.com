import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import { DataGrid } from "@mui/x-data-grid";
import Box from '@mui/material/Box';
import { Alert, Button, Grid, Modal, Snackbar, Table, TableBody, TableContainer, TableHead, TableRow } from '@mui/material';
import axios from 'axios';
import Loading from './Loading';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function InvestmentScreen(props) {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [statusOfinvestMentList, setstatusOfinvestMentList] = useState(1);
  const [investmentList, setInvestmentList] = useState([]);
  const [invtType, setInvtType] = useState(["Individual", "Proprietorship", "Partnership", "Company"])
  //Investment from superAdmin
  const [columns, setColumns] = useState([
    { field: "idx", headerName: "SN", width: 100 },
    { field: "org", headerName: "Name", width: 180 },
    { field: "type", headerName: "Investment For", width: 180 },
    //{ field: 'frequency', headerName: 'Frequency', width: 180 },
    // { field: 'amount', headerName: 'Amount of Investment', width: 180 },
    { field: "fund", headerName: "Fund", width: 180 },
    // { field: 'portfolio', headerName: 'Current Portfolio amount', width: 180 },
    // { field: 'returns', headerName: 'Return generated', type: 'number' },
    {
      field: "Actions",
      headerName: "action",
      width: 525,
      renderCell: (params: any) => {
        return (
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            {params.row.status >= 2 && (
              <>
                {" "}
                <Grid
                  item
                  className="bills-pay"
                  py={1}
                  px={2}
                  style={{ marginRight: "1rem" }}
                  onClick={() => {
                    navigate(`/dashboardSuper/add-investment/${params.id}`);
                  }}
                >
                  Edit
                </Grid>
                <Grid
                  item
                  className="bills-pay"
                  py={1}
                  px={2}
                  style={{ background: "green", marginRight: "1rem" }}
                  onClick={() => {
                    navigate(`/dashboardSuper/order/${params.row.folio.Folio}`);
                  }}
                >
                  Create Order
                </Grid>
                <Grid
                  item
                  className="bills-pay"
                  py={1}
                  px={2}
                  style={{ background: "orange", marginRight: "1rem" }}
                  onClick={() => {
                    navigate(
                      `/dashboardSuper/investment/details/${params.row.folio.Folio}`
                    );
                  }}
                >
                  View
                </Grid>
                <Grid
                  item
                  className="bills-pay"
                  py={1}
                  px={2}
                  style={{ marginRight: "1rem" }}
                  onClick={() => {
                    navigate(
                      `/dashboardSuper/redeem/${params.row.folio.Folio}`
                    );
                  }}
                >
                  Redeem
                </Grid>
                {params.row.is_OTBM == 0 && <>
                  <Grid
                    item
                    className="bills-pay"
                    py={1}
                    px={2}
                    style={{ background: "orange", marginRight: "1rem" }}
                    onClick={() => {
                      navigate(`/dashboardSuper/add-investment`, {
                        state: params.row,
                      });
                    }}
                  >
                    OBTM
                  </Grid>
                </>}
              </>
            )}

            {params.row.status == 1 && (
              <>
                <Grid
                  item
                  className="bills-pay"
                  py={1}
                  px={2}
                  style={{ marginRight: "1rem" }}
                  onClick={() => {
                    navigate(`/dashboardSuper/add-investment`, {
                      state: params.row,
                    });
                  }}
                >
                  Continue
                </Grid>
              </>
            )}
          </div>
        );
      },
    },
  ]);
  const [loading, setLoading] = useState(false);
  //previous code
  const getData = async () => {

    setLoading(true);

    const [investmentRes, promoterRes] = await Promise.all([

      axios
        .get(process.env.REACT_APP_BACKEND_HOST + "v1/user/investment/index",

          {
            headers: { Authorization: `Bearer ${props.accessToken}` },
            params: { type: 0 }
          }),
      axios
        .get(process.env.REACT_APP_BACKEND_HOST + "v1/user/investment/index",

          {
            headers: { Authorization: `Bearer ${props.accessToken}` },
            params: { type: 1 }
          })

    ]);

    const investmentDataRes = investmentRes.data;
  }

  useEffect(() => {
    getData();
  }, []);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  if (loading) return <Loading />;
  return (
    <div style={{ fontFamily: 'Montserrat' }}>
      <Grid
        item
        xs={12}
        px={10}
        mt={5}
        sx={{ maxWidth: "95vw", height: "100vh" }}
      >
        <Button
          type="submit"
          sx={{
            background: "#231955",
            fontFamily: "Work Sans",
            fontWeight: "bold",
            padding: "0.5rem 1rem",
            borderRadius: "2rem",
            fontSize: "0.8rem",
            color: "#fff",
            "&:hover": {
              backgroundColor: "#231955",
            },
          }}
          onClick={() => {
            navigate(`/dashboardSuper/add-investment`, { state: { status: 0 } });
          }}
        >
          Add Investor
        </Button>

        <h2 style={{ marginBottom: "20px" }}>All Investments</h2>

        <div style={{ height: "100vh", width: "100%" }}>
          <DataGrid
            //  hideFooter={true}
            rowsPerPageOptions={[50, 100, 1000]}

            rows={investmentList.map((each: any, idx: number) => {
              // console.log(each);
              const obj = {};
              Object.keys(each).forEach((key) => {
                let value = each[key];
                if (key === "amount" || key === "portfolio" || key == "returns") {
                  value = value.toLocaleString("en-IN");
                }
                //  if(key=='status') setstatusOfinvestMentList(each[key])
                obj[key] = value;
              });
              return {
                ...obj,
                id: each._id,
                idx: idx + 1,
                org: each.user_id.name,
                fund: each.fund_id.name,
                is_OTBM: each.is_OTBM,
                status: each.status,
                type: invtType[each.type],
              };
            })}
            columns={columns.map((each) => {
              return { ...each };
            })}
          />
        </div>
      </Grid>
    </div>
  );
}