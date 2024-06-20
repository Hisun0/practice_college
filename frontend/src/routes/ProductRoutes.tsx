import { Route, Routes } from 'react-router-dom';
import ProductPage from '../pages/ProductPage';

const ProductRoutes = () => (
  <Routes>
    <Route path=":id" element={<ProductPage />} />
  </Routes>
);

export default ProductRoutes;
