import { useEffect, lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Shop } from "./pages";
import { checkUserSession, selectCurrentUser } from "./store";
import { Spinner } from "./components";
import { GlobalStyle } from "./global.styles";

const Navigation = lazy(() => import("./components/navigation/navigation"));
// const Shop = lazy(() => import("./pages/shop/shop"));
const Checkout = lazy(() => import("./pages/checkout/checkout"));
const Home = lazy(() => import("./pages/home/home"));
const Authentication = lazy(
  () => import("./pages/authentication/authentication")
);

const App = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);

  useEffect(() => {
    dispatch(checkUserSession());
  }, [dispatch]);

  return (
    <Suspense fallback={<Spinner />}>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<Navigation />}>
          <Route index element={<Home />} />
          <Route path="shop/*" element={<Shop />} />
          <Route
            path="auth"
            element={
              currentUser ? <Navigate to="/" replace /> : <Authentication />
            }
          />
          <Route path="checkout" element={<Checkout />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default App;
