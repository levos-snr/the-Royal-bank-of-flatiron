import { useState, useEffect } from "react";
import { fetchTransactions } from "../services/transactionService";

const useTransactions = (currentPage, sortConfigurations) => {
  const [transactions, setTransactions] = useState([]);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const getTransactions = async () => {
      const { transactions, totalPages } = await fetchTransactions(currentPage, sortConfigurations);
      setTransactions(transactions);
      setTotalPages(totalPages);
    };

    getTransactions();
  }, [currentPage, sortConfigurations]);

  return { transactions, setTransactions, totalPages };
};

export default useTransactions;
