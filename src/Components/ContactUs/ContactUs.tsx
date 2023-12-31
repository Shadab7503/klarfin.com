import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Box, Typography } from "@mui/material";

interface form {
  name: string;
  email: string;
  phone: string;
  message: string;
}



const ContactUs = () => {
  const [formResponse, setFormResponse] = useState<form>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [validating, setValidating] = useState<boolean>(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setFormResponse({ ...formResponse, [name]: value });
  };

  const validateEmail = (email: string): boolean => {
    if (
      email
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
    )
      return false;
    return true;
  };

  const validatePhone = (phone: string): boolean => {
    if (phone.match(/^\d{10}$/)) return false;
    return true;
  };

  const handleSubmit = () => {
    setValidating(true);
    if (
      formResponse.name === "" ||
      validateEmail(formResponse.email) ||
      validatePhone(formResponse.phone) ||
      formResponse.message === ""
    )
      return;
    setValidating(false);
  };

  return (
    <Box sx={{display:"flex",flexDirection:"column",alignItems:"center",p:{xs:2,md:6}}}>
      <Typography sx={{fontSize:"1.5rem",fontWeight:"600"}} >Contact Us</Typography>
      <Grid container justifyContent="center">
        <Grid item lg={6} md={8} sm={9} xs={11} sx={{display:'flex',flexDirection:"column",gap:"1rem"}} >
          <InputLabel required >
            Name
          </InputLabel>
          <TextField
            value={formResponse.name}
            error={validating && formResponse.name === ""}
            helperText={
              validating && formResponse.name === ""
                ? "Field cannot be empty"
                : ""
            }
            FormHelperTextProps={{ style: { fontSize: "0.9rem" ,padding:"1rem"} }}
            fullWidth
            onChange={handleChange}
            name="name"
            variant="standard"
            sx={{ input: { fontWeight:"600" } }}
          ></TextField>
          <InputLabel required >
            Email
          </InputLabel>
          <TextField
            value={formResponse.email}
            error={validating && validateEmail(formResponse.email)}
            helperText={
              validating && validateEmail(formResponse.email)
                ? "Enter valid email address"
                : ""
            }
            FormHelperTextProps={{ style: { fontSize: "0.9rem" } }}
            fullWidth
            onChange={handleChange}
            name="email"
            variant="standard"
            className="contact-form-field"
            sx={{ input: {fontWeight:"600" } }}
          ></TextField>
          <InputLabel required >
            Phone
          </InputLabel>
          <TextField
            value={formResponse.phone}
            error={validating && validatePhone(formResponse.phone)}
            type="tel"
            helperText={
              validating && validatePhone(formResponse.phone)
                ? "Enter valid phone number"
                : ""
            }
            FormHelperTextProps={{ style: { fontSize: "0.9rem", } }}
            fullWidth
            onChange={handleChange}
            name="phone"
            variant="standard"
            className="contact-form-field"
            sx={{ input: { fontWeight:"600" } }}
          ></TextField>
          <InputLabel required sx={{fontWeight:"500"}}>
            Message
          </InputLabel>
          <TextField
            value={formResponse.message}
            error={validating && formResponse.message === ""}
            helperText={
              validating && formResponse.message === ""
                ? "Please enter a message"
                : ""
            }
            FormHelperTextProps={{ style: { fontSize: "0.9rem" } }}
            fullWidth
            onChange={handleChange}
            name="message"
            className="contact-form-field"
            inputProps={{ style: {fontWeight:"600" }}}
            multiline
            rows={3}
          ></TextField>
          <Button
            fullWidth
            sx={{
              background: "#3089d6",
              fontFamily: "Work Sans",
              fontWeight: "bold",
              margin: "1rem 0rem",
              color:"white",
              "&:hover": {
                backgroundColor: "#231955",
              },
              padding: "0.7rem 2rem",
            
            }}
            onClick={handleSubmit}
          >
            REQUEST DEMO{" "}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ContactUs;