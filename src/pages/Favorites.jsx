import React from "react";
import { AppContext } from "../App";
import { Link } from "react-router-dom";

import Card from "../components/Card";
function Favorites() {
  const { favorites, onDeleteFromFavorite } = React.useContext(AppContext);
  return (
    <div className="content p-40">
      <div className="d-flex align-center justify-between mb-40">
        <h1>Favorites</h1>
      </div>
      <>
        {favorites.length > 0 ? (
          <div className="d-flex flex-wrap">
            {favorites.map((item, index) => (
              <Card
                key={index}
                favorited={true}
                // onFavorite={onAddToFavorite}
                onFavorite={(obj) => onDeleteFromFavorite(obj)}
                favorites={favorites}
                {...item}
              />
            ))}
          </div>
        ) : (
          <div className="d-flex flex-column align-center emptyCollection">
            <img
              width={80}
              src={"./img/empty-favorites.jpg"}
              alt="EmptyFavorites"
            />
            <h3 className="mb-10">Favorites not found</h3>
            <p className="mt-5">You have not added anything to favorites</p>
            <Link to="/">
              <button className="greenButton">
                <img src="img/arrow.svg" alt="Arrow" />
                Return
              </button>
            </Link>
          </div>
        )}
      </>
    </div>
  );
}

export default Favorites;
