import React from 'react';

const ProductInfo = ({ product }) => {
  return (
    <div className="border p-4 rounded-lg">
      <h4 className="font-semibold mb-2">Описание</h4>
      <p>{product.description}</p>
    </div>
  );
};

export default ProductInfo;
