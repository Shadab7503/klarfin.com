import React, {useEffect, useState} from "react";
import axios from "axios";
import {DataGrid} from "@mui/x-data-grid";
import {
  TextField,
  Button,
  CircularProgress,
  Snackbar,
  Alert,
  Card,
  CardContent,
  Typography,
  MenuItem,
} from "@mui/material";

function ListShareHolders({accessToken, handleNext, user, capturedData}) {
  const [validationErrors, setValidationErrors] = useState<any>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isFailure, setIsFailure] = useState(false);
  const [message, setMessage] = useState("");
  const [shareholder, setShareholders] = useState([{}]);
  const [formData, SetFormData] = useState({
    name: "",
    no_share_held: "",
    percentage_holding: "",
    pancard: "",
  });

  const [columns, setColumns] = useState([
    {field: "id", headerName: "ID", width: 80},
    {field: "name", headerName: "Name of Shareholder", width: 240},
    {field: "no_share_held", headerName: "No. of Shares Held", width: 240},
    {
      field: "percentage_holding",
      headerName: "Percentage Shareholding",
      width: 240,
    },
    {field: "pancard", headerName: "Pan Number", width: 200},
  ]);

  const handleChange = event => {
    const {name, value} = event.target;
    SetFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const AddShareHolderHandler = (event: any) => {
    event.preventDefault();
    shareholder.push(formData);
    setShareholders(shareholder);
    SetFormData({
      name: "",
      no_share_held: "",
      percentage_holding: "",
      pancard: "",
    });
  };

  const handleSubmit = async (event: any) => {
    console.log("submit clicked");
    event.preventDefault();
    console.log("captureData : ",capturedData)
    setIsLoading(true);
    axios
      .post(
        `${process.env.REACT_APP_BACKEND_HOST}v1/user/investment/shareholders`,
        {data:shareholder.slice(1),id:capturedData},
        {
          headers: {Authorization: `Bearer ${accessToken}`},
        },
      )
      .then(res => {
        const {data} = res;
        if (!data.succ) {
          setIsLoading(false);
          setIsFailure(true);
          setMessage(data.message);
          return;
        }
        setIsLoading(false);
        setIsSuccess(true);
        setMessage(data.message);
        setTimeout(() => {
          handleNext();
        }, 2000);
      })
      .catch(error => {
        setIsLoading(false);
        setIsFailure(true);
        setMessage(error);
        return;
      });
  };

  return (
    <>
      <Card sx={{maxWidth: 600, margin: "0 auto"}}>
        <CardContent>
          <form onSubmit={AddShareHolderHandler} style={{width: "100%"}}>
            <Typography variant="subtitle1">Details of Company</Typography>
            <TextField
              label="Name of Shareholder"
              onChange={handleChange}
              value={formData.name}
              name="name"
              required
              variant="outlined"
              margin="normal"
              fullWidth
              error={!!validationErrors.Name} // Check if the field has an error
              helperText={validationErrors.Name} /// Display the error message
            />
            <TextField
              label="Number of Shares Held"
              onChange={handleChange}
              value={formData.no_share_held}
              name="no_share_held"
              required
              type="Number"
              variant="outlined"
              margin="normal"
              fullWidth
              error={!!validationErrors.Number} // Check if the field has an error
              helperText={validationErrors.Number} // Display the error message
            />

            <TextField
              label="Percentage Shareholding"
              onChange={handleChange}
              name="percentage_holding"
              required
              type="Number"
              value={formData.percentage_holding}
              variant="outlined"
              margin="normal"
              fullWidth
              error={!!validationErrors.Dob} // Check if the field has an error
              helperText={validationErrors.Dob} // Display the error message
            ></TextField>
            <TextField
              label="Pancard Number"
              onChange={handleChange}
              name="pancard"
              value={formData.pancard}
              required
              variant="outlined"
              inputProps={{pattern: "[A-Za-z]{5}[0-9]{4}[A-Za-z]{1}"}}
              margin="normal"
              fullWidth
              error={!!validationErrors.pan} // Check if the field has an error
              helperText={validationErrors.pan} // Display the error message
            ></TextField>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              disabled={isLoading}
              fullWidth
              sx={{marginTop: 2}}
            >
              {isLoading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "ADD SHAREHOLDERS"
              )}
            </Button>
          </form>
        </CardContent>
        <Snackbar
          open={isSuccess}
          autoHideDuration={3000}
          onClose={() => setIsSuccess(false)}
          message=""
          sx={{marginBottom: 2}}
        >
          <Alert severity="success" sx={{width: "100%"}} className="snack">
            {message.length > 1 ? message : "File is uploading..."}
          </Alert>
        </Snackbar>

        <Snackbar
          open={isFailure}
          autoHideDuration={3000}
          onClose={() => setIsFailure(false)}
          sx={{marginBottom: 2}}
        >
          <Alert severity="error" sx={{width: "100%"}} className="snack">
            Failed to Upload File !!!
          </Alert>
        </Snackbar>
      </Card>
      {shareholder.length > 1 && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "60vh",
            width: "100%",
          }}
        >
          <Card
            style={{
              display: "flex",
              alignContent: "center",
              justifyContent: "center",
              height: "40vh",
              width: "80%",
            }}
          >
            <form
              style={{
                display: "flex",
                alignContent: "center",
                justifyContent: "center",
                flexDirection: "row",
                width: "100%",
              }}
            >
              <DataGrid
                rows={shareholder.slice(1).map((each: any, idx: number) => {
                  return {...each, id: idx + 1};
                })}
                columns={columns.map(each => {
                  return {...each};
                })}
                hideFooterPagination
                hideFooterSelectedRowCount
              />
            </form>
          </Card>
          {shareholder.length>2 && <Button
            variant="contained"
            color="primary"
            type="submit"
            disabled={isLoading}
            sx={{marginTop: 2}}
            onClick={handleSubmit}
          >
            {isLoading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "SUBMIT"
            )}
          </Button>}
        </div>
      )}
    </>
  );
}

export default ListShareHolders;
