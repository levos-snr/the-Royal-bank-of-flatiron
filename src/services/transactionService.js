const API_URL = process.env.REACT_APP_TRANSACTION_END_POINT;

export const fetchTransactions = async (currentPage, sortConfigurations) => {
  const response = await fetch(`${API_URL}?_page=${currentPage}&_limit=10&_sort=${sortConfigurations.key}&_order=${sortConfigurations.direction}`);
  const totalTransactions = response.headers.get("X-Total-Count");
  const totalPages = Math.ceil(totalTransactions / 10);
  const transactions = await response.json();
  return { transactions, totalPages };
};

export const addTransaction = async (transaction) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(transaction),
  });
  return await response.json();
};

export const updateTransaction = async (transaction) => {
  const response = await fetch(`${API_URL}/${transaction.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(transaction),
  });
  return await response.json();
};

export const deleteTransaction = async (id) => {
  await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
};