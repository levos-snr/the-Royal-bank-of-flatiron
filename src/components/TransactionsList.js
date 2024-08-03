import React from "react";
import Transaction from "./Transaction";

function TransactionsList({ transactions,onDelete,onEdit,currentPage,totalPages,setCurrentPage }) {
  return (
    <>
    <table className="ui celled striped padded table">
      <tbody>
        <tr>
          <th>
            <h3 className="ui center aligned header">Date</h3>
          </th>
          <th>
            <h3 className="ui center aligned header">Description</h3>
          </th>
          <th>
            <h3 className="ui center aligned header">Category</h3>
          </th>
          <th>
            <h3 className="ui center aligned header">Amount</h3>
          </th>
        </tr>
        {transactions.map(transaction => (
          <Transaction key={transaction.id}
          transaction={transaction}
          onEdit={onEdit}
          onDelete={onDelete}
          />
        ))}
      </tbody>
    </table>
      <div className="pagination">
              <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
                Previous
              </button>
              <span>{currentPage} of {totalPages}</span>
              <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>
                Next
              </button>
            </div>
    </>
  );
}

export default TransactionsList;
