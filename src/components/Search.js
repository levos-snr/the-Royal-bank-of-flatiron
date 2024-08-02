import React, { useState, useCallback } from "react";
import toast from "react-hot-toast";
import { debounce } from "../utils/debounce";

function Search({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = useCallback(
    debounce(searchTerm => {
      const searchPromise = new Promise((resolve, reject) => {
        if (searchTerm) {
          onSearch(searchTerm);
          resolve();
        } else {
          onSearch(searchTerm);
          reject();
        }
      });

      toast.promise(
        searchPromise,
        {
          loading: 'Searching...',
          success: <b>Done!</b>,
          error: <b>Not Found.</b>,
        }
      );
    }, 500), // Adjust the debounce delay as needed
    []
  );

  const handleChange = e => {
    const searchTerm = e.target.value;
    setSearchTerm(searchTerm);
    handleSearch(searchTerm);
  };

  return (
    <div className="ui large fluid icon input">
      <input
        type="text"
        placeholder="Search your Recent Transactions"
        value={searchTerm}
        onChange={handleChange}
      />
      <i className="circular search link icon"></i>
    </div>
  );
}

export default Search;