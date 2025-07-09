import React, { useState } from 'react';
import ReviewForm from './Components/ReviewForm';
import './App.css';

function App() {
  const [reviews, setReviews] = useState([]);

  const handleAddReview = (review) => {
    setReviews([review, ...reviews]);
  };

  return (  
    <div className="app-container">
      <h1>Personal Reviews</h1>
      <ReviewForm onAddReview={handleAddReview} />
      <div className="reviews-list">
        {reviews.length === 0 ? (
          <p>No reviews yet👎</p>
        ) : (
          reviews.map((rev, index) => (
            <div key={index} className="review-card">
              <h3>{rev.username}</h3>
              <p>{rev.text}</p>
              <p className="stars">
                {'⭐'.repeat(rev.rating)}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;


