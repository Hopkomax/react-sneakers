import React from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import axios from "axios";

import Header from "./components/Header";
import Drawer from "./components/Drawer";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import Orders from "./pages/Orders";

export const AppContext = React.createContext({});

function App() {
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [favorites, setFavorites] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState("");
  const [cartOpened, setCartOpened] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchData() {
      try {
        const [cartResponse, favoritesResponse, itemsResponse] =
          await Promise.all([
            axios.get("https://6510b5453ce5d181df5d775c.mockapi.io/cart"),
            axios.get("https://6510b5453ce5d181df5d775c.mockapi.io/favorites"),
            axios.get("https://6510b5453ce5d181df5d775c.mockapi.io/items"),
          ]);

        setIsLoading(false);
        setCartItems(cartResponse.data);
        setFavorites(favoritesResponse.data);
        setItems(itemsResponse.data);
      } catch (error) {
        alert("Requesting Error");
        console.error(error);
      }
    }
    fetchData();
  }, []);

  const onAddToCart = async (obj) => {
    try {
      const findItem = cartItems.find(
        (item) => Number(item.parentId) === Number(obj.id)
      );

      if (findItem) {
        await axios.delete(
          `https://6510b5453ce5d181df5d775c.mockapi.io/cart/${findItem.id}`
        );

        setCartItems((prev) =>
          prev.filter((item) => Number(item.id) !== Number(findItem.id))
        );
      } else {
        const { data } = await axios.post(
          "https://6510b5453ce5d181df5d775c.mockapi.io/cart",
          obj
        );

        console.log("New item added to cart:", data);

        setCartItems((prev) => {
          const updatedCartItems = prev.map((item) => {
            if (item.parentId === data.parentId) {
              return {
                ...item,
                id: data.id,
              };
            }
            return item;
          });

          if (
            updatedCartItems.some((item) => Number(item.id) === Number(data.id))
          ) {
            return [...updatedCartItems];
          } else {
            return [...updatedCartItems, obj];
          }
        });
      }
    } catch (error) {
      alert("Error adding to cart");
      console.error(error);
    }
  };

  const onRemoveItem = (id) => {
    try {
      axios.delete(`https://6510b5453ce5d181df5d775c.mockapi.io/cart/${id}`);
      setCartItems((prev) =>
        prev.filter((item) => Number(item.id) !== Number(id))
      );
    } catch (error) {
      alert("Error deleting from cart");
      console.error(error);
    }
  };

  const onAddToFavorite = async (obj) => {
    try {
      const findItem = favorites.find(
        (favObj) => Number(favObj.parentId) === Number(obj.id)
      );
      if (findItem) {
        await axios.delete(
          `https://6510b5453ce5d181df5d775c.mockapi.io/favorites/${findItem.id}`
        );

        setFavorites((prev) =>
          prev.filter((item) => Number(item.parentId) !== Number(obj.id))
        );
      } else {
        const { data } = await axios.post(
          `https://6510b5453ce5d181df5d775c.mockapi.io/favorites`,
          obj
        );
        setFavorites((prev) => [...prev, data]);
      }
    } catch (error) {
      alert("Failed to add to favorites");
      console.error(error);
    }
  };

  const onDeleteFromFavorite = async (obj) => {
    try {
      const existingItem = favorites.find(
        (favObj) => Number(favObj.id) === Number(obj.id)
      );

      if (existingItem) {
        await axios.delete(
          `https://6510b5453ce5d181df5d775c.mockapi.io/favorites/${obj.id}`
        );
        setFavorites((prev) =>
          prev.filter((item) => Number(item.id) !== Number(obj.id))
        );
      }
    } catch (error) {
      alert("Failed to add to favorites");
      console.error(error);
    }
  };

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  };

  const isItemAdded = (id) => {
    return cartItems.some((obj) => Number(obj.parentId) === Number(id));
  };

  return (
    <AppContext.Provider
      value={{
        items,
        cartItems,
        favorites,
        isItemAdded,
        onAddToFavorite,
        setCartOpened,
        setCartItems,
        onAddToCart,
        onDeleteFromFavorite,
      }}
    >
      <div className="wrapper clear">
        {cartOpened && (
          <Drawer
            items={cartItems}
            onClose={() => setCartOpened(false)}
            onRemove={onRemoveItem}
            opened={cartOpened}
          />
        )}

        <Header onClickCart={() => setCartOpened(true)} />
        <Routes>
          <Route
            path="/"
            element={
              <Home
                items={items}
                cartItems={cartItems}
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                onChangeSearchInput={onChangeSearchInput}
                onAddToFavorite={onAddToFavorite}
                onAddToCart={onAddToCart}
                isLoading={isLoading}
                favorites={favorites}
              />
            }
            exact
          />

          <Route path="/favorites" element={<Favorites />} />
          <Route path="/orders" element={<Orders />} />
        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default App;
