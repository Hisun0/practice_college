import ProductDetail from '../components/ProductDetail';
import ProductInfo from '../components/ProductInfo';
import BiddingTable from '../components/BiddingTable';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../redux';
import { selectProductById, selectProducts } from '../redux/selectors';

const ProductPage = () => {
  const {id} = useParams();
  console.log('id: ' + id);
  const products = useAppSelector(selectProducts);

  const product = products.find((product) => parseInt(product.id) === parseInt(id));

  console.log(products);
  console.log('Product page: ' + product);

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-2xl shadow-lg">
        <ProductDetail product={product} />
        <ProductInfo product={product} />
        <BiddingTable />
      </div>
    </div>
  );
};

export default ProductPage;
