import Grid from "@mui/material/Grid";

const Security = () => {
  return (
    <Grid container className="settings-padding" spacing={2}>
      <Grid item xs={12} className="password">
        Password
      </Grid>
      <Grid item xs={12} className="change-password">
        Change your account password
      </Grid>
      <Grid item xs={12}>
        <span className="edit-password">Edit</span>
      </Grid>
    </Grid>
  );
};

export default Security;
