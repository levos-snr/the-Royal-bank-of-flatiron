import React from "react";
import AccountContainer from "./AccountContainer";
import { Toaster } from "react-hot-toast";
import Header from "./Header";




function App() {
 
  return (
    <>
    
    <div className="ui raised segment ">
    <Header />
      <AccountContainer />
      <Toaster
        position="top-right"
        reverseOrder={false}
      />
    </div>
    </>
  );
}

export default App;
