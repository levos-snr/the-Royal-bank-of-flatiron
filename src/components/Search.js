import React, { useState, useCallback } from "react";
import toast from "react-hot-toast";
import { debounce } from "../utils/debounce";

function Search({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");

  const debouncedSearch = useCallback(
    debounce(term => {
      const searchPromise = new Promise((resolve, reject) => {
        if (term) {
          onSearch(term);
          resolve();
        } else {
          onSearch(term);
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
    }, 500),
    [onSearch]
  );

  const handleChange = e => {
    const term = e.target.value;
    setSearchTerm(term);
    debouncedSearch(term);
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