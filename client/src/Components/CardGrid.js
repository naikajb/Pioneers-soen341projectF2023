import React, { useState } from "react";
import CardItem from "./CardItem";
import img from "./img.jpg";
import "../App.css"


const cardData = [
  {
    id: 1,
    image: img,
    price: "$599,999",
    address: "1455 Blvd. De Maisonneuve Ouest",
    bedroom: 3,
    bathroom: 2
  },
  {
    id: 2,
    image: img,
    price: "$1,045,657",
    address: "1455 Blvd. De Maisonneuve Ouest",
    bedroom: 4,
    bathroom: 3
  },
  {
    id: 3,
    image: img,
    price: "$234,567",
    address: "1455 Blvd. De Maisonneuve Ouest",
    bedroom: 3,
    bathroom: 2
  },
  {
    id: 4,
    image: img,
    price: "$780,500",
    address: "1455 Blvd. De Maisonneuve Ouest",
    bedroom: 4,
    bathroom: 3
  },
  {
    id: 5,
    image: img,
    price: "$450,000",
    address: "1455 Blvd. De Maisonneuve Ouest",
    bedroom: 3,
    bathroom: 2
  },
  {
    id: 6,
    image: img,
    price: "$850,000",
    address: "1455 Blvd. De Maisonneuve Ouest",
    bedroom: 4,
    bathroom: 3
  },
  {
    id: 7,
    image: img,
    price: "$950,000",
    address: "1455 Blvd. De Maisonneuve Ouest",
    bedroom: 2,
    bathroom: 3
  },
  {
    id: 8,
    image: img,
    price: "$229,000",
    address: "1455 Blvd. De Maisonneuve Ouest",
    bedroom: 2,
    bathroom: 1
  }
];

function CardGrid() {
 
  const [favorites, setFavorites] = useState([]); // Store favorite card IDs
  const [showFavorites, setShowFavorites] = useState(false);

  // Function to toggle favorites
  const toggleFavorite = (id) => {
    if (favorites.includes(id)) {
      // Remove from favorites if already favorited
      setFavorites(favorites.filter((favorite) => favorite !== id));
    } else {
      // Add to favorites if not already favorited
      setFavorites([...favorites, id]);
    }
  };

  //Filter card data based on favorited CardItem
  const favoriteCardData = cardData.filter((data) => favorites.includes(data.id));

  // if showFavorites is true, display favorited CardItem, if not display all CardItem
  const displayData = showFavorites ? favoriteCardData : cardData;

  //  return (
  //   <div className="container">
  //       {cardData.map((data, index) => (
  //         <CardItem key={index} data={data} />
  //       ))}
  //   </div>
  // );

//View favorited listings vs all listings
  return (
    <div>
      <button className="favBtn" onClick={() => setShowFavorites(!showFavorites)}>
        {showFavorites ? "All Listings" : "Saved Listings"}
      </button>
    <div className="gridContainer">
      {displayData.map((data, index) => (
        <CardItem key={index} data={data} toggleFavorite={toggleFavorite} />
      ))}
    </div>
    </div>
    
  );
}

export default CardGrid;
