import React from "react";
import Card from "../components/Card";
import axios from "axios";
import { AppContext } from "../App";
import { Link } from "react-router-dom";

function Orders() {
  const { favorites } = React.useContext(AppContext);

  const [orders, setOrders] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          "https://6510b5453ce5d181df5d775c.mockapi.io/orders"
        );
        setOrders(data.reduce((prev, obj) => [...prev, ...obj.items], []));
        setIsLoading(false);
      } catch (error) {
        alert("Error when requesting goods ");
        console.error(error);
      }
    })();
  }, []);

  function renderCards(orderItems) {
    return orderItems.map((item, index) => (
      <Card key={index} loading={isLoading} {...item} favorites={favorites} />
    ));
  }

  return (
    <div className="content p-40">
      <div className="d-flex align-center justify-between mb-40">
        <h1>Orders</h1>
      </div>
      <div className="d-flex flex-wrap">
        {isLoading ? (
          renderCards([...Array(8)])
        ) : orders.length > 0 ? (
          renderCards(orders)
        ) : (
          <div className="d-flex flex-column align-center w100p emptyCollection">
            <img width={80} src={"./img/empty-orders.jpg"} alt="EmptyOrders" />
            <h3 className="mb-10">Orders not found</h3>
            <p className="mt-5">You have not made any order</p>
            <Link to="/">
              <button className="greenButton">
                <img src="img/arrow.svg" alt="Arrow" />
                Return
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Orders;
