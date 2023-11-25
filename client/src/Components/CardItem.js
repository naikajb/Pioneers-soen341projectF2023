
import React, { useState, useContext, useEffect } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useNavigate } from "react-router-dom";
import "../Components/styles/App.css";
import { UserContext } from '../context/userContext.js';
import axios from 'axios';

function CardItem({ data, toggleFavorite }) {
  const { user, setUser } = useContext(UserContext);
  const [isFavorite, setIsFavorite] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        if (user && user.id) {
          // Fetch user favorites only if the user is authenticated
          const response = await axios.get(`/api/favorites/${user.id}`);
          const { favoriteProps } = response.data;
          setIsFavorite(favoriteProps.includes(data._id));
        }
      } catch (error) {
        console.error('Error fetching favorites:', error);
      }
    };

    fetchFavorites();
  }, [user, data._id]);


  const handleCardClick = () => {
    navigate("/CardDetail", {
      state: {
        id: data._id
      },
    });
  };

  const handleFavoriteClick = async (event) => {
    event.stopPropagation();

    if (!user) {
      // Redirect to login if the user is not logged in
      navigate('/login');
      return;
    }

    try {
      // Toggle favorite on the server
      const response = await axios.post(`/api/${isFavorite ? 'removeFavorite' : 'addFavorite'}`, {
        userId: user.id,
        propertyId: data._id,
      });

      if (response.status === 200) {
        // Toggle favorite in the local state
        setIsFavorite(!isFavorite);

        // Pass the data.id to the parent component (CardGrid)
       toggleFavorite(data._id);

        // Update user context with the new user data
        const profileResponse = await axios.get('/api/profile');
        const profileData = profileResponse.data;
        setUser(profileData);
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  return (
    <Card onClick={handleCardClick} className="propertyItem">
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
        {!!user && <h2>Hi {user.name}</h2>}
      </CardActions>
    </Card>
  );
}

export default CardItem;





