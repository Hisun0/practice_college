import Header from './components/Header';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ProductRoutes from './routes/ProductRoutes';
import AddProduct from './pages/AddProduct';
import { useEffect, useState } from 'react';
import { useAppDispatch } from './redux';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      setIsLoggedIn(true);
    }
  }, [dispatch]);

  return (
    <>
      <Header isLoggedIn={isLoggedIn} />
      <Routes>
        <Route path="/" Component={Home} />
        <Route path='/auth/login' Component={Login} />
        <Route path='/auth/register' element={<Register setIsLoggedIn={setIsLoggedIn} />} />
        <Route path='/product/*' Component={ProductRoutes} />
        <Route path='/additem' Component={AddProduct} />
      </Routes>
    </>
  )
}

export default App
