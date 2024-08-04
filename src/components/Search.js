import React, { useState, useCallback } from "react";
import _ from "lodash";

function Search({ onSearch, filteredTransactions }) {
  const [searchTerm, setSearchTerm] = useState("");

  const debouncedSearch = useCallback(
    _.debounce((term) => {
      onSearch(term);
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
