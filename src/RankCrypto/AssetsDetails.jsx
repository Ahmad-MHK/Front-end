import React from 'react';
import { useParams } from 'react-router-dom';

const AssetDetails = () => {
  const { id } = useParams();

  // You can fetch additional details of the asset using the id
  // For simplicity, let's just display the id for now
  return (
    <div>
      <h2>Asset Details</h2>
      <p>ID: {id}</p>
    </div>
  );
};

export default AssetDetails;
