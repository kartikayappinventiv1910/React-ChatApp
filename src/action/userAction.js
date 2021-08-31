import { db } from "../firebase";
import {
  GET_INBOXUSER_SUCCESS,
  GET_MESSAGES_SUCCESS,
  GET_USER_SUCCESS,
} from "./actionNames";

export const getUsers = (uid) => {
  return (dispatch) => {
    const unsubscribe = db.ref("Users");

    unsubscribe.on("value", (snapshot) => {
      const user = snapshot.val();

      const users = [];
      for (let i in user) {
        if (i !== uid) {
          users.push(user[i]);
        }
      }
      dispatch({
        type: GET_USER_SUCCESS,
        payLoad: { users },
      });
    });

    return unsubscribe;
  };
};

export const getInboxUser = ({ auth, user }) => {
  return (dispatch) => {
    db.ref(`Inbox/${auth.uid}`).on("value", (snapshot) => {
      const inboxData = snapshot.val();
      // console.log(inboxData, user.users);
      const inboxUsers = [];

      if (inboxData) {
        // console.log("faltu sa");
        Object.keys(inboxData).forEach((inboxUid) => {
          user.users.forEach((inboxUser) => {
            if (inboxUid === inboxUser.uid) {
              inboxUsers.push({
                ...inboxUser,
                messageChatRoomKey: inboxData[inboxUid].messageChatRoomKey,
                readCounter: inboxData[inboxUid].readCounter,
              });
            }
          });
        });

        dispatch({
          type: GET_INBOXUSER_SUCCESS,
          payLoad: { inboxUsers },
        });
      }
    });
  };
};

export const UpdateMessage = ({ messageObj, chatUser, auth }) => {
  let newMessageKey = db
    .ref(`Messages/${chatUser.messageChatRoomKey}`)
    .push().key;

  return async (dispatch) => {
    db.ref(`Messages/${chatUser.messageChatRoomKey}/${newMessageKey}`).update({
      ...messageObj,
      newMessageKey,
    });
    dispatch(getMessages({ user: chatUser }));
  };
};

export const getMessages = ({ user }) => {
  
  return async (dispatch) => {
    db.ref(`Messages/${user.messageChatRoomKey}`).on("value", (snapshot) => {
      const messages = snapshot.val();

      let convo = [];
      for (let msg in messages) {
        db.ref(`Messages/${user.messageChatRoomKey}/${msg}`)
          .orderByChild("createdAt")
          .on("value", (snapshot) => {
            const message = snapshot.val();
            convo.push(message);
          });
      }
      dispatch({
        type: GET_MESSAGES_SUCCESS,
        payLoad: { convo },
      });
    });
  };
};

export const isViewed = ({ auth, user, userData }) => {
  return async () => {
    let convo = user.conversations;
    for (let i in convo) {
      if (convo[i].senderUid === userData.uid) {
        db.ref(
          `Messages/${userData.messageChatRoomKey}/${convo[i].newMessageKey}`
        ).update({
          isView: true,
        });

        db.ref(`Inbox/${auth.uid}/${userData.uid}`).update({
          readCounter: 0,
        });
      }
    }
  };
};

export const countUnReadMessages = ({ auth, user, chatUser }) => {
  return async () => {
    let unseenCounter = 0;
    let convo = user.conversations;

    for (let i in convo) {
      if (convo[i].isView === false) {
        unseenCounter = unseenCounter + 1;
      }
    }

    db.ref(`Inbox/${chatUser.uid}/${auth.uid}`).update({
      readCounter: unseenCounter,
    });
  };
};