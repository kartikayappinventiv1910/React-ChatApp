import React from "react";
import { Box, Button, makeStyles, Typography } from "@material-ui/core";
import { NavLink } from "react-router-dom";
import Header from "../Components/header"

const useStyles = makeStyles({
  mainContainer: {
    width: "100%",
    margin: "0px",
    backgroundColor: "rgb(191, 207, 221)",
    height: "705px",
  },
  buttonContainer: {
    width: "400px",
    height: "170px",
    margin: "30px 430px",
    padding: "20px 0px",
    boxShadow: "0 0 5px 1px #ccc",
    backgroundColor: "white",
    border: "1px solid #eee",
  },
  btnContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },

  btn: {
    width: "50%",
    padding: "0.5rem 2rem",
    margin: "1rem 0",
    backgroundColor: "rgb(4, 64, 121)",
    fontSize: "20px",
    disableRipple: "true",
    height: "50px",

    "&:hover": {
      backgroundColor: "lightgray",
      border: "1px solid black",
    },
  },

  btnLink: {
    color: "#3ECBFF",
    fontWeight: "bold",
    textDecoration: "none",

    "&:hover": {
      color: "#000",
    },
  },
});

export default function InitialScreen() {
  const classes = useStyles();
  return (
    <Box className={classes.mainContainer}>
      <Header />
      {/* <Box className={classes.container}>
        <Typography variant="h4" className={classes.text}>
          {"Web-Chat"}
        </Typography>
      </Box> */}
      <div className={classes.buttonContainer}>
        <Box className={classes.btnContainer}>
          <Button className={classes.btn}>
            <NavLink to={"/login"} className={classes.btnLink}>
              {"Login"}
            </NavLink>
          </Button>
          <Button className={classes.btn}>
            <NavLink to={"/Signup"} className={classes.btnLink}>
              {"SignUp"}
            </NavLink>
          </Button>
        </Box>
      </div>
    </Box>
  );
}
