import React from "react";
import AccountContainer from "./AccountContainer";
import { Toaster } from "react-hot-toast";
// import { transactions }   from "../db";

function App() {
  // console.log(transactions);
  return (
    <div className="ui raised segment ">
      <div className="ui segment violet inverted">
        <h2>The Royal Bank of Flatiron</h2>
      </div>
      <AccountContainer />
      <Toaster
        position="top-right"
        reverseOrder={false}
      />
    </div>
  );
}

export default App;
