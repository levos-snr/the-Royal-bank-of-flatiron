import React from "react";
import AccountContainer from "./AccountContainer";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div className="ui raised segment">
      <div className="ui segment violet inverted">
        <h2>The Royal Bank of Flatiron</h2>
      </div>
      <AccountContainer />
      <Toaster
        position="top-left"
        reverseOrder={false}
      />
    </div>
  );
}

export default App;
