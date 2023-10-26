import React, {Component} from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import Grid from "@mui/material/Grid";
import img from "./logo.png";
import CardItem from "./CardItem";
import CardGrid from './CardGrid';
import EditCard from './EditCard';

const dummyListings = [
  {
    id: 1,
    img: img,
    price: "$599,999",
    address: "1455 Blvd. De Maisonneuve Ouest",
    bedroom: 3,
    bathroom: 2,
    description: "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eius",
    amenities: ["amenity1", "amenity2", "amenity3"]
  },
  {
    id: 2,
    img: img,
    price: "$1,045,657",
    address: "1455 Blvd. De Maisonneuve Ouest",
    bedroom: 4,
    bathroom: 3,
    description: "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eius",
    amenities: ["amenity1", "amenity2", "amenity3"]
  },
  {
    id: 3,
    img: img,
    price: "$234,567",
    address: "1455 Blvd. De Maisonneuve Ouest",
    bedroom: 3,
    bathroom: 2,
    description: "This is a description of the property.lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eius",
    amenities: ["amenity1", "amenity2", "amenity3"]
  },
  {
    id: 4,
    img: img,
    price: "$780,500",
    address: "1455 Blvd. De Maisonneuve Ouest",
    bedroom: 4,
    bathroom: 3,
    description: "This is a description of the property. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eius.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eius",
    amenities: ["amenity1", "amenity2", "amenity3"]
  },
  {
    id: 5,
    img: img,
    price: "$450,000",
    address: "1455 Blvd. De Maisonneuve Ouest",
    bedroom: 3,
    bathroom: 2,
    description: "This is a description of the property",
    amenities: ["amenity1", "amenity2", "amenity3"]
  },
  {
    id: 6,
    img: img,
    price: "$420,000",
    address: "145 Blvd. De Maisonneuve Ouest",
    bedroom: 3,
    bathroom: 2,
    description: "This is a description of the property",
    amenities: ["amenity1", "amenity2", "amenity3"]
  }
]

function EditPropertyView({data}){

    return(
        <Grid container spacing={2} className="grid">
            {dummyListings.map((data, index) => (
              <EditCard key={index} data={data} />
            ))}
          </Grid>
      
    );
}

export default EditPropertyView;