import React, { useState, useCallback } from "react";
import toast from "react-hot-toast";
import _ from "lodash";

function Search({ onSearch ,transactions}) {
  const [searchTerm, setSearchTerm] = useState("");

  // Debounce the onSearch function using lodash
  const debouncedSearch = useCallback(
    _.debounce((term) => {
      const searchPromise = new Promise((resolve, reject) => {
        if (term === "" || transactions.some((transaction) => 
          transaction.description.toLowerCase()
            .includes(term
              .toLowerCase()))) {
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
          success: <b>Showing transactions </b>,
          error: <b>No transactions found</b>
        }
      );
    }, 500),
    [onSearch]
  );

  const handleChange = (e) => {
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
