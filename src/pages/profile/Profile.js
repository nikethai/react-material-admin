import { Grid, Paper, TextField } from "@material-ui/core";
import { AccountCircle, EmailRounded, PhoneRounded } from "@material-ui/icons";
import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";

import useStyles from "./styles";

function Profile() {
  const classes = useStyles();
  const user = localStorage.getItem("user");
  const userData = JSON.parse(user);

  useEffect(() => {
    if (!user) {
      //   props.history.push("/login");
    }
  }, []);

  return (
    <>
      <h1 style={{ marginTop: 0 }}>Thông tin cá nhân</h1>
      <div className={classes.profile__main}>
        <div className={classes.profile__sub}>
          <Grid item>
            <EmailRounded />
          </Grid>
          <Grid item>
            <TextField id="input-with-icon-grid" defaultValue={userData.email} disabled label="Email" />
          </Grid>
        </div>
        <div className={classes.profile__sub}>
          <Grid item>
            <PhoneRounded />
          </Grid>
          <Grid item>
            <TextField id="input-with-icon-grid" defaultValue={userData.phone} disabled label="Phone" />
          </Grid>
        </div>
        <div className={classes.profile__sub}>
          <Grid item>
            <AccountCircle />
          </Grid>
          <Grid item>
            <TextField id="input-with-icon-grid" defaultValue={userData.role} disabled label="Role" />
          </Grid>
        </div>
      </div>
    </>
  );
}

export default withRouter(Profile);
