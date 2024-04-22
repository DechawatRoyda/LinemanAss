import React from "react";
import "./AllRestaurant.css";
import Modal from "../components/Modal";
import { fetchRestaurants, fetchRestaurantDetails } from "../services/api.service";
import { useState, useEffect } from 'react';

function TestNaja() {
  const [restaurants, setRestaurants] = useState<{ id: number; details: any }[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const { restaurantIds } = await fetchRestaurants();
      const restaurantDetails = await Promise.all(
        restaurantIds.map(async (id: number) => ({
          id,
          details: await fetchRestaurantDetails(id),
        }))
      );
      setRestaurants(restaurantDetails);
    };
    fetchData();
  }, []);

  return (
    <div className="App">
      <div className="Box">
        <div className="container-wrap">
          <h1 className="heading">ชื่อร้านอาหาร</h1>
          <p className="status-open">สถานะเปิดปิด</p>
        </div>
        <div className="center">
          <div className="B-div">
            <div className="container">
              <img
                className="img"
                src="https://img.wongnai.com/p/1920x0/2021/08/14/f6ae0252eb0d44b79553c0dba6e56cfe.jpg"
                alt=""
              />
              <div className="T-name">
                <div>ชื่ออาหาร</div>
                <div>ราคาอาหาร</div>
              </div>
            </div>
            <div>
              <Modal />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TestNaja;
