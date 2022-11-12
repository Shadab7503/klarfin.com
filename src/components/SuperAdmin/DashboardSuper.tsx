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

const DashboardSuper = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [accessToken, setAccessToken] = useState<string>("");
  const [unapprovedAdmins, setUnApprovedAdmins] = useState<Admin[]>([]);
  const [approvedEmails, setApprovedEmails] = useState<StringDict>({});
  const [approving, setApproving] = useState<string>("");

  const columns: AdminColumn[] = [
    { field: "apiKey", headerName: "API Key" },
    { field: "companyName", headerName: "Company Name" },
    { field: "email", headerName: "Email" },
    { field: "mobileNumber", headerName: "Mobile Number" },
    { field: "panNumber", headerName: "PAN Number" },
  ];

  useEffect(() => {
    let tokens = localStorage.getItem("superTokens");
    try {
      if (tokens) {
        const tokensObj = JSON.parse(tokens);
        setAccessToken(tokensObj.accessToken);
      } else window.location.href = "/loginSuper";
    } catch (err) {
      localStorage.removeItem("superTokens");
      window.location.href = "/loginSuper";
    }
  }, []);

  useEffect(() => {
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
            setUnApprovedAdmins(response.data.admin);
            setIsLoggedIn(true);
          } else {
            localStorage.removeItem("superTokens");
            window.location.href = "/loginSuper";
          }
        })
        .catch((err) => {
          console.log(err);
          localStorage.removeItem("superTokens");
          window.location.href = "/loginSuper";
        });
    }
  }, [accessToken]);

  const handleSnackClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setApproving("");
  };

  const approveAdmin = (id: string, email: string) => {
    setApproving("loading");
    var config = {
      method: "post",
      url: "https://klarfin.pics2art.xyz//v1/super/update/" + id,
      headers: {
        Authorization: "Bearer " + accessToken,
      },
      data: {
        isAdminApproved: true,
      },
    };
    axios(config)
      .then((response) => {
        if (
          "message" in response.data &&
          response.data.message === "Admin successfully approved"
        ) {
          setApproving("");
          setApprovedEmails({ ...approvedEmails, [email]: 1 });
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

  if (isLoggedIn)
    return (
      <Grid container justifyContent="center">
        <Grid item lg={10} mt={5}>
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
                        {row[column.field]}
                      </TableCell>
                    ))}
                    <TableCell align="center">
                      <Grid container justifyContent="center">
                        <Grid
                          item
                          className="bills-pay"
                          py={1}
                          px={2}
                          onClick={() => approveAdmin(row["id"], row["email"])}
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
    );
  else return <Loading />;
};

export default DashboardSuper;
