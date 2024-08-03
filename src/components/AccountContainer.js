import React, { useState, useEffect } from "react";
import TransactionsList from "./TransactionsList";
import Search from "./Search";
import AddTransactionForm from "./AddTransactionForm";
import { toast } from "react-hot-toast";

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
  }, [URL]);

  const handleAddTransaction = newTransaction => {
    setTransactions([...transactions, newTransaction]);
    setFilteredTransactions([...transactions, newTransaction]);
  };

   const handleSearch = (searchTerm) => {
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
          
  
  async function handleDeleteTransaction(id) {
    const URL = `${process.env.REACT_APP_TRANSACTION_END_POINT}/${id}`
    const response = await fetch(URL, {
      method: "DELETE",
    });
    if (response.ok) {
      const updatedTransactions = transactions.filter(
        transaction => transaction.id !== id
      );
      setTransactions(updatedTransactions);
      setFilteredTransactions(updatedTransactions);
      toast.success(`Transaction ID:${id} Deleted!`);
    } else {
      toast.error("Transaction Failed to Delete!");
    }
  }
     

  return (
    <div className="down">
      <Search onSearch={handleSearch} transactions={filteredTransactions}/>
      <AddTransactionForm onAddTransaction={handleAddTransaction} />
      <TransactionsList 
      transactions={filteredTransactions} 
      onDelete={handleDeleteTransaction}
      />
    </div>
  );
}

export default AccountContainer;
