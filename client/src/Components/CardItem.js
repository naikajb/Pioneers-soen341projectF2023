import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useNavigate } from "react-router-dom";
import "../Components/styles/App.css"



function CardItem({ data, toggleFavorite  }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const navigate = useNavigate(); 

  const handleCardClick = () => {
    // Redirect to the new page and pass data using state
    navigate("/CardDetail", {
      state: {
        id: data._id
      },
    });
  };

  // const handleFavoriteClick = (event) => {
  //   event.stopPropagation(); // Prevent favoriteIcon click affecting cardItem click
  //   setIsFavorite(!isFavorite);

  //   // Pass the data.id to the parent component (CardGrid)
  // toggleFavorite(data._id);
  // };

  const handleFavoriteClick = async (event) => {
    event.stopPropagation();
    setIsFavorite(!isFavorite);

    try {
      const response = await fetch("/api/toggleFavorite", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ propertyId: data._id }),
      });

      const result = await response.json();
      // Handle the response if needed
      toggleFavorite(data._id);
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };

  return (
   
      <Card onClick={handleCardClick} className="propertyItem">
        {/* <CardMedia component="img" alt="green iguana" height="140" image={data.image} /> */}
        <CardMedia component="img" alt="Property Image" height="140" src={data.image} />
        <CardContent className="priceAddressContent">
          <Typography gutterBottom variant="h5" component="div" fontWeight="bold">
            {data.price}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {data.address}
          </Typography>
        </CardContent>
        <CardActions sx={{ justifyContent: "space-between" }}>
          <div>
            <Button className="features" size="small">
              {data.bedroom} Bedrooms
            </Button>
            <Button className="features" size="small">
              {data.bathroom} Bathrooms
            </Button>
          </div>
          <div onClick={handleFavoriteClick}>
            {isFavorite ? <FavoriteIcon color="error" className="favorite" /> : <FavoriteBorderIcon color="error" />}
          </div>
        </CardActions>
      </Card>
   
  );
}

export default CardItem;
