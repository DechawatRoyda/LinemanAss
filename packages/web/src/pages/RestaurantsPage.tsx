import React from "react";
import "./AllRestaurant.css";
import Modal from "../components/Modal";
import {
  fetchRestaurants,
  fetchRestaurantDetails,
} from "../services/api.service";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function RestaurantsPage() {
  const [restaurants, setRestaurants] = useState<
    { id: number; details: any }[]
  >([]);

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
      {restaurants.map(({ id, details }) => (

          <div className="Box pt30px" >
            <div className="center">

              <div className="B-div-home p-10 ">
              <Link  key={id} to={`/restaurants/${id}`}>
                <div className="container">
                  <img
                    className="img"
                    src={details.coverImage}
                    alt={details.name}
                  />
                  <div className="T-name">
                    <h1 className="heading">{details.name}</h1>
                    <p className="status-open">
                      Open: {details.activeTimePeriod.open} - Close:{" "}
                      {details.activeTimePeriod.close}
                    </p>
                  </div>
                </div>
                </Link>
              </div>

            </div>
          </div>

      ))}
    </div>
    
  );
}

export default RestaurantsPage;
