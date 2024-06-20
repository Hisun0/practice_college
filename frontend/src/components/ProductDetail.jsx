"use client";
import React, { useState } from 'react';

const ProductDetail = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [input, setInput] = useState(1000);

  const handleClick = () => {
    setIsFormOpen(!isFormOpen);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsFormOpen(!isFormOpen);
  };

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  return (
    <div className="flex space-x-6">
      <div className="w-1/2">
        <div className="mb-4">
          <h2 className="text-xl font-bold">$56</h2>
          <h3 className="text-lg font-semibold">Product name</h3>
          <p className="text-gray-600 mb-4">Body text for describing why this product is simply a must-buy</p>
          <button className="text-white font-medium bg-indigo-600 hover:bg-indigo-700 py-2 px-4 rounded-lg" onClick={handleClick}>Сделать ставку</button>
        </div>
      </div>
      {isFormOpen && (
        <form className="bg-gray-100 p-4 rounded-lg shadow-md w-full max-w-sm" onSubmit={handleSubmit}>
          <label htmlFor="bid" className="block text-sm font-medium text-gray-700 mb-2">Ваша ставка:</label>
          <input 
            type="number" 
            id="bid" 
            value={input} 
            onChange={handleChange} 
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm mb-4"
          />
          <button type="submit" className="text-white font-medium bg-indigo-600 hover:bg-indigo-700 py-2 px-4 rounded-lg">Принять ставку</button>
        </form>
      )}
    </div>
  );
};

export default ProductDetail;
