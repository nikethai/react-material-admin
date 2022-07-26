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
} from "@material-ui/core";
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

import { useStore } from "../../state";

function Login(props) {
  var classes = useStyles();

  // global
  var userDispatch = useUserDispatch();

  // Zustand state
  const { user, userLogin } = useStore();

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
    const res = await signInGooglePopup();
    // const cred = GoogleAuthProvider.credentialFromResult(res);
    const usr = res.user;
    const idToken = await usr.getIdToken();
    // console.log(idToken);
    if (idToken) {
      try {
        const signinuser = await login(idToken);
        // console.log(user);
        userLogin(signinuser);
        console.log(user);
        localStorage.setItem("token", signinuser.jwt);
        // navigate("/");
      } catch (error) {
        switch (error.messages[0].err_msg) {
          case "User not found in DB!":
            // notyf.error(
            //   "Tài khoản chưa được đăng ký, vui lòng đăng ký tài khoản mới!",
            // );
            break;
          default:
            // notyf.error(
            //   "Đã có lỗi xảy ra khi đăng nhập " + error.messages[0].err_msg,
            // );
            break;
        }
      }
    } else {
      // notyf.error("Đăng nhập thất bại");
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
                onClick={() =>
                  loginUser(
                    userDispatch,
                    loginValue,
                    passwordValue,
                    props.history,
                    setIsLoading,
                    setError,
                  )
                }
                size="large"
                className={classes.googleButton}
              >
                <img src={google} alt="google" className={classes.googleIcon} />
                &nbsp;Sign in with Google
              </Button>
              {/*<div className={classes.formDividerContainer}>*/}
              {/*  <div className={classes.formDivider} />*/}
              {/*  <Typography className={classes.formDividerWord}>or</Typography>*/}
              {/*  <div className={classes.formDivider} />*/}
              {/*</div>*/}
              {/*<Fade in={error}>*/}
              {/*  <Typography color="secondary" className={classes.errorMessage}>*/}
              {/*    Something is wrong with your login or password :(*/}
              {/*  </Typography>*/}
              {/*</Fade>*/}
              {/*<TextField*/}
              {/*  id="email"*/}
              {/*  InputProps={{*/}
              {/*    classes: {*/}
              {/*      underline: classes.textFieldUnderline,*/}
              {/*      input: classes.textField,*/}
              {/*    },*/}
              {/*  }}*/}
              {/*  value={loginValue}*/}
              {/*  onChange={e => setLoginValue(e.target.value)}*/}
              {/*  margin="normal"*/}
              {/*  placeholder="Email Adress"*/}
              {/*  type="email"*/}
              {/*  fullWidth*/}
              {/*/>*/}
              {/*<TextField*/}
              {/*  id="password"*/}
              {/*  InputProps={{*/}
              {/*    classes: {*/}
              {/*      underline: classes.textFieldUnderline,*/}
              {/*      input: classes.textField,*/}
              {/*    },*/}
              {/*  }}*/}
              {/*  value={passwordValue}*/}
              {/*  onChange={e => setPasswordValue(e.target.value)}*/}
              {/*  margin="normal"*/}
              {/*  placeholder="Password"*/}
              {/*  type="password"*/}
              {/*  fullWidth*/}
              {/*/>*/}
              {/*<div className={classes.formButtons}>*/}
              {/*  {isLoading ? (*/}
              {/*    <CircularProgress size={26} className={classes.loginLoader} />*/}
              {/*  ) : (*/}
              {/*    <Button*/}
              {/*      disabled={*/}
              {/*        loginValue.length === 0 || passwordValue.length === 0*/}
              {/*      }*/}
              {/*      onClick={() =>*/}
              {/*        loginUser(*/}
              {/*          userDispatch,*/}
              {/*          loginValue,*/}
              {/*          passwordValue,*/}
              {/*          props.history,*/}
              {/*          setIsLoading,*/}
              {/*          setError,*/}
              {/*        )*/}
              {/*      }*/}
              {/*      variant="contained"*/}
              {/*      color="primary"*/}
              {/*      size="large"*/}
              {/*    >*/}
              {/*      Login*/}
              {/*    </Button>*/}
              {/*  )}*/}
              {/*  <Button*/}
              {/*    color="primary"*/}
              {/*    size="large"*/}
              {/*    className={classes.forgetButton}*/}
              {/*  >*/}
              {/*    Forget Password*/}
              {/*  </Button>*/}
              {/*</div>*/}
            </React.Fragment>
          )}
          {activeTabId === 1 && (
            <React.Fragment>
              {/*<Typography variant="h1" className={classes.greeting}>*/}
              {/*  Welcome!*/}
              {/*</Typography>*/}
              {/*<Typography variant="h2" className={classes.subGreeting}>*/}
              {/*  Create your account*/}
              {/*</Typography>*/}
              {/*<Fade in={error}>*/}
              {/*  <Typography color="secondary" className={classes.errorMessage}>*/}
              {/*    Something is wrong with your login or password :(*/}
              {/*  </Typography>*/}
              {/*</Fade>*/}
              {/*<TextField*/}
              {/*  id="name"*/}
              {/*  InputProps={{*/}
              {/*    classes: {*/}
              {/*      underline: classes.textFieldUnderline,*/}
              {/*      input: classes.textField,*/}
              {/*    },*/}
              {/*  }}*/}
              {/*  value={nameValue}*/}
              {/*  onChange={e => setNameValue(e.target.value)}*/}
              {/*  margin="normal"*/}
              {/*  placeholder="Full Name"*/}
              {/*  type="text"*/}
              {/*  fullWidth*/}
              {/*/>*/}
              {/*<TextField*/}
              {/*  id="email"*/}
              {/*  InputProps={{*/}
              {/*    classes: {*/}
              {/*      underline: classes.textFieldUnderline,*/}
              {/*      input: classes.textField,*/}
              {/*    },*/}
              {/*  }}*/}
              {/*  value={loginValue}*/}
              {/*  onChange={e => setLoginValue(e.target.value)}*/}
              {/*  margin="normal"*/}
              {/*  placeholder="Email Adress"*/}
              {/*  type="email"*/}
              {/*  fullWidth*/}
              {/*/>*/}
              {/*<TextField*/}
              {/*  id="password"*/}
              {/*  InputProps={{*/}
              {/*    classes: {*/}
              {/*      underline: classes.textFieldUnderline,*/}
              {/*      input: classes.textField,*/}
              {/*    },*/}
              {/*  }}*/}
              {/*  value={passwordValue}*/}
              {/*  onChange={e => setPasswordValue(e.target.value)}*/}
              {/*  margin="normal"*/}
              {/*  placeholder="Password"*/}
              {/*  type="password"*/}
              {/*  fullWidth*/}
              {/*/>*/}
              {/*<div className={classes.creatingButtonContainer}>*/}
              {/*  {isLoading ? (*/}
              {/*    <CircularProgress size={26} />*/}
              {/*  ) : (*/}
              {/*    <Button*/}
              {/*      onClick={() =>*/}
              {/*        loginUser(*/}
              {/*          userDispatch,*/}
              {/*          loginValue,*/}
              {/*          passwordValue,*/}
              {/*          props.history,*/}
              {/*          setIsLoading,*/}
              {/*          setError,*/}
              {/*        )*/}
              {/*      }*/}
              {/*      disabled={*/}
              {/*        loginValue.length === 0 ||*/}
              {/*        passwordValue.length === 0 ||*/}
              {/*        nameValue.length === 0*/}
              {/*      }*/}
              {/*      size="large"*/}
              {/*      variant="contained"*/}
              {/*      color="primary"*/}
              {/*      fullWidth*/}
              {/*      className={classes.createAccountButton}*/}
              {/*    >*/}
              {/*      Create your account*/}
              {/*    </Button>*/}
              {/*  )}*/}
              {/*</div>*/}
              {/*<div className={classes.formDividerContainer}>*/}
              {/*  <div className={classes.formDivider} />*/}
              {/*  <Typography className={classes.formDividerWord}>or</Typography>*/}
              {/*  <div className={classes.formDivider} />*/}
              {/*</div>*/}
              {/*<Button*/}
              {/*  size="large"*/}
              {/*  className={classnames(*/}
              {/*    classes.googleButton,*/}
              {/*    classes.googleButtonCreating,*/}
              {/*  )}*/}
              {/*>*/}
              {/*  <img src={google} alt="google" className={classes.googleIcon} />*/}
              {/*  &nbsp;Sign in with Google*/}
              {/*</Button>*/}
            </React.Fragment>
          )}
        </div>
        <Typography color="primary" className={classes.copyright}>
          © 2022-{new Date().getFullYear()}{" "}
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
