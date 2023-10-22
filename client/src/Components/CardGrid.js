import React from "react";
import Grid from "@mui/material/Grid";
import CardItem from "./CardItem";
import img from "./logo.png";
import "../App.css"


const cardData = [
  {
    image: img,
    price: "$599,999",
    address: "1455 Blvd. De Maisonneuve Ouest",
    bedroom: 3,
    bathroom: 2
  },
  {
    image: img,
    price: "$1,045,657",
    address: "1455 Blvd. De Maisonneuve Ouest",
    bedroom: 4,
    bathroom: 3
  },
  {
    image: img,
    price: "$234,567",
    address: "1455 Blvd. De Maisonneuve Ouest",
    bedroom: 3,
    bathroom: 2
  },
  {
    image: img,
    price: "$780,500",
    address: "1455 Blvd. De Maisonneuve Ouest",
    bedroom: 4,
    bathroom: 3
  },
  {
    image: img,
    price: "$450,000",
    address: "1455 Blvd. De Maisonneuve Ouest",
    bedroom: 3,
    bathroom: 2
  },
  {
    image: img,
    price: "$850,000",
    address: "1455 Blvd. De Maisonneuve Ouest",
    bedroom: 4,
    bathroom: 3
  }
];

function CardGrid() {
  return (
    <div className="container">
      <Grid container spacing={2}>
        {cardData.map((data, index) => (
          <CardItem key={index} data={data} />
        ))}
      </Grid>
    </div>
  );
}

export default CardGrid;
