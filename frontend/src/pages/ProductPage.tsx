import ProductDetail from '../components/ProductDetail';
import ProductInfo from '../components/ProductInfo';
import BiddingTable from '../components/BiddingTable';

const ProductPage = () => {
  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <ProductDetail />
        <ProductInfo />
        <BiddingTable />
      </div>
    </div>
  );
};

export default ProductPage;
