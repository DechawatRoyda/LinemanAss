import React from "react";
import "./AllRestaurant.css";
import Modal from "../components/Modal";
import {
  fetchRestaurantDetails,
  fetchShortMenu,
} from "../services/api.service";
import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";

function RestaurantPage() {
  const { restaurantId } = useParams<{ restaurantId: string | number }>();
  const [restaurantDetails, setRestaurantDetails] = useState<any>(null);
  const [shortMenu, setShortMenu] = useState<any[]>([]);
  const [basket, setBasket] = useState<any[]>(location.state?.basket || []);
  const navigate = useNavigate();

  const handleBasketClick = () => {
    navigate(`/restaurants/${restaurantId}/basket`, { state: { basket } });
  };

  useEffect(() => {
    const fetchData = async () => {
      const details = await fetchRestaurantDetails(Number(restaurantId));
      setRestaurantDetails(details);

      const menu = await Promise.all(
        details.menus.map(async (menuName: string) => {
          const shortMenuData = await fetchShortMenu(
            Number(restaurantId),
            menuName
          );
          return shortMenuData;
        })
      );
      setShortMenu(menu);
    };
    fetchData();
  }, [restaurantId]);

  const handleAddToBasket = (menuDetails: any) => {
    setBasket((prevBasket) => [...prevBasket, menuDetails]);
  };

  return (
    <div className="App">
      <div className="Box">
        <div className="container-wrap">
          <h1 className="heading">{restaurantDetails?.name}</h1>
          <p className="status-open">
            Open: {restaurantDetails?.activeTimePeriod.open} - Close:{" "}
            {restaurantDetails?.activeTimePeriod.close}
          </p>
        </div>
        {shortMenu.map((menu, index) => (
          <div className="center">
            <div className="B-div">
              <div className="container">
                <div className="container-img">
                  <img
                    className="img"
                    src={menu.thumbnailImage}
                    alt={menu.name}
                  />
                </div>
                <div className="T-name">
                  <div>{menu.name}</div>
                  <div>
                    {Number(menu.discountedPercent) > 0 ? (
                      <>
                          <span className="full-price">
                          ฿{(menu.fullPrice).toFixed(2)}
                          </span>
                            
                          <span className="discounted-price">
                          ฿{(menu.fullPrice * (1 - menu.discountedPercent / 100)).toFixed(2)}
                          </span>
                      </>
                    ) : (
                      <span className="discounted-price">฿{(menu.fullPrice).toFixed(2)}</span>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <Modal
                  restaurantId={restaurantId}
                  menuName={menu.name}
                  onAddToBasket={handleAddToBasket}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {basket.length > 0 && (<div className="fix-footer">
        <button className="pay-button" onClick={handleBasketClick}>
           <AiOutlineShoppingCart className="basket-icon"/> ({basket.length})
        </button>
      </div>)}

    </div>
  );
}

export default RestaurantPage;
