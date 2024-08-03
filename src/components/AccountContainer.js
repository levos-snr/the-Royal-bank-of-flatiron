import React, { useState, useEffect } from "react";
import TransactionsList from "./TransactionsList";
import Search from "./Search";
import AddTransactionForm from "./AddTransactionForm";
import { toast } from "react-hot-toast";

function AccountContainer() {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortConfigurations, setSortConfigurations] = useState({ key: 'date', direction: 'asc' });

  const pageSize = 10;
  
  const URL = process.env.REACT_APP_TRANSACTION_END_POINT
  
  useEffect(() => {
      fetchTransactions(currentPage, sortConfigurations);
  }, [currentPage, sortConfigurations]);

  useEffect(() => {
    fetch(URL)
      .then(response => response.json())
      .then(data => {
        setTransactions(data);
        setFilteredTransactions(data); 
      });
  }, []);
  
  const fetchTransactions = async (page, sortConfigurations) => {
   const { key, direction } = sortConfigurations;
    const response = await fetch(`${URL}?_page=${page}&_limit=${pageSize}&_sort=${key}&_order=${direction}`);
    const data = await response.json();
    setTotalPages(Math.ceil(response.headers.get("X-Total-Count") / pageSize));
    setTransactions(data);
    setFilteredTransactions(data);
  };


  const handleAddTransaction = newTransaction => {
    setTransactions([...transactions, newTransaction]);
    setFilteredTransactions([...transactions, newTransaction]);
  };
  
  const handleEditTransaction = updatedTransaction => {
    const updatedTransactions = transactions.map(transaction =>
      transaction.id === updatedTransaction.id ? updatedTransaction : transaction
    );
    setTransactions(updatedTransactions);
    setFilteredTransactions(updatedTransactions);
  };
  
  const handleEdit = transaction => {
    setEditingTransaction(transaction);
  };
  
  const handleSort = (key) => {
    const direction = sortConfigurations.direction === 'asc' ? 'desc' : 'asc';
    setSortConfigurations({ key, direction });
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
      <AddTransactionForm 
      onAddTransaction={handleAddTransaction} 
      editingTransaction={editingTransaction}
      onEditTransaction={handleEditTransaction}
      clearEditingTransaction={() => setEditingTransaction(null)}
      
      />
      <TransactionsList 
      transactions={filteredTransactions} 
      onDelete={handleDeleteTransaction}
      onEdit={handleEdit}
      currentPage={currentPage}
      totalPages={totalPages}
      setCurrentPage={setCurrentPage}
      onSortChange={handleSort}
      sortConfigurations={sortConfigurations}
      />
    </div>
  );
}

export default AccountContainer;
