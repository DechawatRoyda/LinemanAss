import { useParams, useLocation, useNavigate } from "react-router-dom";
import { SlArrowLeft } from "react-icons/sl";
import "./Basket.css";
import { AiOutlineShoppingCart } from "react-icons/ai";

function Basket() {
  const { restaurantId } = useParams<{ restaurantId: string | number }>();
  const location = useLocation();
  const navigate = useNavigate();
  const { basket } = location.state;

  const handleBackClick = () => {
    navigate(`/restaurants/${restaurantId}`, { state: { basket } });
  };

  const calculateTotalPrice = () => {
    return basket.reduce((total, item) => {
      const discountedPrice = item.discountedPercent
        ? item.fullPrice * (1 - item.discountedPercent / 100)
        : item.fullPrice;
      return total + discountedPrice * item.quantity;
    }, 0);
  };

  return (
    <div className="basket-container">
      <div className="container-wrap">
      
        <div className=" head-basket">
        <button className="back-button" onClick={handleBackClick}>
          <SlArrowLeft />
        </button>
          <AiOutlineShoppingCart className="basket-icon-head" />
          <div>BASKET</div>
        </div>
      </div>
      {basket.map((item, index) => (
        <div key={index} className="basket-item">
          <div className="basket-item-image">
            <img src={item.thumbnailImage || item.largeImage} alt={item.name} />
          </div>
          <div className="basket-item-details">
            <h3>{item.name}</h3>
            <div className="basket-item-price">
              {item.discountedPercent > 0 ? (
                <>
                  <span className="full-price">
                  ฿{(item.fullPrice * item.quantity).toFixed(2)}
                  </span>

                  <span className="discounted-price">
                  ฿
                    {(
                      item.fullPrice *
                      (1 - item.discountedPercent / 100) *
                      item.quantity
                    ).toFixed(2)}
                  </span>
                </>
              ) : (
                <span className="discounted-price">
                  ฿{(item.fullPrice * item.quantity).toFixed(2)}
                </span>
              )}
            </div>
            <div className="basket-item-quantity">
              Quantity: {item.quantity}
            </div>
            <div className="basket-item-options">
              {item.options.map((option, optionIndex) => (
                <div key={optionIndex} className="basket-item-option">
                  <span className="option-label">{option.label}: </span>
                  <span className="option-choice">
                    {option.choices[item.selectedOptions[optionIndex]].label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
      <div className="total-price pb20px">
          Total: ฿{calculateTotalPrice().toFixed(2)}
      </div>
    </div>
  );
}

export default Basket;
