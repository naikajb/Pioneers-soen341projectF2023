import React, { useState, useEffect } from "react";
import CardItem from "./CardItem";
import "../Components/styles/App.css"
import axios from "axios";


function CardGrid() {
 
  const [favorites, setFavorites] = useState([]); // Store favorite card IDs
  const [showFavorites, setShowFavorites] = useState(false);
  const [propertyData, setPropertyData] = useState([]); // State to store fetched property data

  useEffect(() => {
    axios.get("/api/properties")
      .then((response) => {
        console.log("Fetched data:", response.data); // Log the fetched data
        setPropertyData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  // Function to toggle favorites
  const toggleFavorite = (_id) => {
    if (favorites.includes(_id)) {
      // Remove from favorites if already favorited
      setFavorites(favorites.filter((favorite) => favorite !== _id));
    } else {
      // Add to favorites if not already favorited
      setFavorites([...favorites, _id]);
    }
  };

  const favoriteCardData = propertyData.filter((data) => favorites.includes(data._id));
  const displayData = showFavorites ? favoriteCardData : propertyData;

  return (
    <div>
      <button className="favBtn" onClick={() => setShowFavorites(!showFavorites)}>
        {showFavorites ? "All Listings" : "Saved Listings"}
      </button>
      <div className="gridContainer">
        {displayData.map((property, index) => (
          <CardItem
            key={property._id}  // Replace with the actual unique identifier, like _id
            data={property}
            toggleFavorite={toggleFavorite}
          />
        ))}
      </div>
    </div>
  );
  
}

export default CardGrid;
