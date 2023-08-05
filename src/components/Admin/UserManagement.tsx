import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Snackbar from "@mui/material/Snackbar";
import { Alert } from "../../utils/components";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Loading from "./Loading";
import email from "../../images/email.png";
import { UserManagementProps, Invite, Member } from "../../utils/interface";
import { validateEmail, validateNotEmpty } from "../../utils/validators";
import axios from "axios";

interface member {
  email: string;
  role: string;
}

const getRole = (role: string) => {
  if (role === "admin") return "Administrator";
  if (role === "user") return "User";
  return role;
};

const UserManagement = (props: UserManagementProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [validating, setValidating] = useState<boolean>(false);
  const [message,setMessage] = useState("");
  const [openInvite, setOpenInvite] = useState<boolean>(false);
  const [users, setUsers] = useState<member[]>([]);
  const [inviteStatus, setInviteStatus] = useState<"error" | "success" | "">(
    ""
  );
  const [invite, setInvite] = useState<Invite>({
    name: "",
    email: "",
    access: "read",
  });

  useEffect(() => {
    setIsLoaded(true);
    axios
      .get(process.env.REACT_APP_BACKEND_HOST + "v1/admin/memberCheck", {
        headers: { Authorization: `Bearer ${props.accessToken}` },
      })
      .then((response) => {
        const userData: Member[] = response.data.memberDetails;
        const newUsers: member[] = [];
        userData.forEach((user) => {
          if (user.isEmailVerified)
            newUsers.push({ email: user.email, role: getRole(user.role) });
        });
        setUsers(newUsers);
        setIsLoaded(true);
      })
      .catch((err) => {
        setIsLoaded(true);
      });
  }, [props.accessToken]);

  const userRoles = ["read", "write", "owner"];

  const submitInvite = (invite: Invite) => {
    setValidating(true);
    if (!validateNotEmpty(invite.name) || !validateEmail(invite.email)) return;

    const res = axios.post(process.env.REACT_APP_BACKEND_HOST + "v1/admin/addMember", invite, {
        headers: {
          Authorization: `Bearer ${props.accessToken}`,
        },
      })
      .then(({data}) => {
        if(!data.success){
          setMessage(data.message)
          setInviteStatus("error");
          return;
        }
        console.log("response",data)
        setInviteStatus("success");
      })
      .catch((err) => {
        console.log(err);
        setInviteStatus("error");
      });

    setValidating(false);
    setInvite({
      name: "",
      email: "",
      access: "read",
    });
    setOpenInvite(false);
  };

  const handleSnackClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setInviteStatus("");
  };
  if (!isLoaded) return <Loading />;
  else
    return (
      <Grid container justifyContent="flex-end">
        <Grid item xs={12} className="user-management-top settings-padding">
          <Grid container justifyContent="space-between" pr={{ xl: 10, sm: 5 }}>
            <Grid item className="settings-section-heading">
              User Management
            </Grid>
            <Grid
              item
              className="invite-user"
              onClick={() => setOpenInvite(true)}
              sx={{ display: { xs: "none", sm: "flex" } }}
            >
              <Grid container alignItems="center">
                <img src={email} alt="email" />
                <span className="invite-user-text">Invite User</span>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          item
          className="invite-user"
          onClick={() => setOpenInvite(true)}
          sx={{ display: { xs: "block", sm: "none" } }}
          mt={{ sm: 0, xs: 2 }}
          mr={1}
        >
          <Grid container alignItems="center">
            <img src={email} alt="email" />
            <span className="invite-user-text">Invite User</span>
          </Grid>
        </Grid>
        <Grid
          item
          xs={12}
          className="user-count settings-padding"
          mt={{ sm: 4, xs: 1 }}
        >
          No. of Users:&nbsp;&nbsp;&nbsp; {users.length}
        </Grid>
        <TableContainer className="user-list" sx={{ height: "auto" }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell className="user-list-heading">EMAIL</TableCell>
                <TableCell align="center" className="user-list-heading">
                  TYPE
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell
                  component="th"
                  scope="row"
                  className="user-list-info"
                >
                  {props.email}
                </TableCell>
                <TableCell align="center" className="user-list-info">
                  {getRole(props.role)}{" "}
                </TableCell>
              </TableRow>
              {users.map((user, index) => (
                <TableRow key={index}>
                  <TableCell
                    component="th"
                    scope="row"
                    className="user-list-info"
                  >
                    {user.email}
                  </TableCell>
                  <TableCell align="center" className="user-list-info">
                    {user.role}{" "}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Modal open={openInvite} onClose={() => setOpenInvite(false)}>
          <Grid container className="modal-box" p={3}>
            <div className="modal-heading">Invite User</div>
            <TextField
              fullWidth
              label="Name"
              value={invite.name}
              InputProps={{ style: { fontFamily: "Montserrat" } }}
              InputLabelProps={{ style: { fontFamily: "Montserrat" } }}
              FormHelperTextProps={{ style: { fontFamily: "Montserrat" } }}
              onChange={(evt) =>
                setInvite({ ...invite, name: evt.target.value })
              }
              style={{ marginBottom: "1rem" }}
              error={validating && !validateNotEmpty(invite.name)}
              helperText={
                validating && !validateNotEmpty(invite.name)
                  ? "Name cannot be empty"
                  : ""
              }
            ></TextField>
            <TextField
              fullWidth
              label="Email"
              InputProps={{ style: { fontFamily: "Montserrat" } }}
              InputLabelProps={{ style: { fontFamily: "Montserrat" } }}
              FormHelperTextProps={{ style: { fontFamily: "Montserrat" } }}
              value={invite.email}
              onChange={(evt) =>
                setInvite({ ...invite, email: evt.target.value })
              }
              style={{ marginBottom: "1rem" }}
              error={validating && !validateEmail(invite.email)}
              helperText={
                validating && !validateEmail(invite.email)
                  ? "Invalid email"
                  : ""
              }
            ></TextField>
            <Grid container mb={2}>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label="Access"
                  select
                  value={invite.access}
                  InputProps={{
                    style: { fontFamily: "Montserrat" },
                  }}
                  InputLabelProps={{ style: { fontFamily: "Montserrat" } }}
                  onChange={(evt) =>
                    setInvite({ ...invite, access: evt.target.value })
                  }
                >
                  {userRoles.map((role: string) => (
                    <MenuItem
                      key={role}
                      value={role}
                      style={{ fontFamily: "Montserrat" }}
                    >
                      {role}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            </Grid>
            <div
              className="invite-user-submit"
              onClick={() => submitInvite(invite)}
            >
              Invite
            </div>
          </Grid>
        </Modal>
        <Snackbar
          open={inviteStatus === "success"}
          autoHideDuration={6000}
          onClose={handleSnackClose}
        >
          <Alert
            onClose={handleSnackClose}
            severity="success"
            sx={{ width: "100%" }}
            className="snack"
          >
            Successfully Invited!
          </Alert>
        </Snackbar>
        <Snackbar
          open={inviteStatus === "error"}
          autoHideDuration={6000}
          onClose={handleSnackClose}
        >
          <Alert
            onClose={handleSnackClose}
            severity="error"
            sx={{ width: "100%" }}
            className="snack"
          >
            {message}
          </Alert>
        </Snackbar>
      </Grid>
    );
};

export default UserManagement;
