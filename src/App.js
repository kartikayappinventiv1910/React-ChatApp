import logo from './logo.svg';
import './App.css';
import React from "react";
import WebChat from "./WebChat";
import { Provider } from "react-redux";
import { store } from "./store";

function App() {
  return (
    <Provider store={store}>
      <WebChat />
    </Provider>
  );
}

export default App;
