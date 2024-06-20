import Product from '../components/Product';
import { useAppDispatch, useAppSelector } from '../redux';
import { selectAllProducts, selectLoadingStatus, selectProducts } from '../redux/selectors';
import LoadingStatus from '../enum/LoadingStatus';
import { ClipLoader } from 'react-spinners';
import NotFound from '../components/NotFound'
import { useEffect } from 'react';
import { fetchProducts } from '../redux/productSlice';

const Home = () => {
  const dispatch = useAppDispatch();
  const loadingStatus = useAppSelector(selectLoadingStatus);
  const products = useAppSelector(selectProducts);

  const accessToken = useAppSelector(selectLoadingStatus);

  console.log('In component: ' + products);

  const renderContent = () => {
    switch (+loadingStatus) {
      case LoadingStatus.PENDING:
        return <ClipLoader />
      case LoadingStatus.REJECTED:
        return <NotFound />
      case LoadingStatus.FULLFILLED:
        return products.length !== 0 ? (
          <>
            {products.map((product, index) => (
              <Product
                key={index}
                product={product}
              />
            ))}
          </>
        ) : <NotFound />
    }
  };

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch])

  return (
    <main className="container my-0 mx-auto bg-white p-6">
      <div className="-mr-2.5">
        <div className="mb-6">
          <h2 className="text-3xl font-bold">Доступные лоты</h2>
        </div>
        <div className="flex flex-row flex-wrap">
          {renderContent()}
        </div>
      </div>
    </main>
  );
};

export default Home;
