# Bank of Flatiron
<hr>

Welcome to the Bank of Flatiron, where you can trust us with all your financial
data! 

This project is a React-based application for managing financial transactions. 
The app allows users to display,add, edit, delete, search, and sort transactions. 
It features a paginated view of transactions and provides visual indicators for sorting.
Use the below gif as an example of how the app should function.


<video width="320" height="240" controls>
  <source src="./public/Final.mp4" type="video/mp4 autoplay">
</video>

> To view in VSCode, right click on the README.md file and select "Open Preview".

## Features
- Add Transaction: Users can add new transactions.
- Edit Transaction: Users can edit existing transactions.
- Delete Transaction: Users can delete transactions.
- Search Transactions: Users can search through transactions.
- Sort Transactions: Users can sort transactions by date, description, category, and amount.
- Paginated View: Transactions are displayed in a paginated format.
- Visual Sorting Indicators: Icons indicate the current sorting order for each column.


## Technologies Used
- React: For building the user interface.
- React Hot Toast: For displaying toast notifications.
- Lodash: For debouncing search input.
- Semantic UI React: For UI components and styling.
- Font Awesome: For icons.


## Setup

```clone
git clone https://github.com/levos-snr/the-Royal-bank-of-flatiron.git
cd the-Royal-bank-of-flatiron
```

1. Run `npm install` in your terminal.

- add .env file in the root directory with the following content:
```env
REACT_APP_TRANSACTION_END_POINT=http://localhost:8001
```

2. Run `npm run server`. This will run your backend on port `8001`.

3. In a new terminal, run `npm start`. This will run your React app on port `8000`.

Make sure to open
[http://localhost:8001/transactions](http://localhost:8001/transactions) in the
browser to verify that your backend is working before you proceed!

The app uses [Semantic UI](https://semantic-ui.com/) for styling. If you see any
unfamiliar classNames on some components, don't sweat! That's coming from
Semantic UI and you shouldn't need to touch it.

If you are unfamiliar with HTML tables, take a look at the
[docs with an example here](https://www.w3schools.com/html/html_tables.asp)

## Usage
- `Add` a Transaction: Use the form to add a new transaction.
  Fill in the details and click `"Add Transaction"`.
- `Edit` a Transaction: Click the `"Edit"` button next to a transaction. 
  `Update` the details in the form and click `"Update Transaction"`.
- `Delete` a Transaction: Click the `"Delete"` button next to a transaction to remove it.
- `Search` Transactions: Use the search bar to filter transactions by typing in a term.
- `Sort` Transactions: Click on the column headers `(Date, Description, Category, Amount)`
  to sort transactions. `Arrows` indicate the current sorting direction.
- `Paginate` Transactions: Use the `"Next"` and `"Previous"` buttons to navigate through pages.
  Click on a page number to jump to a specific page.

  
### Debouncing
The search input is debounced using `lodash` to prevent excessive API calls.
- Debounce Implementation
We use Lodash's debounce function to optimize the search functionality. 
It delays the invocation of the search function until after a specified delay (500ms) 
has passed since the last time the debounced function was invoked.

```js
import _ from "lodash";

const debouncedSearch = _.debounce((searchTerm) => {
  setSearchTerm(searchTerm);
}, 500);

const handleSearch = (e) => {
  debouncedSearch(e.target.value);
};
```

### Sorting
The transactions can be sorted by `Date`, `Description`, `Category`, and `Amount`.
- Sorting Implementation
We use the `sortTransactions` function to sort transactions based on the selected column.
The function toggles the sorting order between ascending and descending when the column header is clicked.

```js
const sortTransactions = (column) => {
  const newOrder = column === sortColumn ? !sortOrder : true;
  setSortColumn(column);
  setSortOrder(newOrder);
  const sortedTransactions = [...transactions].sort((a, b) => {
    if (column === "date") {
      return newOrder ? a.date.localeCompare(b.date) : b.date.localeCompare(a.date);
    } else if (column === "description") {
      return newOrder ? a.description.localeCompare(b.description) : b.description.localeCompare(a.description);
    } else if (column === "category") {
      return newOrder ? a.category.localeCompare(b.category) : b.category.localeCompare(a.category);
    } else if (column === "amount") {
      return newOrder ? a.amount - b.amount : b.amount - a.amount;
    }
  });
  setTransactions(sortedTransactions);
};
```

### Pagination
The transactions are displayed in a paginated format with 5 transactions per page.
- Pagination Implementation
We use the `paginate` function to display transactions based on the current page number.
The function calculates the start and end index of the transactions to be displayed on the page.

```js
const paginate = (pageNumber) => {
  setCurrentPage(pageNumber);
  const startIndex = (pageNumber - 1) * transactionsPerPage;
  const endIndex = startIndex + transactionsPerPage;
  setDisplayedTransactions(transactions.slice(startIndex, endIndex));
};
```

### Visual Indicators
Icons are used to indicate the current sorting order for each column.
- Visual Indicators Implementation
We use conditional rendering to display the appropriate icon based on the sorting order of the column.
The `Arrow Up` and `Arrow Down` icons indicate ascending and descending sorting order, respectively.

```js
const renderSortIndicator = (column) => {
  if (sortColumn === column) {
    return sortOrder ? <Icon name="arrow up" /> : <Icon name="arrow down" />;
  }
  return null;
};
```

### Toast Notifications
Toast notifications are displayed for successful and error messages.
- Toast Notifications Implementation
We use `react-hot-toast` to display toast notifications for success and error messages.
The `toast.success` and `toast.error` functions are used to show the appropriate message to the user.

```js
import { toast } from "react-hot-toast";

const handleAddTransaction = async (transaction) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_TRANSACTION_END_POINT}/transactions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(transaction),
    });
    if (response.ok) {
      const data = await response.json();
      setTransactions([...transactions, data]);
      toast.success("Transaction added successfully!");
    } else {
      toast.error("Failed to add transaction. Please try again.");
    }
  } catch (error) {
    toast.error("An error occurred. Please try again.");
  }
};
```


## Endpoints

The base URL for your backend is: `http://localhost:8001`

## Core Deliverables

As a user, I should be able to:

- See a table of the transactions.
- Fill out and submit the form to add a new transaction. This should add the new
  transaction to the table **as well as post the new transaction to the backend
  API for persistence**.
- Filter transactions by typing into the search bar. Only transactions with a
  description matching the search term should be shown in the transactions
  table.



### Endpoints for Core Deliverables

#### GET /transactions

Example Response:

```json
[
  {
    "id": 1,
    "date": "2019-12-01",
    "description": "Paycheck from Bob's Burgers",
    "category": "Income",
    "amount": 1000
  },
  {
    "id": 2,
    "date": "2019-12-01",
    "description": "South by Southwest Quinoa Bowl at Fresh & Co",
    "category": "Food",
    "amount": -10.55
  }
]
```

#### POST `/transactions`

Required Headers:

```js
{
  "Content-Type": "application/json"
}
```

Request Object:

```json
{
  "date": "string",
  "description": "string",
  "category": "string",
  "amount": number
}
```

Example Response:

```json
{
  "id": 1,
  "date": "2019-12-01",
  "description": "Paycheck from Bob's Burgers",
  "category": "Income",
  "amount": 1000
}
```

## Advanced Deliverables

These deliverables are not required to pass the code challenge, but if you have
the extra time, or even after the code challenge, they are a great way to
stretch your skills.

> Note: If you are going to attempt these advanced deliverables, please be sure
> to have a working commit with all the Core Deliverables first!

As a user, I should be able to:

- Sort transactions alphabetically by category or description.
- Delete a transaction which will remove it from the table and delete it from the backend.
- Sort transactions by date, description, category, and amount. Clicking on a
  column header should toggle the sorting order between ascending and
  descending. The column that is currently sorted should have a visual indicator
  to show which column is being used for sorting and whether the sort is
  ascending or descending.
- Edit a transaction. Clicking on a transaction's row should populate the form
  with the transaction's data, allowing the user to edit the transaction. Submitting
  the form should update the transaction in the table **as well as patch the
  updated transaction to the backend API for persistence**.
- Use toast notifications to display success and error messages when adding,
editing, and deleting transactions.
- Implement pagination for the transactions table. The table should display 10
  transactions per page. The user should be able to navigate to the next and
  previous pages as well as jump to a specific page.

### Endpoints for Advanced Deliverables

#### DELETE /transactions/:id

Example Response:

```json
{}
```

#### PATCH /transactions/:id

Request Object:

```json
{
  "date": "string",
  "description": "string",
  "category": "string",
  "amount": number
}
```

Example Response:

```json
{
  "id": 1,
  "date": "2019-12-01",
  "description": "Paycheck from Bob's Burgers",
  "category": "Income",
  "amount": 1000
}
```

### References

- [React](https://reactjs.org/)
- [Semantic UI React](https://react.semantic-ui.com/)
- [react-hot-toast](https://react-hot-toast.com/)
- [React Icons](https://react-icons.github.io/react-icons/)
- [React Paginate](https://www.npmjs.com/package/react-paginate)
- [React useState](https://reactjs.org/docs/hooks-state.html)
- [use-debounce](https://www.npmjs.com/package/use-debounce)
- [JSON Server](https://www.npmjs.com/package/json-server)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.



