import React, { useState } from "react";
import { Box, makeStyles } from "@material-ui/core";

import { Sender, Receiver } from "./MessageComponents";
import { UpdateMessage, countUnReadMessages } from "../../action/userAction";
import { useDispatch } from "react-redux";

import MessageHeader from "./MessageHeader";
import MessageFooter from "./MessageFooter";

const useStyles = makeStyles({
  messageContainer: {
    width: "72%",
    marginLeft: "28%",
    position: "fixed",
    height: "100%",
    backgroundColor: "fff",
  },

  textSection: {
    boxSizing: "border-box",
    width: "100%",
    height: "561.5px",
    // height: "100%",
    marginTop: "71px",
    padding: "2rem",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    overflowX: "hidden",
    overflowY: "scroll",
    backgroundColor: "lightgrey",
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

function getFormattedDate(date) {
  let year = date.getFullYear();
  let month = (1 + date.getMonth()).toString().padStart(2, "0");
  let day = date.getDate().toString().padStart(2, "0");

  return month + "/" + day + "/" + year;
}

export default function MessageComp(props) {
  const { chatStarted, chatUser, user, auth, receiverUid } = props;
  const classes = useStyles();
  const dispatch = useDispatch();
  const [displayDate, setDisplayDate] = useState("");
  const [changeDate, setChangeDate] = useState(true);
  const [message, setMessage] = useState("");
  let textDate = "";

  const SendMessage = () => {
    const messageObj = {
      senderUid: auth.uid,
      receiverUid,
      message,
      isView: false,
      createdAt: +new Date(),
    };

    if (message !== "") {
      dispatch(UpdateMessage({ messageObj, chatUser, auth })).then(() => {
        setMessage("");
      });
    }

    dispatch(countUnReadMessages({ auth, user, chatUser }));
  };

  return (
    <Box className={classes.messageContainer}>
      {/*Header */}
      <MessageHeader
        chatStarted={chatStarted}
        chatUser={chatUser}
        auth={auth}
      />

      {/* Chat area */}
      <Box className={classes.textSection}>
        {chatStarted ? (
          <>
            <p style={{ textAlign: "center" }}>
              {textDate === getFormattedDate(new Date()) ? "Today" : textDate}
            </p>

            {user?.conversations?.map((chat) => {
              let time = new Intl.DateTimeFormat("en-US", {
                hour: "2-digit",
                minute: "2-digit",
              }).format(chat.createdAt);

              let checkDate = new Intl.DateTimeFormat("en-US", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
              }).format(chat.createdAt);

              {/* if(checkDate === ""){
                setDisplayDate("");
              } */}

              {/* if(checkDate !== displayDate){
                setChangeDate(true);
              } */}
              {/* console.log(checkDate === displayDate)
              

              if (changeDate) {
                setDisplayDate(checkDate);
                setChangeDate(false);
              } */}
              return (
                <Box className={classes.chatContainer} key={chat.newMessagekey}>
                  {/* {console.log(displayDate,checkDate,"date")} */}
                  {chat.senderUid === auth.uid ? (
                    <Sender
                      message={chat.message}
                      time={time}
                      isView={chat.isView}
                    />
                  ) : (
                    <Receiver message={chat.message} time={time} />
                  )}
                </Box>
              );
            })}
          </>
        ) : null}
      </Box>

      {/* Footer*/}
      {chatStarted ? (
        <MessageFooter
          message={message}
          setMessage={setMessage}
          SendMessage={SendMessage}
        />
      ) : null}
    </Box>
  );
}
