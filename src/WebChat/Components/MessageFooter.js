import React from "react";
import { Box, makeStyles, TextField, Button } from "@material-ui/core";

const useStyles = makeStyles({
  footerSection: {
    position: "fixed",
    width: "69.9%",
    height: "50px",
    padding: "0.8rem 1.2rem",
    backgroundColor: "#59b8f0",
    bottom: "0",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  typeText: {
    width: "85%",
    height: "30px",
    padding: "0.5rem 1rem",
    backgroundColor: "#fff",
    borderRadius: "50px",
    marginRight: "1rem",

    "& .MuiInput-underline:before": {
      border: "none",
      transition: "none",
      content: "none",
      position: "inherit",
    },

    "& .MuiInput-underline:after": {
      border: "none",
      transition: "none",
    },
  },

  chatBtn: {
    color: "white",
    border: "2px solid #fff",
    borderRadius: "50px",
    textTransform: "capitalize",
    fontWeight: "bold",
    padding: ".4rem 0.8rem",
    backgroundColor:"#06507a",
    marginLeft:"-150px",
    "&:hover": {
      backgroundColor: "#7e8487",
    },
  },
});
export default function MessageFooter(props) {
  const { message, setMessage, SendMessage } = props;
  const classes = useStyles();
  return (
    <Box className={classes.footerSection}>
      <TextField
        variant="standard"
        type="text"
        value={message}
        className={classes.typeText}
        placeholder="Type a message"
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={(e) => (e.key === "enter" ? SendMessage : null)}
      />
      <Button onClick={SendMessage} className={classes.chatBtn}>
        {"Send"}
      </Button>
    </Box>
  );
}
