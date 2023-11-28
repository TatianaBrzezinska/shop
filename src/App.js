import { useContext } from "react";
import { Routes, Route, Navigate, } from 'react-router-dom';

import { UserContext } from "./contexts/user";

import { Home, Authentication, Shop, Checkout } from './pages';
import { Navigation } from './components';



const App = () => {
  const { currentUser } = useContext(UserContext);
  return (
    <Routes>
      <Route path='/' element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path='shop' element={<Shop />} />
        <Route
          path="auth"
          element={
            currentUser ? <Navigate to="/" replace /> : <Authentication />
          }
        />
        <Route path='checkout' element={<Checkout />} />
      </Route>
    </Routes>
  );
};

export default App;