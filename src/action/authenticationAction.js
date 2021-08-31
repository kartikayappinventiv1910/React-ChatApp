import { auth, db } from "../firebase";
import {
  USER_LOGIN_FAILURE,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
} from "./actionNames";

export const Signup = (user) => {
  return (dispatch) => {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });
    auth()
      .createUserWithEmailAndPassword(user.email, user.password)
      .then((userData) => {
        const currentUser = auth().currentUser;
        currentUser
          .updateProfile({
            displayName: user.name,
          })
          .then(() => {
            // Updated Successfully
            const userRef = db.ref(`Users/${userData.user.uid}`);
            db.ref(`Inbox/${userData.user.uid}`).set({
              senderUid: userData.user.uid,
            });
            const userDetails = {
              name: user.name,
              email: user.email,
              isOnline: true,
              uid: userData.user.uid,
              createdAt: +new Date(),
            };

            userRef.set(userDetails);
          })
          .then(() => {
            console.log("User Added");
            const userDetails = {
              name: user.name,
              email: user.email,
              uid: userData.user.uid,
            };
            localStorage.setItem("User", JSON.stringify(userDetails));
            dispatch({
              type: USER_LOGIN_SUCCESS,
              payLoad: { user: userDetails },
            });
          })
          .catch((err) => {
            console.log(err);
            dispatch({
              type: USER_LOGIN_FAILURE,
              payLoad: { err },
            });
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const Signin = (user) => {
  return (dispatch) => {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });

    auth()
      .signInWithEmailAndPassword(user.email, user.password)
      .then((data) => {
        db.ref(`Users/${data.user.uid}`).update({
          isOnline: true,
        });

        const loggedInUser = {
          name: data.user.displayName,
          uid: data.user.uid,
          email: data.user.email,
        };

        localStorage.setItem("User", JSON.stringify(loggedInUser));

        dispatch({
          type: USER_LOGIN_SUCCESS,
          payLoad: { user: loggedInUser },
        });
      })

      .catch((error) => {
        console.log(error);
        dispatch({
          type: USER_LOGIN_FAILURE,
          payLoad: { error },
        });
      });
  };
};

export const isLoggedInUser = () => {
  return (dispatch) => {
    const loggedUser = localStorage.getItem("User")
      ? JSON.parse(localStorage.getItem("User"))
      : null;

    if (loggedUser) {
      dispatch({
        type: USER_LOGIN_SUCCESS,
        payLoad: { user: loggedUser },
      });
    } else {
      dispatch({
        type: USER_LOGIN_FAILURE,
        payLoad: { error: "Login Again" },
      });
    }
  };
};

export const Logout = (uid) => {
  return (dispatch) => {
    db.ref(`Users/${uid}`)
      .update({
        isOnline: false,
      })
      .then(() => {
        auth()
          .signOut()
          .then(() => {
            // Successfully
            localStorage.clear();
            // dispatch({ type: USER_LOGOUT_SUCCESS });
          });
        // .catch((error) => {
        //   console.log(error);
        //   dispatch({
        //     type: USER_LOGOUT_FAILURE,
        //     payLoad: { error },
        //   });
        // });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};