import React from "react";
import { useLocation } from "react-router-dom";

function CardDetail() {
  const location = useLocation();
  const { id } = location.state || {};

  return (
    <div>
      <h2>Card Detail Page</h2>
      <p>ID: {id}</p>
    </div>
  );
}

export default CardDetail;
