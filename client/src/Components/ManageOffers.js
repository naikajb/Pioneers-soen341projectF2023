import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Button, Form } from "react-bootstrap";
import { v4 as uuid } from "uuid";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext.js";

{/*import "bootstrap/dist/css/bootstrap.min.css";*/ }

const dummyOffers = [
  {
    id: 1,
    price: 600000,
    property: {
      price: 599999,
      address: "1700 Blvd. De Maisonneuve Ouest",
      bedroom: 6,
      bathroom: 4,
      amenities: ["pool", "garden", "Garage"],
      broker: {
        name: "John Doe",
        contact: "jdoe@broker.com",
      },
      image: "",
    },
    status: "Pending",
    //"broker": ObjectId,
    //"_id": ObjectId,
    FirstName: "Jane",
    LastName: "Doe",
    email: "test@mail.com",
  },
  {
    id: 2,
    price: 1045657,
    property: {
      price: 1045657,
      address: "1455 Blvd. De Maisonneuve Ouest",
      bedroom: 4,
      bathroom: 3,
      amenities: ["pool", "gym", "parking"],
      broker: {
        name: "John Doe",
        contact: "test@broker",
      },
      image: "",
    },
    //"broker": ObjectId,
    //"_id": ObjectId,
    status: "Pending",
    FirstName: "Michael",
    LastName: "Scott",
    email: "jdoe@mai.com",
  },
  {
    id: 3,
    price: 234567,
    property: {
      price: 90000,
      address: "1200 Blvd. De Maisonneuve Ouest",
      bedroom: 3,
      bathroom: 3,
      amenities: ["pool", "gym", "parking"],
      broker: {
        name: "John Doe",
        contact: "test@broker",
      },
      image: "",
    },
    status: "Pending",
    //"broker": ObjectId,
    //"_id": ObjectId,
    FirstName: "Alice",
    LastName: "Doyle",
    email: "test@mail.com",
  },

  {
    id: 4,
    price: 760000,
    property: {
      price: 780500,
      address: "1500 Atwater Avenue",
      bedroom: 3,
      bathroom: 3,
      amenities: ["pool", "gym", "parking"],
      broker: {
        name: "John Doe",
        contact: "test@broker",
      },
      image: "",
    },
    status: "Pending",
    //"broker": ObjectId,
    //"_id": ObjectId,
    FirstName: "John",
    LastName: "Mayer",
    email: "test@mail.com",
  },
  {
    id: 5,
    price: 500000,
    property: {
      price: 515000,
      address: "1200 Blvd. De Maisonneuve Ouest",
      bedroom: 3,
      bathroom: 3,
      amenities: ["pool", "gym", "parking"],
      broker: {
        name: "John Doe",
        contact: "test@broker",
      },
      image: "",
    },
    status: "Pending",
    //"broker": ObjectId,
    //"_id": ObjectId,
    FirstName: "Asmae",
    LastName: "Loulidi",
    email: "test@mail.com",
  },
  {
    id: 6,
    price: 560000,
    property: {
      price: 515000,
      address: "1200 Blvd. De Maisonneuve Ouest",
      bedroom: 3,
      bathroom: 3,
      amenities: ["pool", "gym", "parking"],
      broker: {
        name: "John Doe",
        contact: "test@broker",
      },
      image: "",
    },
    status: "Pending",
    //"broker": ObjectId,
    //"_id": ObjectId,
    FirstName: "Muiz",
    LastName: "Madadi",
    email: "test@mail.com",
  },
  {
    id: 7,
    price: 765000,
    property: {
      price: 780500,
      address: "1500 Atwater Avenue",
      bedroom: 3,
      bathroom: 3,
      amenities: ["pool", "gym", "parking"],
      broker: {
        name: "John Doe",
        contact: "test@broker",
      },
      image: "",
    },
    status: "Pending",
    //"broker": ObjectId,
    //"_id": ObjectId,
    FirstName: "Oscar",
    LastName: "De La Hoya",
    email: "test@mail.com",
  },
  {
    id: 8,
    price: 27000,
    property: {
      price: 90000,
      address: "1200 Blvd. De Maisonneuve Ouest",
      bedroom: 3,
      bathroom: 3,
      amenities: ["pool", "gym", "parking"],
      broker: {
        name: "John Doe",
        contact: "test@broker",
      },
      image: "",
    },
    status: "Pending",
    //"broker": ObjectId,
    //"_id": ObjectId,
    FirstName: "Amber",
    LastName: "Rose",
    email: "test@mail.com",
  },

]

const contactBroker = (buyer, offer) => {
  const subject = `Negotiating Offer for Property: ${offer.property.address}`;
  const brokerEmail = "test@mail.com";
  const message = `Hello, I am interested in negotiating the offer for the property ${offer.property}. 
                    Please let me know if we can discuss the terms and conditions. Thank you.`;

  const mailtoLink = `mailto:${brokerEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
  window.open(mailtoLink);
}

function ManageOffers() {
  const  user = {name: "John Doe"};
  const [offers, setOffers] = useState(dummyOffers);
  //const { user } = useContext(UserContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios.get('/api/offers')
      .then((res) => {
        setOffers(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log("Error fetching the offers", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p className="loading-offers">Loading offers...</p>;
  }

  const groupedOffers = {};
  dummyOffers.forEach((offer) => {
    if (offer.property.broker.name === user.name) { //only show offers for properties that logged in broker owns
      //groups them by property
      if (!groupedOffers[offer.property]) {
        groupedOffers[offer.property] = [];
      }
      groupedOffers[offer.property].push(offer);
    }
  });


  const handleAcceptReject = (selectedOffer, action) => {
    const updatedOffers = offers.map((offer) => {
      if (offer.id === selectedOffer.id) {
        if (action === "accept") {
          offer.status = "Accepted";
        } else {
          offer.status = "Rejected";
        }
      } else {
        if (action === "accept" && offer.property.address === selectedOffer.property.address) {
          offer.status = "Rejected";
        }
      }
      return offer;
    });
    setOffers(updatedOffers);
  }


    return(
        <div>
            <h1 className="title-offers-page" data-testid="manage-offers-page">Manage Offers</h1>
            {Object.entries(groupedOffers).map(([property, offers]) => (
                <div className = "offers" key = {property}>
                <h2>{property}</h2>
                <ul>
                    {offers.map((offer,index) => (
                        <li className = "offer-detail" key = {index}>
                          <p><b>Amount: </b>{offer.offer}$</p>
                          <p><b>Buyer: </b>{offer.user}</p>
                          <p><b>Status: </b>{offer.status}</p>
                          {offer.status === "Pending" ? (
                            <div>
                              <button
                              className="accept-butt"
                                onClick={() => handleAcceptReject(offer.property,"accept")}
                                disabled={offers.some((o) => o.property === offer.property && o.status === "Accepted")}
                              >
                                Accept
                              </button>
                              <button
                                className="reject-butt"
                                onClick={() => handleAcceptReject(offer.property,"reject")}
                                disabled={offers.some((o) => o.property === offer.property && o.status === "Accepted")}
                              >
                                Reject
                              </button>
                            </div>
                          ) : (
                            <p>Offer already {offer.status}</p>
                          )}

              </li>

            ))}
          </ul>
        </div>

      ))}
    </div>
  );
}

export default ManageOffers;