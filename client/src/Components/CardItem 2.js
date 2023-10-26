import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

function CardItem({ data }) {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          component="img"
          alt="green iguana"
          height="140"
          image={data.image}
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            fontWeight="bold"
          >
            {data.price}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {data.address}
          </Typography>
        </CardContent>
        <CardActions sx={{ justifyContent: "space-between" }}>
          <div>
            <Button classsName="features"   size="small">{data.bedroom} Bedrooms</Button>
            <Button classsName="features"  size="small">{data.bathroom} Bathrooms</Button>
          </div>
          <div onClick={() => setIsFavorite(!isFavorite)}>
            {isFavorite ? (
              <FavoriteIcon color="error" />
            ) : (
              <FavoriteBorderIcon color="error" />
            )}
          </div>
        </CardActions>
      </Card>
    </Grid>
  );
}

export default CardItem;
