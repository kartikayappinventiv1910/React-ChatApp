import React from "react";
import { Box, makeStyles, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { Logout } from "../../action/authenticationAction";
import { useDispatch } from "react-redux";

const useStyles = makeStyles({
  textHeader: {
    backgroundColor: "rgb(4, 64, 121)",
    padding: "1.2rem",
    height: "33px",
    width: "69.9%",
    position: "fixed",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  otherUserName: {
    color: "#fff",
    fontWeight: "bold",
    letterSpacing: "1px",
  },

  chatBtn: {
    color: "black",
    border: "2px solid #fff",
    borderRadius: "50px",
    textTransform: "capitalize",
    fontWeight: "bold",
    padding: ".4rem 0.8rem",
    backgroundColor:"#f5cebc"
  },
});
export default function MessageHeader(props) {
  const { chatStarted, chatUser, auth } = props;
  const classes = useStyles();
  const dispatch = useDispatch();
  return (
    <Box className={classes.textHeader}>
      <Typography variant="h6" className={classes.otherUserName}>
        {chatStarted ? chatUser?.name : ""}
      </Typography>

      <Link
        to={"/"}
        className={classes.chatBtn}
        onClick={() => {
          dispatch(Logout(auth.uid));
        }}
      >
        {"Logout"}
      </Link>
    </Box>
  );
}
