import React from 'react';
import ProductDetail from '../../components/ProductDetail';
import ProductInfo from '../../components/ProductInfo';
import BiddingTable from '../../components/BiddingTable';

const App = () => {
  return (
    <div class="bg-gray-100 min-h-screen p-8 bg-white">
      <div className="flex justify-center w-auto p-6 rounded-lg">
        <ProductDetail />
        <ProductInfo />
      </div>
      <BiddingTable />
    </div>
  );
};

export default App;
