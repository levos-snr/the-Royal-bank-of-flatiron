import { useState, useEffect } from "react";

const useFilteredTransactions = (transactions) => {
  const [filteredTransactions, setFilteredTransactions] = useState(transactions);

  useEffect(() => {
    setFilteredTransactions(transactions);
  }, [transactions]);

  return { filteredTransactions, setFilteredTransactions };
};

export default useFilteredTransactions;
