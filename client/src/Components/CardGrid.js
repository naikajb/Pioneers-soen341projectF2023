import React, { useState, useEffect, useContext } from "react";
import CardItem from "./CardItem";
import SearchBar from "./SearchBar";
import "../Components/styles/App.css";
import axios from "axios";
import { UserContext } from '../context/userContext.js';

function CardGrid() {
  const [favorites, setFavorites] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);
  const [propertyData, setPropertyData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { user } = useContext(UserContext);

  useEffect(() => {
    // Fetch initial property data
    axios.get("/api/properties")
      .then((response) => {
        console.log("Fetched data:", response.data);
        setPropertyData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });

    // Fetch initial favorites if user is logged in
    if (user && user.id) {
      axios.get(`/api/favorites/${user.id}`)
        .then((response) => {
          const { favoriteProps } = response.data;
          setFavorites(favoriteProps);
        })
        .catch((error) => {
          console.error('Error fetching favorites:', error);
        });
    }
  }, [user]);

  // Cleanup function to reset states when the user logs out
  // useEffect(() => {
  //   return () => {
  //     if (!user) {
  //       // Reset states when the component unmounts (user logs out)
  //       setFavorites([]);
  //       setShowFavorites(false);
  //       setSearchTerm("");
  //     }
  //   };
  // }, []);

  const toggleFavorite = (_id) => {
    setFavorites((prevFavorites) => {
      if (prevFavorites.includes(_id)) {
        return prevFavorites.filter((favorite) => favorite !== _id);
      } else {
        return [...prevFavorites, _id];
      }
    });
  };

  const filteredPropertyData = propertyData.filter((property) =>
    property.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const displayData = user
    ? showFavorites ? propertyData.filter((data) => favorites.includes(data._id)) : filteredPropertyData
    : filteredPropertyData;

  return (
    <div>
      <SearchBar
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search properties by location..."
      />
      {user && user.type === "buyer" && (
        <button className="favBtn" onClick={() => setShowFavorites(!showFavorites)}>
          {showFavorites ? "All Listings" : "Saved Listings"}
        </button>
      )}
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


