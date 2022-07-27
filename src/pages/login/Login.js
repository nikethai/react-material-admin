import React, { useState } from "react";
import {
  Grid,
  CircularProgress,
  Typography,
  Button,
  Tabs,
  Tab,
  TextField,
  Fade,
  Snackbar,
} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import { withRouter } from "react-router-dom";
import classnames from "classnames";

// styles
import useStyles from "./styles";

// logo
import logo from "./FreelanceVN.svg";
import google from "../../images/google.svg";

// context
import { useUserDispatch, loginUser } from "../../context/UserContext";
import {
  getAuth,
  getRedirectResult,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { login } from "../../api/Service/login";

import { useUserStore } from "../../state";

const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};
function Login(props) {
  var classes = useStyles();

  // global
  var userDispatch = useUserDispatch();

  // Zustand state
  const { user, userLogin } = useUserStore();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  // local
  var [isLoading, setIsLoading] = useState(false);
  var [error, setError] = useState(null);
  var [activeTabId, setActiveTabId] = useState(0);
  var [nameValue, setNameValue] = useState("");
  var [loginValue, setLoginValue] = useState("admin@flatlogic.com");
  var [passwordValue, setPasswordValue] = useState("password");

  const signInGooglePopup = async () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    const res = await signInWithPopup(auth, provider).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);

      // notyf.error("Đã có lỗi xảy ra: " + errorMessage);
    });
    return res;
  };

  const signIn = async () => {
    try {
      const res = await signInGooglePopup();
      // const cred = GoogleAuthProvider.credentialFromResult(res);
      const usr = res.user;
      const idToken = await usr.getIdToken();
      // console.log(idToken);
      if (idToken) {
        const signinuser = await login(idToken);
        if (signinuser.role === "admin") {
          setMessage("Bạn không có quyền truy cập");
          setOpen(true);
          return;
        }
        userLogin(signinuser);
        console.log(user);
        localStorage.setItem("token", signinuser.jwt);
        loginUser(
          userDispatch,
          loginValue,
          passwordValue,
          props.history,
          setIsLoading,
          setError,
        );
        // navigate("/");
      } else {
        // notyf.error("Đăng nhập thất bại");
      }
    } catch (error) {
      if (error && error.messages) {
        switch (error.messages[0].err_msg) {
          case "User not found in DB!":
            setMessage("Tài khoản chưa được đăng ký!");
            setOpen(true);
            // notyf.error(
            //   "Tài khoản chưa được đăng ký, vui lòng đăng ký tài khoản mới!",
            // );
            break;
          default:
            setMessage(
              "Đã có lỗi xảy ra khi đăng nhập " + error.messages[0].err_msg,
            );
            setOpen(true);
            // notyf.error(
            //   "Đã có lỗi xảy ra khi đăng nhập " + error.messages[0].err_msg,
            // );
            break;
        }
      } else {
        setMessage("Đã có lỗi xảy ra khi đăng nhập " + error);
        setOpen(true);
      }
    }
  };

  return (
    <Grid container className={classes.container}>
      <div className={classes.logotypeContainer}>
        <img src={logo} alt="logo" className={classes.logotypeImage} />
        <Typography className={classes.logotypeText}>
          FreelanceVN Admin
        </Typography>
      </div>
      <div className={classes.formContainer}>
        <div className={classes.form}>
          <Tabs
            value={activeTabId}
            onChange={(e, id) => setActiveTabId(id)}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab label="Login" classes={{ root: classes.tab }} />
            {/*<Tab label="New User" classes={{ root: classes.tab }} />*/}
          </Tabs>
          {activeTabId === 0 && (
            <React.Fragment>
              <Typography variant="h1" className={classes.greeting}>
                Good Morning, User
              </Typography>
              <Button
                onClick={signIn}
                size="large"
                className={classes.googleButton}
              >
                <img src={google} alt="google" className={classes.googleIcon} />
                &nbsp;Sign in with Google
              </Button>
            </React.Fragment>
          )}
          {activeTabId === 1 && <React.Fragment></React.Fragment>}
        </div>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error">
            {message}
          </Alert>
        </Snackbar>
        <Typography color="primary" className={classes.copyright}>
          © {new Date().getFullYear()}{" "}
          <a
            style={{ textDecoration: "none", color: "inherit" }}
            href=""
            rel="noopener noreferrer"
            target="_blank"
          >
            FreelanceVN
          </a>
          . All rights reserved.
        </Typography>
      </div>
    </Grid>
  );
}

export default withRouter(Login);
