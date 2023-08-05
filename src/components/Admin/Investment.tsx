import { Grid } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import Button from "@mui/material/Button";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../Dashboard/Loading";

export default function Investment(props: any) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();
  const [investmentList, setInvestmentList] = useState([]);
  const [invtType, setInvtType] = useState([{code:1,name:"Individual"},{code:2,name:"Proprietorship"},{code:3,name: "Partnership"},{code:4,name: "Company"}])
  const [statusOfinvestMentList, setstatusOfinvestMentList] = useState(1);
  const [Banks,setBanks] = useState({
    "HDF" : "HDFC Bank",
    "ICI" :"ICICI Bank",
    "IDB" :"IDBI Bank",
    "INB" :"Indian Bank",
    "SBI" :"State Bank of India"
  })
  
  const actionHandler = (type, id) => {
    setLoading(true);

    if (type == "delete") {
      axios
        .delete(`${process.env.REACT_APP_BACKEND_HOST}v1/user/investment`, {
          headers: { Authorization: `Bearer ${props.accessToken}` },
          data: {
            id: id,
          },
        })
        .then(({ data }) => {
          // setInvestmentList(data.investments);
          getReceivablesData({ page: 1, limit: 20 });

          setLoading(false);
        });
    }

    if (type == "edit") {
      axios
        .patch(
          `${process.env.REACT_APP_BACKEND_HOST}v1/user/investment`,
          {
            id: id,
          },
          {
            headers: { Authorization: `Bearer ${props.accessToken}` },
          }
        )
        .then(({ data }) => {
          // setInvestmentList(data.investments);
          setLoading(false);
        });
    }
  };

  const [columns, setColumns] = useState([
    {
      field: "idx", headerName: "SN", width: 80, renderHeader: () => (
        <strong>
          {'SN'}
        </strong>
      ),
    },
    {
      field: "org", headerName: "Name", width: 180,
      renderHeader: () => (
        <strong>
          {'Name'}
        </strong>
      ),
    },

    {
      field: "type", headerName: "Investment For", width: 180, renderHeader: () => (
        <strong>
          {'Investment For'}
        </strong>
      ),
    },
    //{ field: 'frequency', headerName: 'Frequency', width: 180 },
    // { field: 'amount', headerName: 'Amount of Investment', width: 180 },
    {
      field: "fund", headerName: "Fund", width: 220, renderHeader: () => (
        <strong>
          {'Fund'}
        </strong>
      ),
    },
    {
      field: 'bank', headerName: 'Bank', width: 180, renderHeader: () => (
        <strong>
          {'Bank'}
        </strong>
      ),
    },
    // { field: 'portfolio', headerName: 'Current Portfolio amount', width: 180 },
    // { field: 'returns', headerName: 'Return generated', type: 'number' },
    {
      field: "Actions",
      headerName: "Action",
      minWidth: 525,
      renderHeader: () => (
        <strong>
          {'Action'}
        </strong>
      ),
      renderCell: (params: any) => {
        return (
          <div style={{ display: "flex",minWidth:"100%"}}>
            {params.row.status >= 2 && (
              <>
                {/* <Grid
                  item
                  className="bills-pay"
                  py={1}
                  px={2}
                  style={{ marginRight: "1rem" }}
                  onClick={() => {
                    navigate(`/dashboardAdmin/add-investment/${params.id}`);
                  }}
                >
                  Edit
                </Grid> */}
                <Grid
                  item
                  className="bills-pay"
                  py={1}
                  px={2}
                  style={{ background: "green", marginRight: "1rem" }}
                  onClick={() => {
                    { params.row.fundType == "Various funds through NSE" ? navigate(`/dashboardAdmin/nse/order/${params.row.folio.Folio}`,{ state: params.row }):
                     navigate(`/dashboardAdmin/order/${params.row.folio.Folio}`,{ state: params.row });} 
                    // navigate(`/dashboardAdmin/order/${params.row.folio.Folio}`,
                    //   { state: params.row });
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
                    { params.row.fundType == "Various funds through NSE" ? navigate(`/dashboardAdmin/investment/nse/details/${params.row.folio.Folio}`):
                     navigate(`/dashboardAdmin/investment/details/${params.row.folio.Folio}`,);}                  
                    }}
                >
                  View Reports
                </Grid>
                <Grid
                  item
                  className="bills-pay"
                  py={1}
                  px={2}
                  style={{ marginRight: "1rem" }}
                  onClick={() => {
                    navigate(
                      `/dashboardAdmin/redeem/${params.row.folio.Folio}`,
                      { state: params.row }
                    );
                  }}
                >
                  Redeem
                </Grid>
                { params.row.is_OTBM == 0 && <>
                  <Grid
                    item
                    className="bills-pay"
                    py={1}
                    px={2}
                    style={{ background: "orange", marginRight: "1rem" }}
                    onClick={() => {
                      navigate(`/dashboardAdmin/add-investment`, {
                        state: params.row,
                      });
                    }}
                      >
                    Auto Debit
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
                    navigate(`/dashboardAdmin/add-investment`, {
                      state: params.row,
                    });
                  }}
                >
                  Continue
                </Grid>
              </>
            )}

            {/* <Grid
                        item
                        className="bills-pay"
                        style={{ background: 'red' }}
                        py={1}
                        px={2}
                        onClick={()=>{
                            if(!window.confirm('Are you sure to delete the investment?')) return;
                            actionHandler('delete',params.id)
                        }}

                    >
                        Delete
                    </Grid> */}
          </div>
        );
      },
    }
  ]);

  const [loading, setLoading] = useState(false);

  const getReceivablesData = (filter: { page: number; limit: number }) => {
    setLoading(true);
    const { page, limit } = filter;
    axios
      .get(`${process.env.REACT_APP_BACKEND_HOST}v1/user/investment/invest`, {
        headers: { Authorization: `Bearer ${props.accessToken}` },
        params: {
          limit,
          page,
        },
      })
      .then(({ data }) => {
        setInvestmentList(data.investments);
        setLoading(false);
      });
  };

  useEffect(() => {
    getReceivablesData({ page: 1, limit: 20 });
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
    <Grid
      item
      xs={12}
      px={10}
      mt={5}
      sx={{ minWidthidth: "100vw", height: "100vh" }}
    >
      {/* <Button
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
          navigate(`/dashboardAdmin/add-investment`, { state: { status: 0 } });
        }}
      >
        Add Investor
      </Button> */}
      <Grid container style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", width: "70vw", marginBottom: "10px", height: "60px" }} >
        <Grid item xs={6.8} >
          <h2 style={{
            fontFamily: "Work Sans",
            fontWeight: "bold",
            padding: "0.1rem 0.4rem",
            borderRadius: "0.5rem",
            fontSize: "1.4rem",
          }}>All Investments</h2>
        </Grid>
        <Grid xs={4.2} sx={{display:"flex" ,justifyContent:"space-between",p:0,mr:-1 }}>
          <Button
            type="submit"
            style={{ height: "45px" ,minWidth:"160px",marginRight:"20px" }}
            sx={{
              background: "#3088d6",
              fontFamily: "Work Sans",
              fontWeight: "bold",
              padding: "0.01rem 0.6rem",
              borderRadius: "0.5rem",
              fontSize: "0.8rem",
              color: "#fff",
              "&:hover": {
                backgroundColor: "#3caecd",
              },
            }}
            onClick={() => {
              navigate(`/dashboardAdmin/add-investment`, { state: { status: 0 } });
            }}
          >
            Add Investor
          </Button>
          <Button
            type="submit"
            style={{ display:"flex",height: "45px" ,minWidth:"165px" }}
            sx={{
              background: "#3088d6",
              fontFamily: "Work Sans",
              fontWeight: "bold",
              padding: "0.01rem 0.6rem",
              borderRadius: "0.5rem",
              fontSize: "0.8rem",
              color: "#fff",
              "&:hover": {
                backgroundColor: "#3caecd",
              },
            }}
            onClick={() => {
              navigate(`/dashboardAdmin/upload-doc`, { state: { status: 0 } });
            }}
          >
            Upload Documents
          </Button>
        </Grid>
      </Grid>

      <div style={{ height: "100vh", width: "100%" }}>
        <DataGrid
          //  hideFooter={true}
          rowsPerPageOptions={[50, 100, 1000]}

          rows={investmentList.map((each: any, idx: number) => {
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
              bank: Banks[each.BANK]?Banks[each.BANK]:each.BANK,
              status: each.status,
              type: invtType.filter((ele)=>ele.code == each.type)[0]?.name,
            };
          })}
          columns={columns.map((each) => {
            return {
              ...each,
              headerAlign: 'center',
              align: 'center',
              sx: {
                size: 2,
              },
            }
          })}
        />
      </div>
    </Grid>
  );
}
