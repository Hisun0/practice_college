import React from 'react';

// const createBid = () => {

// };

const ProductDetail = ({ product }) => {
  return (
    <div className="flex space-x-6">
      <div className="w-1/2">
        <div className="mb-4">
          <h2 className="text-xl font-bold mb-1">{product.price}</h2>
          <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
          <button className="text-white font-medium bg-indigo-600 hover:bg-indigo-700 py-2 px-4 rounded-lg">Сделать ставку</button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;