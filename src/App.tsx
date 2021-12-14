import React from "react";
import "./styles/App.css";
import Boards from "./Boards/Boards";
// import ModalWelcome from "./Modals/ModalWelcome";

const App = () => {
  return (
    <div className="app">
      {/* <ModalWelcome /> */}
      <Boards />
    </div>
  );
};

export default App;
