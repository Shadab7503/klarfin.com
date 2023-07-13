import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Loading from "../Dashboard/Loading";
import Snackbar from "@mui/material/Snackbar";
import { Alert } from "../../utils/components";
import axios from "axios";
import { Admin, AdminColumn, StringDict } from "../../utils/interface";

function Users(props:any) {

    const {accessToken,setIsLoggedIn}  = props;

    const [unapprovedAdmins, setUnApprovedAdmins] = useState<Admin[]>([]);
    const [approvedEmails, setApprovedEmails] = useState<StringDict>({});
    const [approving, setApproving] = useState<string>("");
  
    const columns: AdminColumn[] = [
      { field: "apiKey", headerName: "API Key" },
      { field: "companyName", headerName: "Company Name" },
      { field: "email", headerName: "Email" },
      { field: "isEmailVerified", headerName: "Email Verification" },
      { field: "mobileNumber", headerName: "Mobile Number" },
      { field: "panNumber", headerName: "PAN Number" },
      { field: "isAdminApproved", headerName: "Approval" },
    ];
    
  const handleSnackClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setApproving("");
  };


  const adminDelete = (id: string) => {
    setApproving("loading");
    var config = {
      method: "post",
      url: `${process.env.REACT_APP_BACKEND_HOST}v1/super/delete/${id}`,
      headers: {
        Authorization: "Bearer " + accessToken,
      },
      data: {},
    };
    axios(config)
      .then((response) => {
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        setApproving("error");
      });
  };



  const adminAction = (id: string, email: string,approve:boolean=true) => {
    setApproving("loading");
    var config = {
      method: "post",
      url: `${process.env.REACT_APP_BACKEND_HOST}v1/super/update/${id}`,
      headers: {
        Authorization: "Bearer " + accessToken,
      },
      data: {
        isAdminApproved: approve,
      },
    };
    axios(config)
      .then((response) => {
        if (
          "message" in response.data &&
          response.data.message === "Admin successfully approved"
        ) {
          // setApprovedEmails({ ...approvedEmails, [email]: 1 });
          getAdmins();

        } else if (
          "success" in response.data &&
          response.data.success === false
        ) {
          localStorage.removeItem("superTokens");
          window.location.href = "/loginSuper";
        } else {
          console.log(response.data);
          setApproving("error");
        }
      })
      .catch((err) => {
        console.log(err);
        setApproving("error");
      });
  };

  const processData = (id: string) => {
    setApproving("loading");
    var config = {
      method: "post",
      url: `${process.env.REACT_APP_BACKEND_HOST}v1/admin/processData/start/${id}`,
      headers: {
        Authorization: "Bearer " + accessToken,
      }
    };
    axios(config)
      .then((response) => {
        getAdmins();
      })
      .catch((err) => {
        console.log(err);
        setApproving("error");
      });
  };


  const getAdmins = ()=>{
    if (accessToken) {
      axios
        .get(
          process.env.REACT_APP_BACKEND_HOST + "v1/super/get-all-un-approved",
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        )
        .then((response) => {
          if (
            "message" in response.data &&
            response.data.message === "UnApproved Admin"
          ) {
            setUnApprovedAdmins([...response.data.admin]);
            setIsLoggedIn(true);
          } else {
            localStorage.removeItem("superTokens");
            window.location.href = "/loginSuper";
          }
          setApproving("");

        })
        .catch((err) => {
          console.log(err);
          localStorage.removeItem("superTokens");
          window.location.href = "/loginSuper";
        });
    } 
  }

  useEffect(() => {
    getAdmins();
  }, [accessToken]);
  return (
    <Grid container justifyContent="center">
    <Grid item style={{width:'100%'}} >
      {approving === "loading" ? <Loading /> : null}
      <TableContainer className="custom-scrollbar">
        <Table
          sx={{
            borderCollapse: "separate",
          }}
        >
          <TableHead>
            <TableRow className="receivables-header">
              {columns.map((column) => {
                return (
                  <TableCell
                    key={column.headerName}
                    align="center"
                    className="receivables-column-header"
                  >
                    {column.headerName}
                  </TableCell>
                );
              })}
              {/* <TableCell
                align="center"
                className="receivables-column-header"
                style={{ minWidth: "120px" }}
              >
                Process Data
              </TableCell> */}
              <TableCell
                align="center"
                className="receivables-column-header"
                style={{ minWidth: "120px" }}
              >
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {unapprovedAdmins?.map((row, index: number) => (
              <TableRow key={`${index}_row`}>
                {columns.map((column, colIndex: number) => (
                  <TableCell
                    key={`${index}_${colIndex}_col`}
                    className="receivables-row-value"
                    align="center"
                  >
                    { column.field == 'isEmailVerified' ? (row[column.field] ? 'Verified' : 'Unverified') : row[column.field] }
                    { column.field == 'isAdminApproved' ? (row[column.field] ? 'Approved' : 'UnApproved') : null }
                  </TableCell>
                ))}
                <TableCell align="center" >
                  
                  <div style={{display:'flex',alignItems:'center'}} >

                 

                  {

                  row['isAdminApproved']  ? 

                        <Grid
                          item
                          className="bills-pay"
                          py={1}
                          px={2}
                          onClick={() => adminAction(row["id"], row["email"],false)}
                          style={{
                            background:'#e93447'
                          }}
                        >
                          UnApprove
                        </Grid>

                      : <Grid container justifyContent="center">
                    <Grid
                      item
                      className="bills-pay"
                      py={1}
                      px={2}
                      onClick={() => adminAction(row["id"], row["email"])}
                      style={{
                        background:
                          row["email"] in approvedEmails
                            ? "#54B435"
                            : "#30a8d8",
                      }}
                    >
                      {row["email"] in approvedEmails
                        ? "Approved"
                        : "Approve"}
                    </Grid>

                  </Grid>
                  }
                  {

                  row['dataProcessed'] && !row['dataProcessing'] &&   (
                        <Grid
                          item
                          className="bills-pay"
                          py={1}
                          px={2}
                          mx={3}
                          onClick={() => processData(row["id"])}
                        
                        >
                          Processe Again
                        </Grid>

                  )

                  }

                  {
                      row['dataProcessing'] && <Grid container justifyContent="center">
                      <Grid
                        item
                        className="bills-pay"
                        py={1}
                        px={2}
                        onClick={() => {}}
                      >
                        Please Wait...
                      </Grid>

                    </Grid>
                  }

                  {
                      !row['dataProcessing'] && !row['dataProcessed'] && <Grid container justifyContent="center">
                      <Grid
                        item
                        className="bills-pay"
                        py={1}
                        px={2}
                        onClick={() => processData(row["id"])}
                      >
                        Process Now
                      </Grid>

                    </Grid>
                  }
                   <Grid
                      item
                      className="bills-pay"
                      py={1}
                      px={2}
                      onClick={() => window.confirm('Delete user?') && adminDelete(row["id"])}
                      style={{
                        background:'#e93447',
                        marginLeft:'1rem'
                      }}
                    >
                      Delete
                    </Grid>
                    </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Snackbar
        open={approving === "error"}
        autoHideDuration={6000}
        onClose={handleSnackClose}
      >
        <Alert
          onClose={handleSnackClose}
          severity="error"
          sx={{ width: "100%" }}
          className="snack"
        >
          Error: Failed to Approve
        </Alert>
      </Snackbar>
    </Grid>
  </Grid>
  )
}

export default Users