import React, { useState, useEffect } from "react";
import TransactionsList from "./TransactionsList";
import Search from "./Search";
import AddTransactionForm from "./AddTransactionForm";

function AccountContainer() {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  
  const URL = process.env.REACT_APP_TRANSACTION_END_POINT

  useEffect(() => {
    fetch(URL)
      .then(response => response.json())
      .then(data => {
        setTransactions(data);
        setFilteredTransactions(data); 
      });
  }, []);

  const handleAddTransaction = newTransaction => {
    setTransactions([...transactions, newTransaction]);
    setFilteredTransactions([...transactions, newTransaction]);
  };

  const handleSearch = searchTerm => {
    if (searchTerm === "") {
      setFilteredTransactions(transactions);
    } else {
      setFilteredTransactions(
        transactions.filter(transaction =>
          transaction.description.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
  };

  return (
    <div>
      <Search onSearch={handleSearch} transactions={filteredTransactions}/>
      <AddTransactionForm onAddTransaction={handleAddTransaction} />
      <TransactionsList transactions={filteredTransactions} />
    </div>
  );
}

export default AccountContainer;
