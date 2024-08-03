import React from "react";
import Transaction from "./Transaction";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';


function TransactionsList({ transactions,onDelete,onEdit,currentPage,totalPages,setCurrentPage, onSortChange, sortConfigurations }) {
  
  const getSortIcon = (key) => {
    if (sortConfigurations.key !== key) {
      return faSort;
    }
    return sortConfigurations.direction === 'asc' ? faSortUp : faSortDown;
  };
  
  return (
    <>
    <table className="ui celled striped padded table">
      <tbody>
        <tr>
                    <th>
                      <h3 className="ui center aligned header" onClick={() => onSortChange('date')}>
                        Date <FontAwesomeIcon icon={getSortIcon('date')}  title='sort date'/>
                      </h3>
                    </th>
                    <th>
                      <h3 className="ui center aligned header" onClick={() => onSortChange('description')}>
                        Description <FontAwesomeIcon icon={getSortIcon('description')} title='sort description'/>
                      </h3>
                    </th>
                    <th>
                      <h3 className="ui center aligned header" onClick={() => onSortChange('category')}>
                        Category <FontAwesomeIcon icon={getSortIcon('category')} title='sort category'/>
                      </h3>
                    </th>
                    <th>
                      <h3 className="ui center aligned header" onClick={() => onSortChange('amount')}>
                        Amount <FontAwesomeIcon icon={getSortIcon('amount')} title='sort amount'/>
                      </h3>
                    </th>
                    <th>
                      <h3 className="ui center aligned header">Actions</h3>
                    </th>
                  </tr>
          {transactions.map(transaction => (
          <Transaction key={transaction.id}
          transaction={transaction}
          onEdit={onEdit}
          onDelete={onDelete}
          />
        ))}
      </tbody>
    </table>
      <div className="pagination">
             <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
               Previous
             </button>
             <span>{currentPage} of {totalPages}</span>
             <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>
               Next
             </button>
           </div>
    </>
  );
}

export default TransactionsList;
