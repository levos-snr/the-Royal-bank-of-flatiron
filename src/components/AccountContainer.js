import React, { useState } from "react";
import TransactionsList from "./TransactionsList";
import Search from "./Search";
import AddTransactionForm from "./AddTransactionForm";
import useTransactions from "../hooks/useTransactions";
import useFilteredTransactions from "../hooks/useFilteredTransactions";
import useEditingTransaction from "../hooks/useEditingTransaction";
import {
  handleAddTransaction,
  handleEditTransaction,
  handleDeleteTransaction,
  handleSearch,
  handleSort,
} from "../services/eventHandlers";

function AccountContainer() {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfigurations, setSortConfigurations] = useState({ key: "date", direction: "asc" });
  const { transactions, setTransactions, totalPages } = useTransactions(currentPage, sortConfigurations);
  const { filteredTransactions, setFilteredTransactions } = useFilteredTransactions(transactions);
  const { editingTransaction, setEditingTransaction, handleEdit, clearEditingTransaction } = useEditingTransaction();

  return (
    <div className="down">
      <Search
        onSearch={(term) => handleSearch(term, transactions, setFilteredTransactions)}
        filteredTransactions={filteredTransactions}
      />
      <AddTransactionForm
        onAddTransaction={(newTransaction) => handleAddTransaction(newTransaction, transactions, setTransactions, setFilteredTransactions)}
        editingTransaction={editingTransaction}
        onEditTransaction={(updatedTransaction) => handleEditTransaction(updatedTransaction, transactions, setTransactions, setFilteredTransactions, setEditingTransaction)}
        clearEditingTransaction={clearEditingTransaction}
      />
      <TransactionsList
        transactions={filteredTransactions}
        onDelete={(id) => handleDeleteTransaction(id, transactions, setTransactions, setFilteredTransactions)}
        onEdit={handleEdit}
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
        onSortChange={(key) => handleSort(key, sortConfigurations, setSortConfigurations)}
        sortConfigurations={sortConfigurations}
      />
    </div>
  );
}

export default AccountContainer;
