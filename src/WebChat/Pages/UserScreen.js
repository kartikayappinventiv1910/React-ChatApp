import React, { useEffect } from "react";
import { Button, Card, makeStyles, Typography } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { getUsers } from "../../action/userAction";
import { db } from "../../firebase";
import Modal from "react-modal";

const useStyles = makeStyles({
  modalContainer: {
    width: "80%",
    height: "92.4vh",
    margin: "0 auto",
    border: "3px solid #3ECBFF",
    borderRadius: "20px",
    padding: "2rem 0",
    backgroundColor: "#8BE0FF",
  },

  userCard: {
    width: "70%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    margin: "1rem auto",
    padding: "0.6rem",
    height: "50px",
  },

  usersName: {
    color: "#3ECBFF",
    fontSize: "20px",
    textTransform: "uppercase",
  },

  btn: {
    backgroundColor: "#3ECBFF",
    color: "#fff",
    borderRadius: "50px",
    textTransform: "capitalize",
    fontWeight: "bold",
    padding: ".4rem 0.8rem",

    "&:hover": {
      backgroundColor: "#3ECBFF",
    },
  },
});

Modal.setAppElement("#root");

export default function UserScreen(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const user = useSelector((state) => state.user);

  // let unsubscribe;

  const AddUser = (user) => {
    db.ref(`Inbox/${auth.uid}`).on("value", (snapshot) => {
      const inboxData = snapshot.val();

      if (inboxData && !Object.keys(inboxData).includes(user.uid)) {
        let messageChatRoomKey = db.ref(`Inbox/${auth.uid}`).push().key;

        db.ref(`Inbox/${auth.uid}/${user.uid}`).update({
          messageChatRoomKey,
          readCounter: 0,
        });

        db.ref(`Inbox/${user.uid}/${auth.uid}`).update({
          messageChatRoomKey,
          readCounter: 0,
        });
      }
      props.setModalOpen(false);
    });
  };
  return (
    <Modal
      className={classes.modalContainer}
      isOpen={props.modalOpen}
      onRequestClose={() => props.setModalOpen(false)}
    >
      {user.users.map((user) => {
        return (
          <Card key={user.uid} className={classes.userCard}>
            <Typography className={classes.usersName}>{user.name}</Typography>
            <Button className={classes.btn} onClick={() => AddUser(user)}>
              {"Send Message"}
            </Button>
          </Card>
        );
      })}
    </Modal>
  );
}
