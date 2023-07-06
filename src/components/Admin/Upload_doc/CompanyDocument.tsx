import React, {useState} from "react";
import axios from "axios";
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

function CompanyDocument({accessToken, handleNext, user,capturedData}) {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isFailure, setIsFailure] = useState(false);
  const [message, setMessage] = useState("");
  const [comp_pancard,setComp_Pancard] = useState<any>(null)
  const [certificate_incorporation,setcertificate_incorporation] = useState<any>(null)
  const [article_association,setarticle_association] = useState<any>(null)
  const [memorandum_association,setmemorandum_association] = useState<any>(null)
  const [balancesheet21,setbalancesheet21] = useState<any>(null)
  const [balancesheet22,setbalancesheet22] = useState<any>(null)
  const [cancel_cheque,setcancel_cheque] = useState<any>([]); 

  const fileChangeHandler = event => {
    const {name} = event.target;
    if (name == "comp_pancard") {
      setComp_Pancard(event.target.files[0]);
    } else if (name == "certificate_incorporation") {
      setcertificate_incorporation(event.target.files[0]);
    }else if (name == "article_association") {
      setarticle_association(event.target.files[0]);
    }else if (name == "memorandum_association") {
      setmemorandum_association(event.target.files[0]);
    }else if (name == "balancesheet21") {
      setbalancesheet21(event.target.files[0]);
    }else if (name == "balancesheet22") {
      setbalancesheet22(event.target.files[0]);
    }
    else if (name == "cancel_cheque") {
      setcancel_cheque(event.target.files[0]);
    }
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("balancesheet21",balancesheet21)
    formData.append("balancesheet22",balancesheet22)
    formData.append("memorandum_association",memorandum_association)
    formData.append("article_association",article_association)
    formData.append("certificate_incorporation",certificate_incorporation)
    formData.append("comp_pancard",comp_pancard)
    formData.append("cancel_cheque",cancel_cheque)
    setIsLoading(true);
    axios
      .post(
        `${process.env.REACT_APP_BACKEND_HOST}v1/user/investment/companydocs`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': `multipart/form-data`
          },
          params:{id : capturedData}
        }
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
    <Card sx={{maxWidth: 600, margin: "0 auto"}}>
      <CardContent>
        <form onSubmit={handleSubmit} style={{width: "100%"}}>
          <Typography variant="subtitle1">Company Related Documents</Typography>
          <TextField
            label="Upload Company Pan Card"
            onChange={fileChangeHandler}
            name="comp_pancard"
            type="file"
            required
            variant="outlined"
            hidden
            focused
            margin="normal"
            fullWidth
          ></TextField>
          <TextField
            label="Upload Certificate of Incorporation"
            onChange={fileChangeHandler}
            name="certificate_incorporation"
            type="file"
            required
            variant="outlined"
            hidden
            focused
            margin="normal"
            fullWidth
          ></TextField>
          <TextField
            label="Upload Articles of Association"
            onChange={fileChangeHandler}
            name="article_association"
            type="file"
            required
            variant="outlined"
            hidden
            focused
            margin="normal"
            fullWidth
          ></TextField>
          <TextField
            label="Upload Memorandum of Association"
            onChange={fileChangeHandler}
            name="memorandum_association"
            type="file"
            required
            variant="outlined"
            hidden
            focused
            margin="normal"
            fullWidth
          ></TextField>
          <TextField
            label="Upload Balance Sheet & P&L for FY'21"
            onChange={fileChangeHandler}
            name="balancesheet21"
            type="file"
            required
            variant="outlined"
            hidden
            focused
            margin="normal"
            fullWidth
          ></TextField>
          <TextField
            label="Upload Balance Sheet & P&L for FY'22"
            onChange={fileChangeHandler}
            name="balancesheet22"
            type="file"
            required
            variant="outlined"
            hidden
            focused
            margin="normal"
            fullWidth
          ></TextField>
          <TextField
            label="Upload Cancelled Cheque"
            onChange={fileChangeHandler}
            name="cancel_cheque"
            type="file"
            required
            variant="outlined"
            hidden
            focused
            margin="normal"
            fullWidth
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
              "Submit"
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
  );
}

export default CompanyDocument;
