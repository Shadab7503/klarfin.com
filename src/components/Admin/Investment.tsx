import { Grid } from "@mui/material";
import { DataGrid, GridCellEditStopParams, MuiEvent } from "@mui/x-data-grid";
import axios from "axios";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

import React, { useEffect, useState } from "react";
import Form from "./Form";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../Dashboard/Loading";

export default function Investment(props: any) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const navigate = useNavigate();

  const [investmentList, setInvestmentList] = useState([]);
  const [invtType,setInvtType] = useState(["Individual","Proprietorship","Partnership","Company"])
  const [statusOfinvestMentList, setstatusOfinvestMentList] = useState(1);

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
                    navigate(`/dashboardAdmin/add-investment/${params.id}`);
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
                    navigate(`/dashboardAdmin/order/${params.row.folio.Folio}`);
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
                      `/dashboardAdmin/investment/details/${params.row.folio.Folio}`
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
                      `/dashboardAdmin/redeem/${params.row.folio.Folio}`
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
            <span></span>
          </div>
        );
      },
    },
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
    console.log(investmentList);
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
          navigate(`/dashboardAdmin/add-investment`, { state: { status: 0 } });
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
            console.log("Object Data",obj);
            return {
              ...obj,
              id: each._id,
              idx: idx + 1,
              org: each.user_id.name,
              fund: each.fund_id.name,
              is_OTBM : each.is_OTBM,
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
  );
}
