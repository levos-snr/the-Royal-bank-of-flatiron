import React, { useState, useEffect } from "react";

function AddTransactionForm({ onAddTransaction, editingTransaction, onEditTransaction, clearEditingTransaction }) {
  const [formData, setFormData] = useState({
    date: "",
    description: "",
    category: "",
    amount: 0,
  });

  useEffect(() => {
    if (editingTransaction) {
      setFormData(editingTransaction);
    }
  }, [editingTransaction]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingTransaction) {
      onEditTransaction(formData);
    } else {
      onAddTransaction(formData);
    }
    setFormData({
      date: "",
      description: "",
      category: "",
      amount: 0,
    });
  };

  return (
    <div className="ui segment">
      <form className="ui form" onSubmit={handleSubmit}>
        <div className="inline fields">
          <input type="date" name="date" value={formData.date} onChange={handleChange} />
          <input type="text" name="description" placeholder="Description" value={formData.description} onChange={handleChange} />
          <input type="text" name="category" placeholder="Category" value={formData.category} onChange={handleChange} />
          <input type="number" name="amount" placeholder="Amount" step="0.01" value={formData.amount} onChange={handleChange} />
        </div>
        <button className="ui button" type="submit">
          {editingTransaction ? "Update Transaction" : "Add Transaction"}
        </button>
        {editingTransaction && (
          <button className="ui button" onClick={clearEditingTransaction}>
            Cancel
          </button>
        )}
      </form>
    </div>
  );
}

export default AddTransactionForm;
