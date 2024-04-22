

// add
import { HiFire } from "react-icons/hi2";
import { BiSolidDiscount } from "react-icons/bi";
//ad


function Stproduct() {
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

    <>
      <div className="App">
        <div className="Box">
          <div className="container-wrap">
            <h1 className="heading">ชื่อร้านอาหาร</h1>
            <p className="status-open">สถานะเปิดปิด</p>
          </div>

          {/* Hot-product */}
          <div className="center">
            <div className="B-div">
              <div className="container">
                <div className="container-img">
                  <img
                    className="img"
                    src="https://img.wongnai.com/p/1920x0/2021/08/14/f6ae0252eb0d44b79553c0dba6e56cfe.jpg"
                    alt=""
                  />
                </div>
                <div className="T-name">
                  <div>ชื่ออาหาร</div>
                  <div>ราคาอาหาร</div>
                  <div className="Hot-product">
                    <HiFire />
                    Promotion
                  </div>
                </div>
              </div>
              <div>
                <Modal />
              </div>
            </div>
          </div>

          {/* discount */}
          <div className="center">
            <div className="B-div">
              <div className="container">
                <div className="container-img">
                  <img
                    className="img"
                    src="https://img.wongnai.com/p/1920x0/2021/08/14/f6ae0252eb0d44b79553c0dba6e56cfe.jpg"
                    alt=""
                  />
                </div>
                <div className="T-name">
                  <div>ชื่ออาหาร</div>
                  <div className="row">
                    <div className="pr-10">
                      {" "}
                      <del>ราคาอาหารเก่า</del>
                    </div>
                    <div>ราคาอาหารใหม่</div>
                  </div>

                  <div className="Discount-product">
                    <BiSolidDiscount />
                    Discount
                  </div>
                </div>
              </div>
              <div>
                <Modal />
              </div>
            </div>
          </div>

          {/* empty */}
          <div className="center Empty-product">
            <div className="B-div">
              <div className="container">
                <div className="container-img">
                  <img
                    className="img"
                    src="https://img.wongnai.com/p/1920x0/2021/08/14/f6ae0252eb0d44b79553c0dba6e56cfe.jpg"
                    alt=""
                  />
                </div>
                <div className="T-name">
                  <div>ชื่ออาหาร</div>
                  <div>ราคาอาหาร</div>
                  <div>Empty</div>
                </div>
              </div>
              <div></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Stproduct;
