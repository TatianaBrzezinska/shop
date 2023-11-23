import { Routes, Route } from 'react-router-dom';

import Home from './pages/home/home';
import SignIn from './pages/sign-in/sign-in';
import Navigation from './components/navigation/navigation';

const Shop = () => {
  return <h1>I am the shop page</h1>;
};

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path='shop' element={<Shop />} />
        <Route path='sign-in' element={<SignIn />} />
      </Route>
    </Routes>
  );
};

export default App;