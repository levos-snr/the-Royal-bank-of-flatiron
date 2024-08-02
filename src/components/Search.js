import React, { useState } from "react";
import toast from "react-hot-toast";

function Search({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = e => {
    setSearchTerm(e.target.value);

    const searchPromise = new Promise((resolve, reject) => {
      setTimeout(() => {
        if (e.target.value) {
          resolve();
        } else {
          reject();
        }
      }, 1000);
    });

    toast.promise(
      searchPromise,
      {
        loading: 'Searching...',
        success: <b>Done!</b>,
        error: <b>Not Found.</b>,
      }
    );

    onSearch(e.target.value);
  };

  return (
    <div className="ui large fluid icon input">
      <input
        type="text"
        placeholder="Search your Recent Transactions"
        value={searchTerm}
        onChange={handleSearch}
      />
      <i className="circular search link icon"></i>
    </div>
  );
}

export default Search;