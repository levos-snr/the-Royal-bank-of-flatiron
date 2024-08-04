import React from "react";
import "../index.css";
import { Button } from 'semantic-ui-react'
import Transaction from "./Transaction";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSort,
  faSortUp,
  faSortDown,
} from "@fortawesome/free-solid-svg-icons";


function TransactionsList({
  transactions,
  onDelete,
  onEdit,
  currentPage,
  totalPages,
  setCurrentPage,
  onSortChange,
  sortConfigurations,
}) {
  const getSortIcon = (key) => {
    if (sortConfigurations.key !== key) {
      return faSort;
    }
    return sortConfigurations.direction === "asc" ? faSortUp : faSortDown;
  };

  return (
    <div className="transactions-list">
      <table className="ui celled striped padded table">
        <thead>
          <tr>
            <th>
              <h3
                className="ui center aligned header sortable"
                onClick={() => onSortChange("date")}
              >
                Date{" "}
                <FontAwesomeIcon
                  icon={getSortIcon("date")}
                  title="Sort by date"
                  className="sort-icon"
                />
              </h3>
            </th>
            <th>
              <h3
                className="ui center aligned header sortable"
                onClick={() => onSortChange("description")}
              >
                Description{" "}
                <FontAwesomeIcon
                  icon={getSortIcon("description")}
                  title="Sort by description"
                  className="sort-icon"
                />
              </h3>
            </th>
            <th>
              <h3
                className="ui center aligned header sortable"
                onClick={() => onSortChange("category")}
              >
                Category{" "}
                <FontAwesomeIcon
                  icon={getSortIcon("category")}
                  title="Sort by category"
                  className="sort-icon"
                />
              </h3>
            </th>
            <th>
              <h3
                className="ui center aligned header sortable"
                onClick={() => onSortChange("amount")}
              >
                Amount{" "}
                <FontAwesomeIcon
                  icon={getSortIcon("amount")}
                  title="Sort by amount"
                  className="sort-icon"
                />
              </h3>
            </th>
            <th>
              <h3 className="ui center aligned header">Actions</h3>
            </th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <Transaction
              key={transaction.id}
              transaction={transaction}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </tbody>
      </table>
      <div className="pagination-controls">
        <button
          
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="ui button primary "
        >
          Previous
        </button>
        <span className="page-info">
          {currentPage} of {totalPages}
        </span>
        <button
          
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="ui button primary "
          value="Next"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default TransactionsList;
