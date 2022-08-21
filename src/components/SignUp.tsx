import { useState } from "react";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import signUpImage from "../images/signup-image.png";

const industries = [
  "Hospitality",
  "Education",
  "Agri",
  "Construction, Real Estate",
  "Health services",
  "Manufacturing",
  "Restaurant/Bars/Catering",
  "Retail - Primarily online",
  "Retail - Primarily offline",
  "Legal services",
  "Other",
  "Technology",
  "Media, Advertising, Entertainment",
  "Finance",
  "Transportation",
  "Health & wellness",
  "Consulting",
  "Logistics",
  "Fashion",
  "Ecommerce",
  "Travel",
];

interface user {
  name: string;
  company: string;
  pan: string;
  mobile: string;
  email: string;
  industry: string;
  password: string;
}

const SignUp = () => {
  const [newUser, setNewUser] = useState<user>({
    name: "",
    company: "",
    pan: "",
    mobile: "",
    email: "",
    industry: "",
    password: "",
  });

  const handleChange = (event: { target: { value: string; name: string } }) => {
    const { value, name } = event.target;
    if (name === "mobile" && value.length > 10) return;
    setNewUser({ ...newUser, [name]: value });
  };

  return (
    <div className="signup-page">
      <Grid container className="signup-container">
        <Grid item md={6}>
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            className="signup-container"
          >
            <Grid item xl={6} lg={8} md={10} sm={8} xs={10.5}>
              <Grid container py={5}>
                <Grid item xs={12}>
                  <div className="signup-heading">Sign Up</div>
                </Grid>
                <Grid item xs={12}>
                  <InputLabel className="form-label">Name</InputLabel>
                  <TextField
                    className="form-label"
                    placeholder="Name"
                    variant="outlined"
                    fullWidth
                    value={newUser.name}
                    name="name"
                    onChange={handleChange}
                    InputProps={{
                      style: {
                        fontSize: "0.9rem",
                      },
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root:hover": {
                        "& > fieldset": {
                          borderColor: "#186090",
                        },
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <InputLabel className="form-label">
                    Company/ Organisation Name
                  </InputLabel>
                  <TextField
                    className="form-label"
                    placeholder="example@gmail.com"
                    variant="outlined"
                    fullWidth
                    value={newUser.company}
                    name="company"
                    onChange={handleChange}
                    InputProps={{
                      style: {
                        fontSize: "0.9rem",
                      },
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root:hover": {
                        "& > fieldset": {
                          borderColor: "#186090",
                        },
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <InputLabel className="form-label">PAN</InputLabel>
                  <TextField
                    className="form-label"
                    placeholder="XXXXXXXXXX"
                    variant="outlined"
                    fullWidth
                    value={newUser.pan}
                    name="pan"
                    onChange={handleChange}
                    inputProps={{ maxLength: 10 }}
                    InputProps={{
                      style: {
                        fontSize: "0.9rem",
                      },
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root:hover": {
                        "& > fieldset": {
                          borderColor: "#186090",
                        },
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <InputLabel className="form-label">Mobile Number</InputLabel>
                  <TextField
                    className="form-label"
                    placeholder="XXXXXXXXXX"
                    variant="outlined"
                    fullWidth
                    type="number"
                    value={newUser.mobile}
                    name="mobile"
                    onChange={handleChange}
                    InputProps={{
                      style: {
                        fontSize: "0.9rem",
                      },
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root:hover": {
                        "& > fieldset": {
                          borderColor: "#186090",
                        },
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <InputLabel className="form-label">Work Email ID</InputLabel>
                  <TextField
                    className="form-label"
                    placeholder="example@gmail.com"
                    variant="outlined"
                    fullWidth
                    value={newUser.email}
                    name="email"
                    onChange={handleChange}
                    InputProps={{
                      style: {
                        fontSize: "0.9rem",
                      },
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root:hover": {
                        "& > fieldset": {
                          borderColor: "#186090",
                        },
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <InputLabel className="form-label">Industry</InputLabel>
                  <TextField
                    select
                    className="form-label"
                    variant="outlined"
                    fullWidth
                    value={newUser.industry}
                    name="industry"
                    onChange={handleChange}
                    InputProps={{
                      style: {
                        fontSize: "0.9rem",
                      },
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root:hover": {
                        "& > fieldset": {
                          borderColor: "#186090",
                        },
                      },
                    }}
                  >
                    {industries.map((industry) => (
                      <MenuItem key={industry} value={industry}>
                        {industry}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={12}>
                  <InputLabel className="form-label">Password</InputLabel>
                  <TextField
                    className="form-label"
                    placeholder="Set Password"
                    variant="outlined"
                    fullWidth
                    value={newUser.password}
                    name="password"
                    onChange={handleChange}
                    InputProps={{
                      style: {
                        fontSize: "0.9rem",
                      },
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root:hover": {
                        "& > fieldset": {
                          borderColor: "#186090",
                        },
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    fullWidth
                    className="login-button"
                    sx={{
                      "&:hover": {
                        backgroundColor: "#30a8d8",
                      },
                    }}
                  >
                    Sign Up
                  </Button>
                </Grid>
                <Grid item xs={12} className="not-registered">
                  Already have an account?{" "}
                  <a href="/login" style={{ color: "#30a8d8" }}>
                    Login here!
                  </a>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          item
          sm={6}
          className="signup-right"
          sx={{
            display: { md: "block", sm: "none", xs: "none" },
          }}
        >
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            height="100%"
          >
            <Grid item xl={8.5} lg={10.5} md={12}>
              <img
                src={signUpImage}
                alt="Manage cashflows and forecase cashflows efficiently"
                className="signup-image"
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default SignUp;
