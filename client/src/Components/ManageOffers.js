import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Form } from "react-bootstrap";
import { v4 as uuid } from "uuid";
import { Link, useNavigate } from "react-router-dom";

{/*import "bootstrap/dist/css/bootstrap.min.css";*/ }

const dummyOffers = [
  {
    id: 1,
    price:1000000,
    property: {
      price: 900000, 
        address: "123 main street",
        bedroom: 3,
        bathroom: 3,
        amenities: ["pool", "gym", "parking"],
        broker: { 
            name: "Test Broker", 
            contact: "test@broker",
        },
        image: "",
    },
    //"broker": ObjectId,
    //"_id": ObjectId,
    FirstName: "John",
    LastName: "Doe",
    email: "test@mail.com",
  },

    // {id: 2,
    // property: "1234 Main St",
    // offer: 1000,
    // user: "Test User",
    // status: "Pending",
    // broker: "Jane Doe"},

    // {id: 3,
    // property: "13 Main St",
    // offer: 100000,
    // user: "Test User",
    // status: "Pending",
    // broker: "John Doe"},

    // {id: 4,
    //     property: "12 Main St",
    //     offer: 100000,
    //     user: "Test User",
    //     status: "Pending",
    //     broker: "John Doe"},
        
    // {id: 5,
    //   property: "12 Main St",
    //   offer: 100000,
    //   user: "Test User",
    //   status: "Pending",
    //   broker: "John Doe"
    // }

]

const contactBroker = (buyer, offer) => {
  const subject = `Negotiating Offer for Property: ${offer.property}`;
  const brokerEmail = "test@mail.com";
  const message = `Hello, I am interested in negotiating the offer for the property ${offer.property}. 
                    Please let me know if we can discuss the terms and conditions. Thank you.`;
  
  const mailtoLink = `mailto:${brokerEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
  window.open(mailtoLink);
}
function ManageOffers() {
    const [offers, setOffers] = useState(dummyOffers);
    // const [loading, setLoading] = useState(true);

    // useEffect(() => {
    //     setLoading(true);
    //     axios.get('http://localhost:5000/offers')
    //         .then((res) => {
    //             setOffers(res.data);
    //             setLoading(false);
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //         });
    // }, []);

    // if (loading) {
    //     return <p>Loading offers...</p>;
    // }
    const groupedOffers = {};
    offers.forEach((offer) => {
        if (!groupedOffers[offer.property]) {
            groupedOffers[offer.property] = [];
        }
        groupedOffers[offer.property].push(offer);
    });

    // const [offers, setOffers] = useState();
    // const groupedOffers = {};
    // dummyOffers.forEach((offer) => {
    //     if (!groupedOffers[offer.property]) {
    //         groupedOffers[offer.property] = [];
    //     }
    //     groupedOffers[offer.property].push(offer);
    // });

    const handleAcceptReject = (selectedOffer, action) =>{
        const updatedOffers = offers.map((offer) => {
            if (offer.id === selectedOffer.id) {
                if (action === "accept") {
                    offer.status = "Accepted";
                } else {
                    offer.status = "Rejected";
                }
            }else{
              if(action === "accept" && offer.property === selectedOffer.property){
                offer.status = "Rejected";
              }
            }
            return offer;
        });
        setOffers(updatedOffers);
    }

    return(
        <div>
            <h1 className="title-offers-page">Manage Offers</h1>
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
                              <button className="contact-butt" onClick={() => contactBroker(offer.buyer, offer)}>Contact Broker</button>
                              <button
                              className="accept-butt"
                                onClick={() => handleAcceptReject(offer,"accept")}
                                disabled={offers.some((o) => o.property === offer.property && o.status === "Accepted")}
                              >
                                Accept
                              </button>
                              <button
                                className="reject-butt"
                                onClick={() => handleAcceptReject(offer,"reject")}
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