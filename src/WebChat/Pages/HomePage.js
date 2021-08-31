import React, { useEffect, useState } from "react";
import { Box, Divider, makeStyles } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import {
  getUsers,
  getMessages,
  getInboxUser,
  isViewed,
  countUnReadMessages,
} from "../../action/userAction";
import UserScreen from "./UserScreen";
import InboxComp from "../Components/Inbox";
import MessageComp from "../Components/Message";

const useStyles = makeStyles({
  mainContainer: {
    width: "100vw",
    height: "100vh",
    margin: "0 auto",
    display: "flex",
  },

  divider: {
    height: "100%",
    width: "1px",
    color: "black",
    marginLeft: "27.9%",
  },

  messageContainer: {
    width: "72%",
    marginLeft: "28%",
    position: "fixed",
    height: "100%",
    backgroundColor: "fff",
  },

  textHeader: {
    backgroundColor: "#3ECBFF",
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

  textSection: {
    boxSizing: "border-box",
    width: "100%",
    height: "801.5px",
    // height: "100%",
    marginTop: "71px",
    padding: "2rem",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    overflowX: "hidden",
    overflowY: "scroll",
  },

  footerSection: {
    position: "fixed",
    width: "69.9%",
    height: "50px",
    padding: "0.8rem 1.2rem",
    backgroundColor: "#3ECBFF",
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
    color: "#fff",
    border: "2px solid #fff",
    borderRadius: "50px",
    textTransform: "capitalize",
    fontWeight: "bold",
    padding: ".4rem 0.8rem",
  },

  chatContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
  },
});

export default function HomePage() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const user = useSelector((state) => state.user);

  const [chatStarted, setChatStarted] = useState(false);
  const [chatUser, setChatUser] = useState(null);
  const [receiverUid, setReceiverUid] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    dispatch(getUsers(auth.uid));
  }, []);

  useEffect(() => {
    if (user.users) {
      dispatch(getInboxUser({ auth, user }));
    }
  }, [user.users]);

  useEffect(() => {
    if (chatStarted && chatUser && receiverUid) {
      dispatch(
        getMessages({
          user: chatUser,
        })
      );
      dispatch(isViewed({ auth, user, userData: chatUser }));
    }
  }, [chatStarted, chatUser, receiverUid, user.conversations.length]);

  useEffect(() => {
    if (chatUser) {
      dispatch(countUnReadMessages({ auth, user, chatUser }));
    }
  });

  const chatInitialize = (userData) => {
    setChatStarted(true);
    setChatUser(userData);
    setReceiverUid(userData.uid);

    getMessages({
      user: userData,
    });

    dispatch(isViewed({ auth, user, userData }));
  };

  return (
    <Box className={classes.mainContainer}>
      {/* Inbox Component */}
      <InboxComp
        auth={auth}
        user={user}
        setModalOpen={setModalOpen}
        chatInitialize={chatInitialize}
      />

      <Divider className={classes.divider} />

      {/* Messages Component */}
      <MessageComp
        chatStarted={chatStarted}
        chatUser={chatUser}
        user={user}
        auth={auth}
        receiverUid={receiverUid}
      />

      {/* Add User */}
      <UserScreen modalOpen={modalOpen} setModalOpen={setModalOpen} />
    </Box>
  );
}
