import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RestaurantsPage from "./pages/RestaurantsPage";
import RestaurantPage from "./pages/RestaurantPage";
import Basket from "./pages/Basket";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RestaurantsPage />} />
        <Route path="/restaurants/:restaurantId" element={<RestaurantPage />} />
        <Route path="/restaurants/:restaurantId/basket" element={<Basket />} />
      </Routes>
    </Router>
  );
}

export default App;
