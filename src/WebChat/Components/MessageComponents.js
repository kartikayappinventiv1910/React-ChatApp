import React from "react";
import { makeStyles, Box, Typography } from "@material-ui/core";

const useStyles = makeStyles({
  senderChat: {
    alignSelf: "flex-end",
    backgroundColor: "#0a7ff5",
  },
  receiverChat: {
    alignSelf: "flex-start",
    backgroundColor: "#536980",
  },
  chat: {
    fontSize: "18px",
  },
  time: {
    fontSize: "12px",
    float: "right",
  },
  chatBox: {
    width: "fit-content",
    margin: ".5rem 0",
    padding: "5px 10px",
    borderRadius: "10px",
    color: "#fff",
  },
});

export function Sender(props) {
  const classes = useStyles();
  return (
    <Box className={classes.senderChat + " " + classes.chatBox}>
      <Typography className={classes.chat}>{props.message}</Typography>
      <span className={classes.time}>{props.time}</span>
      {props.isView === false ? (
        <span>&#10003;</span>
      ) : (
        <span>&#10003;&#10003;</span>
      )}
    </Box>
  );
}

export function Receiver(props) {
  const classes = useStyles();
  return (
    <Box className={classes.receiverChat + " " + classes.chatBox}>
      <Typography className={classes.chat}>{props.message}</Typography>
      <span className={classes.time}>{props.time}</span>
    </Box>
  );
}
