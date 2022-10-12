import React from "react";
import Grid from "@mui/material/Grid";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import email from "../../images/email.png";

const users = [{ email: "sneha@allistercorp.com", type: "Adminitrator" }];
const UserManagement = () => {
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
        No. of Users:&nbsp;&nbsp;&nbsp; 1
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
                  {user.type}{" "}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  );
};

export default UserManagement;
