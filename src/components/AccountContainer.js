import React, { useState, useEffect } from "react";
import TransactionsList from "./TransactionsList";
import Search from "./Search";
import AddTransactionForm from "./AddTransactionForm";

function AccountContainer() {
  const [transactions, setTransactions] = useState([]);
  const [searchDes, setSearchDes] = useState("");
  
  useEffect(() => {
     fetch("http://localhost:8001/transactions")
       .then(response => response.json())
       .then(data => setTransactions(data));
   }, []);
  
  const handleAddTransaction = newTransaction => {
      setTransactions([...transactions, newTransaction]);
    };
  
    const filteredTransactions = transactions.filter(transaction =>
      transaction.description.toLowerCase().includes(searchDes.toLowerCase())
    );
  
    return (
      <div>
        <Search searchDes={searchDes} setSearchDes={setSearchDes} />
        <AddTransactionForm onAddTransaction={handleAddTransaction} />
        <TransactionsList transactions={filteredTransactions} />
      </div>
    );
  }
  
  export default AccountContainer;
