import React, { useState } from "react";
import {
  Box,
  Divider,
  makeStyles,
  Typography,
  TextField,
  Button,
} from "@material-ui/core";
import { Users } from "./User";

const useStyles = makeStyles({
  inboxContainer: {
    width: "26%",
    margin: "0 auto",
    height: "100%",
    position: "fixed",
    // backgroundColor: "#e1f0fa",
    backgroundColor: "#d4ebfa",
    padding: "0.5rem 1rem",
  },

  userName: {
    backgroundColor: "rgb(4, 64, 121)",
    padding: "0.6rem 1rem",
    borderRadius: "20px",
    textAlign: "center",
    color: "#fff",
    fontWeight: "600",
    marginBottom: "0.7rem",
  },

  searchUser: {
    width: "91%",
    margin: "1rem 0",
    padding: "0.3rem 1rem",
    backgroundColor: "#fff",
    borderRadius: "50px",
    textDecoration: "none",
    border: "2px solid rgb(4, 64, 121)",

    "& .MuiInput-underline:before": {
      border: "none",
      transition: "none",
      content: "none",
      position: "inherit",
    },

    "& .MuiInput-underline:after": {
      border: "none",
      transition: "none",
      content: " ",
      position: "inherit",
    },
  },
  addUserBtn: {
    width: "25%",
    margin: "0 30%",
    backgroundColor: "#3ECBFF",
    color: "#fff",
    fontWeight: "bold",
    textTransform: "capitalize",

    "&:hover": {
      backgroundColor: "#3ECBFF",
    },
  },
});

export default function InboxComp(props) {
  const classes = useStyles();
  const { auth, user, setModalOpen, chatInitialize } = props;
  const [searched, setSearched] = useState("");
  const [doSearch, setDoSearch] = useState(false);

  const handleSearch = (e) => {
    console.log("search activated");
    if (e.target.value === "") setDoSearch(false);
    else {
      setDoSearch(true);
      let searchValue = e.target.value;
      console.log(searchValue);
      let sorted = user.inboxusers;
      let searchArr = sorted.filter((current) => {
        return Object.values(current).some((value) =>
          value.toString().toLowerCase().includes(searchValue)
        );
      });
      setSearched(searchArr);
      console.log(searchArr);
    }
  };

  const debouncing = function (fn, d) {
    let timer;
    return function () {
      let context = this,
        args = arguments;
      clearTimeout(timer);
      timer = setTimeout(() => {
        handleSearch.apply(context, arguments);
      }, d);
    };
  };

  const betterFunction = debouncing(handleSearch, 1000);

  return (
    <Box className={classes.inboxContainer}>
      <Box>
        <Typography
          variant="h5"
          className={classes.userName}
        >{`Hello ${auth.name}`}</Typography>
      </Box>
      <Divider />
      <TextField
        variant="standard"
        type="search"
        className={classes.searchUser}
        placeholder="Search User"
        // onKeyUp={handleSearch}
        onKeyUp={betterFunction}
      />
      <Button className={classes.addUserBtn} onClick={() => setModalOpen(true)}>
        {"Add User"}
      </Button>

      {/* Inbox User Display */}
      {doSearch ? (
        searched.length > 0 ? (
          searched?.map((item) => {
            {
              console.log(searched);
            }
            <div key={item.uid}>
              {/* {console.log(item, "happpyyy")} */}
              <Users userData={item} chatInitialize={chatInitialize} />
            </div>;
          })
        ) : (
          <p>no such data</p>
        )
      ) : (
        user?.inboxusers?.map((inbox) => {
          return (
            <div key={inbox.uid}>
              <Users userData={inbox} chatInitialize={chatInitialize} />
            </div>
          );
        })
      )}
      {/* {user?.inboxusers?.map((inbox) => {
        return (
          <div key={inbox.uid}>
            <Users userData={inbox} chatInitialize={chatInitialize} />
          </div>
        );
      })} */}
    </Box>
  );
}
