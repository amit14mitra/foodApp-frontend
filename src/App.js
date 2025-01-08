import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React, { useState } from 'react';

import Register from './usercomponents/Register';
import Login from './usercomponents/Login';
import Home from './usercomponents/Home';
import Welcome from './usercomponents/Welcome';
import Cart from './cartcomponents/Cart';
import SuccessPage from './cartcomponents/SuccessPage';
import FailurePage from './cartcomponents/FailurePage';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [cartItems, setCartItems] = useState([]);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
            path="/home"
            element={<Home cartItems={cartItems} setCartItems={setCartItems} />}
          />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Welcome />} />
          <Route path="/Cart" element={<Cart />} />
          <Route path="/success" element={<SuccessPage />} />
          <Route path="/cancel" element={<FailurePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
