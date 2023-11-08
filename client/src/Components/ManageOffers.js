import React, { useState } from "react";
import axios from "axios";
import { Button, Form } from "react-bootstrap";
import { v4 as uuid } from "uuid";
import { Link, useNavigate } from "react-router-dom";
{/*import "bootstrap/dist/css/bootstrap.min.css";*/ }

// const dummyOffers = [
//     {id: 1,
//     property: "1234 Main St",
//     offer: 100000,
//     status: "Pending",
//     broker: "John Doe"},

//     {id: 2,
//     property: "1234 Main St",
//     offer: 100000,
//     status: "Pending",
//     broker: "Jane Doe"},
// ]

function ManageOffers() {

    const [offers, setOffers] = useState([]);
    const [loading, setLoading] = useState(true);

    // const fetchData = async () => {
    //     try {
    //         const response = await fetch("http://localhost:5000/api/offers");
    //         const data = await response.json();
    //         setOffers(data);
    //         setLoading(false);
    //     } catch (error) {
    //         console.log("error fetching offers", error);
    //     } finally {
    //         setLoading(false);
    //     }

    // };

    React.useEffect(() => {
        axios.get('/api/broker/offers')
          .then((response) => {
            setOffers(response.data);
            setLoading(false);
          })
          .catch((error) => {
            console.error('Error fetching offers:', error);
            setLoading(false);
          });
      }, []);

    return (
        <div>
            <h1>Manage Offers</h1>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <div>
                    <h2> Offers Received</h2>
                    <ul>
                        {offers.map((offer) => (
                            <li key={offer.id}>
                                <div>
                                    <strong>Property Name:</strong> {offer.propertyName}
                                </div>
                                <div>
                                    <strong>Offer Amount:</strong> {offer.offerAmount}
                                </div>
                                {/* Display other offer details */}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default ManageOffers;