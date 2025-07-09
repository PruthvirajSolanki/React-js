import React, { useState } from 'react';
import './ReviewForm.css';

const ReviewForm = ({ onAddReview }) => {
  const [username, setUsername] = useState('');
  const [text, setText] = useState('');
  const [rating, setRating] = useState('');

const handleSubmit = (e) => {
  e.preventDefault();

  if (!username) {
    alert('PLEASE! ENTER YOUR NAME🙏');
    return;
  }

  if (!text) {
    alert('PLEASE! WRITE YOUR REVIEW👍');
    return;
    }

  if (!rating) {
    alert('PLEASE SELECT YOUR RATING😄');
    return;
  }

  const newReview = {
    username,
    text,
    rating: parseInt(rating),
  };

  onAddReview(newReview);
  setUsername('');
  setText('');
  setRating('');
};


  return (
    <form className="review-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Your Name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <textarea
        placeholder="Write your review"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <select value={rating} onChange={(e) => setRating(e.target.value)}>
        <option value="">Select Rating</option>
        {[1, 2, 3, 4, 5].map((star) => (
          <option key={star} value={star}>
            {star} Star{star > 1 ? 's' : ''}
          </option>
        ))}
      </select>
      <button type="submit">Submit Review</button>
    </form>
  );
};

export default ReviewForm;
