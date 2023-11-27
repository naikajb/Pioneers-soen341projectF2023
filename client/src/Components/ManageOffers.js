import React, { useState } from "react";
import axios from "axios";
import { Button, Form } from "react-bootstrap";
import { v4 as uuid } from "uuid";
import { Link, useNavigate } from "react-router-dom";
{/*import "bootstrap/dist/css/bootstrap.min.css";*/ }

const dummyOffers = [
    {id: 1,
    property: "1234 Main St",
    offer: 100000,
    user: "Test User",
    status: "Pending",
    broker: "John Doe"},

    {id: 2,
    property: "1234 Main St",
    offer: 1000,
    user: "Test User",
    status: "Pending",
    broker: "Jane Doe"},

    {id: 3,
    property: "13 Main St",
    offer: 100000,
    user: "Test User",
    status: "Pending",
    broker: "John Doe"},

    {id: 4,
        property: "12 Main St",
        offer: 100000,
        user: "Test User",
        status: "Pending",
        broker: "John Doe"},
]

function ManageOffers() {

    // const [offers, setOffers] = useState([]);
    // const [loading, setLoading] = useState(true);

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

    // React.useEffect(() => {
    //     axios.get('/api/broker/offers')
    //       .then((response) => {
    //         setOffers(response.data);
    //         setLoading(false);
    //       })
    //       .catch((error) => {
    //         console.error('Error fetching offers:', error);
    //         setLoading(false);
    //       });
    //   }, []);

    // return (
    //     {/*<div>
    //         <h1>Manage Offers</h1>
    //         {loading ? (
    //             <div>Loading...</div>
    //         ) : (
    //             <div>
    //                 <h2> Offers Received</h2>
    //                 <ul>
    //                     {offers.map((offer) => (
    //                         <li key={offer.id}>
    //                             <div>
    //                                 <strong>Property Name:</strong> {offer.propertyName}
    //                             </div>
    //                             <div>
    //                                 <strong>Offer Amount:</strong> {offer.offerAmount}
    //                             </div>
    //                             {/* Display other offer details */
    //                         /*</li>
    //                     ))}
    //                 </ul>
    //             </div>
    //                     )}
        
    //     </div>*/}
        
    // );
    const [offers, setOffers] = useState(dummyOffers);
    const groupedOffers = {};
    dummyOffers.forEach((offer) => {
        if (!groupedOffers[offer.property]) {
            groupedOffers[offer.property] = [];
        }
        groupedOffers[offer.property].push(offer);
    });

    const handleAcceptReject = (property,action) =>{
        const updatedOffers = offers.map((offer) => {
            if(offer.property === property){
                if(action === "Accept"){
                return {...offer, status: "Accepted"};
                }else if(action === "Reject"){
                    return {...offer, status: "Rejected"};
                }
            }
            return offer;
        });
        setOffers(updatedOffers);
    }


    return(
        <div>
            <h1 data-testid="manage-offers-page">Manage Offers</h1>
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
            {/*<table>
                <tr>
                    <th>Property</th>
                    <th>Offer</th>
                    <th>Status</th>
                    <th>Broker</th>
                </tr>

                {dummyOffers.map((offer) => (
                    <tr key={offer.id}>
                        <td>{offer.property}</td>
                        <td>{offer.offer}</td>
                        <td>{offer.status}</td>
                        <td>{offer.broker}</td>
                    </tr>
                ))}
                </table>*/}
        </div>
    );
}

export default ManageOffers;