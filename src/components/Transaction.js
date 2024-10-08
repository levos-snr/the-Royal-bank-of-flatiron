import React from "react";

function Transaction({ transaction, onDelete, onEdit }) {
  const { id, date, description, category, amount } = transaction;
  return (
    <tr>
      <td>{date}</td>
      <td>{description}</td>
      <td>{category}</td>
      <td>{amount}</td>
      <td>
        <button className="ui button" onClick={() => onEdit(transaction)}>Edit</button>
        <button className="ui red button" onClick={() => onDelete(id)}>Delete</button>
      </td>
    </tr>
  );
}

export default Transaction;
