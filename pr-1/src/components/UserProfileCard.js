import React from 'react';
import './UserProfileCard.css';

const UserProfileCard = ({
  UserId,
  name,
  gender,
  dob,
  address,
  nationality,
  photo,
}) => {
  return (
    <div className="UserProfileCard">
      <img src={photo} alt={`${name}'s profile`} className="UserCard-photo" />
      <h2 className="UserCard-name">{name}</h2>
      <div className="UserCard-details">
        <p><b>User ID:</b> {UserId}</p>
        <p><b>Gender:</b> {gender}</p>
        <p><b>Date of Birth:</b> {dob}</p>
        <p><b>Address:</b> {address}</p>
        <p><b>Nationality:</b> {nationality}</p>
      </div>
    </div>
  );
};

export default UserProfileCard;

