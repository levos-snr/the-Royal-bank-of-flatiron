import { useState } from "react";

const useEditingTransaction = () => {
  const [editingTransaction, setEditingTransaction] = useState(null);

  const handleEdit = (transaction) => {
    setEditingTransaction(transaction);
  };

  const clearEditingTransaction = () => {
    setEditingTransaction(null);
  };

  return { editingTransaction, setEditingTransaction, handleEdit, clearEditingTransaction };
};

export default useEditingTransaction;
