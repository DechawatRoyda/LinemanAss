import React, { useState, useEffect } from "react";
import "./Modal.css";
import { SlArrowDown } from "react-icons/sl";
import { fetchFullMenu } from "../services/api.service";

interface ModalProps {
  restaurantId: string | number;
  menuName: string;
  onAddToBasket: (menuDetails: any) => void;
}

const Modal: React.FC<ModalProps> = ({
  restaurantId,
  menuName,
  onAddToBasket,
}) => {
  const [modal, setModal] = useState<boolean>(false);
  const [menuDetails, setMenuDetails] = useState<any>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedOptions, setSelectedOptions] = useState<any>({});
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      const details = await fetchFullMenu(Number(restaurantId), menuName);
      setMenuDetails(details);
    };
    fetchData();
  }, [restaurantId, menuName]);

  const toggleModal = () => {
    setModal(!modal);
    setErrorMessage("");
  };

  const handleAddToBasket = () => {
    // Check if all options are selected
    if (menuDetails?.options && menuDetails.options.length > 0) {
      const allOptionsSelected =
        Object.keys(selectedOptions).length === menuDetails.options.length;
      if (!allOptionsSelected) {
        setErrorMessage("Please select all options before adding to basket.");
        return;
      }
    }

    const menuDetailsWithQuantityAndOptions = {
      ...menuDetails,
      quantity,
      selectedOptions,
    };
    onAddToBasket(menuDetailsWithQuantityAndOptions);
    toggleModal();
  };

  const handleOptionChange = (optionIndex: number, choiceIndex: number) => {
    setSelectedOptions((prevSelectedOptions: any) => ({
      ...prevSelectedOptions,
      [optionIndex]: choiceIndex,
    }));
  };

  if (modal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  return (
    <>
      <button onClick={toggleModal} className="btn-modal">
        Detail
      </button>
      {modal && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content">
            <button className="close-modal" onClick={toggleModal}>
              <SlArrowDown />
            </button>
            <h2 className="T-center">{menuDetails?.name}</h2>
            <img
              className="img-modal P-center"
              src={menuDetails?.thumbnailImage}
              alt={menuDetails?.name}
              height="60%"
              width="100%"
            />
            <div className="quantity-container">
              <button
                className="quantity-btn-lower"
                onClick={() => setQuantity((prevQuantity) => prevQuantity - 1)}
                disabled={quantity <= 1}
              >
                -
              </button>
              <span>{quantity}</span>
              <button
                className="quantity-btn-add"
                onClick={() => setQuantity((prevQuantity) => prevQuantity + 1)}
              >
                +
              </button>
            </div>
            <div className="grid-container">
              <div>
                {Number(menuDetails?.discountedPercent) > 0 ? (
                  <>
                    <span className="full-price">
                    ฿{(menuDetails?.fullPrice * quantity).toFixed(2)}
                    </span>

                    <span className="discounted-price">
                    ฿
                      {(
                        menuDetails?.fullPrice *
                        (1 - menuDetails?.discountedPercent / 100) *
                        quantity
                      ).toFixed(2)}
                    </span>
                  </>
                ) : (
                  <span className="discounted-price">
                    ฿{(menuDetails?.fullPrice * quantity).toFixed(2)}
                  </span>
                )}
              </div>
            </div>
            <hr />
            {menuDetails?.options && menuDetails.options.length > 0 && (
              <>
                {menuDetails.options.map((option: any, index: number) => (
                  <div key={index} className="option-container">
                    <h3 className="option-label">{option.label}</h3>
                    <div className="choice-container">
                      {option.choices.map(
                        (choice: any, choiceIndex: number) => (
                          <div
                            key={choiceIndex}
                            className={`choice ${
                              selectedOptions[index] === choiceIndex
                                ? "selected"
                                : ""
                            }`}
                            onClick={() =>
                              handleOptionChange(index, choiceIndex)
                            }
                          >
                            {choice.label}
                          </div>
                        )
                      )}
                    </div>
                  </div>
                ))}
              </>
            )}
            {errorMessage && (
              <div className="error-message">{errorMessage}</div>
            )}
            <div className="modal-actions">
              <div className="O-center">
                <button className="add-to-basket" onClick={handleAddToBasket}>
                  Add To Basket
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
