import React from "react";
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
  }
];

function CardGrid() {
  return (
    <div className="container">
        {cardData.map((data, index) => (
          <CardItem key={index} data={data} />
        ))}
    </div>
  );
}

export default CardGrid;
