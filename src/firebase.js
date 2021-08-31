import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth"


const firebaseConfig = {
  apiKey: "AIzaSyARDQmhZCgl296Qmaqjl_JmESPqRnpM-cI",
  authDomain: "web-chat2-da489.firebaseapp.com",
  databaseURL: "https://web-chat2-da489-default-rtdb.firebaseio.com",
  projectId: "web-chat2-da489",
  storageBucket: "web-chat2-da489.appspot.com",
  messagingSenderId: "815510296404",
  appId: "1:815510296404:web:9e5f35251f668ab7fc1ac1",
  measurementId: "G-6GW2DGLFLX"
  };

firebase.initializeApp(firebaseConfig);
export const db =firebase.database();
export const auth=firebase.auth;

// export default firebase;