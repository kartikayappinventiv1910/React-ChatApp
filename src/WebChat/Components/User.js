import React from "react";
import { Box, Divider, makeStyles, Typography } from "@material-ui/core";
import { db } from "../../firebase";

const useStyles = makeStyles({
  userList: {
    marginTop: "1rem",
    padding: "0.5rem 0.5rem 0.3rem ",
    cursor: "pointer",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  usersName: {
    fontSize: "22px",
    fontWeight:"bold"
  },

  lastMsg: {
    padding: "0 1rem ",
    fontSize: "18px",
  },

  unreadLastMsg: {
    padding: "0 1rem ",
    fontWeight: "bold",
    fontSize: "18px",
  },

  userDetails: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  online: {
    width: "10px",
    height: "10px",
    backgroundColor: "green",
    borderRadius: "5px",
  },

  offline: {
    width: "10px",
    height: "10px",
    backgroundColor: "red",
    borderRadius: "5px",
  },

  counter: {
    backgroundColor: "rgb(4, 64, 121)",
    color: "#fff",
    padding: "3px",
    borderRadius: "30%",
    fontSize: "12px",
    marginRight: "0.5rem",
  },
});
export const Users = (props) => {
  const classes = useStyles();
  const { userData, chatInitialize } = props;
  console.log(userData,"userdata")

  let allMsgKeys = [];
  let lastMessage;
  let unseenCounter;

  db.ref(`Messages/${userData.messageChatRoomKey}`).on("value", (snapshot) => {
    const chatMsg = snapshot.val();
    for (let i in chatMsg) {
      allMsgKeys.push(i);
    }
  });

  const len = allMsgKeys.length;
  if (len > 0) {
    const lastMessageKey = allMsgKeys[len - 1];
    db.ref(`Messages/${userData.messageChatRoomKey}/${lastMessageKey}`).on(
      "value",
      (snapshot) => {
        lastMessage = snapshot?.val();
      }
    );
  }
  unseenCounter = userData.readCounter;

  console.log("search")
  return (
    <>
      <Box
        onClick={() => chatInitialize(userData)}
        className={classes.userList}
      >
        <Typography className={classes.usersName}>{userData.name}</Typography>
        <span
          className={userData.isOnline ? classes.online : classes.offline}
        />
      </Box>
      <Box className={classes.userDetails}>
        <Typography
          className={
            lastMessage?.isView ? classes.lastMsg : classes.unreadLastMsg
          }
        >
          {lastMessage?.message}
        </Typography>
        {unseenCounter > 0 ? (
          <p className={classes.counter}>{unseenCounter}</p>
        ) : null}
      </Box>
      <Divider />
    </>
  );
};
