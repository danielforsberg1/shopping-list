import React, { useState } from 'react';
import './ShoppingList.css';

const TrashIcon = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="18" 
    height="18" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="#E53E3E" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M3 6h18"></path>
    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
  </svg>
);

const ShoppingListApp = () => {
  const [items, setItems] = useState([]);
  const [inputValue, setInputValue] = useState('');
  
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
  
  const handleAddItem = () => {
    if (inputValue.trim() !== '') {
      setItems([...items, { 
        id: Date.now(), 
        name: inputValue.trim(), 
        completed: false 
      }]);
      setInputValue('');
    }
  };
  
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddItem();
    }
  };
  
  const toggleItemCompletion = (id) => {
    setItems(
      items.map(item => 
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };
  
  const deleteItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };
  
  return (
    <div className="shopping-list-container p-6 max-w-md mx-auto bg-white rounded-xl shadow-md">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Shopping List</h1>
      
      <div className="flex mb-4">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          placeholder="Add an item..."
          className="flex-grow p-2 border border-gray-300 rounded-l focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button 
          onClick={handleAddItem}
          className="add-button bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Add
        </button>
      </div>
      
      {items.length === 0 ? (
        <p className="empty-list text-gray-500 italic">Your shopping list is empty</p>
      ) : (
        <table className="w-full">
          <tbody>
            {items.map(item => (
              <tr key={item.id} className="border-b border-gray-100 last:border-b-0">
                <td className="py-3 pl-2 w-8">
                  <input
                    type="checkbox"
                    checked={item.completed}
                    onChange={() => toggleItemCompletion(item.id)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                </td>
                <td className="py-3">
                  <span className={item.completed ? 'item-completed' : 'text-gray-700'}>
                    {item.name}
                  </span>
                </td>
                <td className="py-3 pr-2 w-10 text-right">
                  <button
                    onClick={() => deleteItem(item.id)}
                    className="delete-button p-1 rounded-full hover:bg-red-100 focus:outline-none inline-flex"
                    aria-label="Delete item"
                  >
                    <TrashIcon />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      
      {items.length > 0 && (
        <div className="item-counter mt-4 text-sm text-gray-500">
          {items.filter(item => item.completed).length} of {items.length} items completed
        </div>
      )}
    </div>
  );
};

export default ShoppingListApp;