import toast from "react-hot-toast";
import {
  addTransaction,
  updateTransaction,
  deleteTransaction,
} from "./transactionService";

export const handleAddTransaction = async (newTransaction, transactions, setTransactions, setFilteredTransactions) => {
  try {
    const addedTransaction = await addTransaction(newTransaction);
    const updatedTransactions = [addedTransaction, ...transactions];
    setTransactions(updatedTransactions);
    setFilteredTransactions(updatedTransactions);
    toast.success(`Transaction ID:${addedTransaction.id} added successfully!`);
  } catch (error) {
    toast.error("Failed to add transaction.");
  }
};

export const handleEditTransaction = async (updatedTransaction, transactions, setTransactions, setFilteredTransactions, setEditingTransaction) => {
  try {
    const editedTransaction = await updateTransaction(updatedTransaction);
    const updatedTransactions = transactions.map((transaction) =>
      transaction.id === editedTransaction.id ? editedTransaction : transaction
    );
    setTransactions(updatedTransactions);
    setFilteredTransactions(updatedTransactions);
    setEditingTransaction(null);
    toast.success(`Transaction ID:${editedTransaction.id} updated successfully!`);
  } catch (error) {
    toast.error("Failed to update transaction.");
  }
};

export const handleDeleteTransaction = async (id, transactions, setTransactions, setFilteredTransactions) => {
  try {
    await deleteTransaction(id);
    const updatedTransactions = transactions.filter((transaction) => transaction.id !== id);
    setTransactions(updatedTransactions);
    setFilteredTransactions(updatedTransactions);
    toast.success(`Transaction ID:${id} deleted successfully!`);
  } catch (error) {
    toast.error("Failed to delete transaction.");
  }
};

export const handleSearch = (term, transactions, setFilteredTransactions) => {
  try {
    const filteredTransactions = transactions.filter((transaction) =>
      transaction.description.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredTransactions(filteredTransactions);
    toast.success(`Found ${filteredTransactions.length} transactions.`);
  } catch (error) {
    toast.error("Search failed.");
   
  }
};

export const handleSort = (key, sortConfigurations, setSortConfigurations) => {
  const direction = sortConfigurations.key === key && sortConfigurations.direction === "asc" ? "desc" : "asc";
  setSortConfigurations({ key, direction });
  toast.success(`Sorted by ${key} in ${direction} order.`);
  
};
