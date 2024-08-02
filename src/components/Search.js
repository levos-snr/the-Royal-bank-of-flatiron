import React from "react";

function Search({ searchDes, setSearchDes }) {
  return (
    <div className="ui large fluid icon input">
      <input
        type="text"
        placeholder="Search your Recent Transactions"
        value={searchDes}
        onChange={e => setSearchDes(e.target.value)}
      />
      <i className="circular search link icon"></i>
    </div>
  );
}

export default Search;