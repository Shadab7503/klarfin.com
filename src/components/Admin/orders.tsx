import {Button, Grid, Tab, Tabs} from "@mui/material";
import {DataGrid} from "@mui/x-data-grid";
import axios from "axios";
import {useEffect, useState} from "react";
import Loading from "../Dashboard/Loading";
import {Link, useParams} from "react-router-dom";
import SearchBar from "./searchBar";
import {format, formatISO} from "date-fns";
import Scheme from "./Scheme";
import Popup from "./model";
import moment from "moment";

export default function Orders(props: any) {
  const [showRedeem, setShowRedeem] = useState(false);
  const [tranx, setTranx] = useState([]);
  const [refno, setRefno] = useState();
  const [popup, setPopup] = useState(false);
  const {folio_id} = useParams();
  const [investmentList, setInvestmentList] = useState([]);
  
  const today = new Date();
  const [date,setDate] = useState(format(today, 'MM/dd/yyyy'))
  const [filter, setFilter] = useState({
    plan: "IG",
    scheme: "LF",
    date: date,
  });

  function convertToISOString(dateString) {
    const formattedDate = moment(dateString, 'MM/DD/YYYY').format('YYYY-MM-DD[T]00:00:00');
    return formattedDate;
  }
  function incrementOneDay(dateString) {
    const formattedDate = moment(dateString, 'MM/DD/YYYY').add(1, 'day').format('MM/DD/YYYY');
    return formattedDate;
  }
  
  const [columnsRedeem, setColumnsRedeem] = useState([
    {field: "id", headerName: "Id", width: 180},
    {field: "scheme", headerName: "Scheme", width: 180},
    {field: "UnitAmtValue", headerName: "UnitAmtValue", width: 180},
    {field: "createdAt", headerName: "Created At", width: 230},
    {field: "fund", headerName: "Fund", width: 180},
    {field: "acno", headerName: "Acno", width: 180},
    {field: "plan", headerName: "Plan", width: 180},
    {field: "options", headerName: "Options", width: 180},
    {field: "RedFlag", headerName: "RedFlag", width: 180},
    {field: "UnitamtFlag", headerName: "UnitAmtFlag", width: 180},
    {field: "Tpin", headerName: "Tpin", width: 180},
    {field: "bank", headerName: "Bank", width: 180},
    {field: "oldihno", headerName: "Oldihno", width: 180},
    {field: "trdate", headerName: "Trdate", width: 180},
    {field: "entdate", headerName: "Entdate", width: 180},
    {field: "ShowInstaStatus", headerName: "ShowInstaStatus", width: 180},
    {field: "OTP", headerName: "OTP", width: 180},
    {field: "OTPReference", headerName: "OTPReference", width: 180},
    {field: "SelfValidate", headerName: "SelfValidate", width: 180},
    {field: "Return_code", headerName: "Return_code", width: 180},
    {field: "REFNO", headerName: "REFNO", width: 180},
    {field: "Date_Time", headerName: "Date_Time", width: 180},

    {
      field: "Actions",
      headerName: "action",
      width: 420,
      renderCell: (params: any) => {
        return (
          <div style={{display: "flex", justifyContent: "space-between"}}>
            <Grid
              item
              className="bills-pay"
              py={1}
              px={2}
              style={{marginRight: "1rem"}}
              onClick={() => {
                setRefno(params.row.REFNO);
                setPopup(true);
              }}
            >
              Check status
            </Grid>
          </div>
        );
      },
    },
  ]);

  const [columns, setColumns] = useState([
    {field: "id", headerName: "Id", width: 180},
    {field: "Scheme", headerName: "Scheme", width: 180},
    {field: "Amount", headerName: "Amount", width: 180},
    {field: "PayMode", headerName: "PayMode", width: 180},
    {field: "createdAt", headerName: "Date Time", width: 230},
    {field: "Fund", headerName: "Fund", width: 180},
    {field: "Plan", headerName: "Plan", width: 180},
    {field: "Options", headerName: "Options", width: 180},
    {field: "AcNo", headerName: "AcNo", width: 180},
    {field: "TrType", headerName: "TrType", width: 180},
    {field: "Agent", headerName: "Agent", width: 180},
    // { field: 'SubBroker', headerName: 'SubBroker', width: 180 },
    // { field: 'SubArnCode', headerName: 'SubArnCode', width: 180 },
    {field: "EUIN", headerName: "EUIN", width: 180},
    // { field: 'EUINDecFlag', headerName: 'EUINDecFlag', width: 180 },
    {field: "ChqBank", headerName: "ChqBank", width: 180},
    {field: "REFNO", headerName: "REFNO", width: 180},
  ]);
  
  const [loading, setLoading] = useState(false);

  const getReceivablesData = () => {
    setLoading(true);
    axios
      .get(`${process.env.REACT_APP_BACKEND_HOST}v1/user/investment/orders`, {
        headers: {Authorization: `Bearer ${props.accessToken}`},
        params: {
          folio: folio_id,
          fromDate:convertToISOString(filter.date),
          toDate: convertToISOString((incrementOneDay(filter.date))),
          plan:filter.plan,
          scheme:filter.scheme
        },
      })
      .then(({data}) => {
        setInvestmentList(data.orders);
        setLoading(false);
      });
  };

  const getTranxData = () => {
    console.log("Filter Redeems",filter);
    setLoading(true);
    axios
      .post(
        `${process.env.REACT_APP_BACKEND_HOST}v1/user/investment/redeems`,
        {
          acno: folio_id,
          plan: filter.plan,
          scheme: filter.scheme,
          trdate: filter.date,
        },
        {
          headers: {Authorization: `Bearer ${props.accessToken}`},
        }
      )
      .then(({data}) => {
        setTranx(data.redeem);
        setLoading(false);
      });
  };

  useEffect(() => {
    getTranxData();
    getReceivablesData();
  }, [filter]);

  const ShowHandler = () => {
    setShowRedeem(!showRedeem);
  };

  const filterHandler = data => {
    setFilter({...data});
  };
  return (
    <div>
  
      <Grid
        item
        xs={12}
        px={10}
        mt={5}
        sx={{maxWidth: "95vw", height: "100vh"}}
      >
        <div>
          <Button
            style={{marginRight: "2rem"}}
            variant="contained"
            color="primary"
            onClick={() => {}}
          >
            <Link to={`/dashboardAdmin/investment/tranx/${folio_id}`}>
              Transactions
            </Link>
          </Button>
        </div>
        <Popup
          handleClose={setPopup}
          accessToken={props.accessToken}
          isOpen={popup}
          refno={refno}
        ></Popup>
        <SearchBar filter={filter} filterDataHandler={filterHandler} setDate={setDate} />

        <Scheme
          folio_id={folio_id}
          filter={filter}
          accessToken={props.accessToken}
        />
        <div style={{marginBottom: "1rem"}}>
          <Button
            variant="contained"
            style={
              !showRedeem
                ? {backgroundColor: "#1976d2", marginRight: "2rem"}
                : {
                    backgroundColor: "white",
                    color: "black",
                    marginRight: "2rem",
                  }
            }
            onClick={ShowHandler}
          >
            Orders
          </Button>
          <Button
            variant="contained"
            style={
              showRedeem
                ? {backgroundColor: "#1976d2"}
                : {backgroundColor: "white", color: "black"}
            }
            onClick={ShowHandler}
          >
            Redeems
          </Button>
        </div>

        {showRedeem ? (
          <div style={{height: "100vh", width: "100%"}}>
            <DataGrid
              //hideFooter={true}
              rowsPerPageOptions={[50, 100, 1000]}
              rows={tranx.map((each: any, idx: number) => {
                console.log(each);
                return {...each, id: idx + 1};
              })}
              columns={columnsRedeem.map(each => {
                return {...each};
              })}
            />
          </div>
        ) : (
          <div style={{height: "100vh", width: "100%"}}>
            <DataGrid
              //hideFooter={true}
              rowsPerPageOptions={[50, 100, 1000]}
              rows={investmentList.map((each: any, idx: number) => {
                console.log(each);
                return {...each, id: idx + 1};
              })}
              columns={columns.map(each => {
                return {...each};
              })}
            />
          </div>
        )}
      </Grid>
    </div> 
  );
}
