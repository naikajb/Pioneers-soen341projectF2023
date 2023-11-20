import React, { useState, useEffect } from "react";
import CardItem from "./CardItem";
import SearchBar from "./SearchBar"; // Import the SearchBar component
import "../Components/styles/App.css";
import axios from "axios";

function CardGrid() {
  
  
    const [favorites, setFavorites] = useState([]); // Store favorite card IDs
    const [showFavorites, setShowFavorites] = useState(false);
    const [propertyData, setPropertyData] = useState([]); // State to store fetched property data
    const [searchTerm, setSearchTerm] = useState(""); // State to store the search term
  
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
    // const toggleFavorite = (_id) => {
    //   if (favorites.includes(_id)) {
    //     // Remove from favorites if already favorited
    //     setFavorites(favorites.filter((favorite) => favorite !== _id));
    //   } else {
    //     // Add to favorites if not already favorited
    //     setFavorites([...favorites, _id]);
    //   }
  
    // };

    const toggleFavorite = async (_id) => {
      setFavorites((prevFavorites) => {
        if (prevFavorites.includes(_id)) {
          return prevFavorites.filter((favorite) => favorite !== _id);
        } else {
          return [...prevFavorites, _id];
        }
      });
  
      try {
        const response = await fetch("/api/toggleFavorite", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ propertyId: _id }),
        });
  
        const result = await response.json();
        // Handle the response if needed
      } catch (error) {
        console.error("Error toggling favorite:", error);
      }
    };



  
    // Filter the property data based on the search term
    const filteredPropertyData = propertyData.filter((property) =>
      property.address.toLowerCase().includes(searchTerm.toLowerCase())
    );
  
    // Determine which data to display based on favorites toggle
    const displayData = showFavorites
      ? propertyData.filter((data) => favorites.includes(data._id))
      : filteredPropertyData;

  return (
    <div>
      <SearchBar
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search properties by location..."
      />
      <button className="favBtn" onClick={() => setShowFavorites(!showFavorites)}>
        {showFavorites ? "All Listings" : "Saved Listings"}
      </button>
      <div className="gridContainer">
        {displayData.map((property) => (
          <CardItem
            key={property._id}
            data={property}
            toggleFavorite={() => toggleFavorite(property._id)}
          />
        ))}
      </div>
    </div>
  );
}

export default CardGrid;

