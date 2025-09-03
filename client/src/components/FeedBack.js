import React from 'react';
import feedback from './feedback.json';
const FeedBack = () => {
  return (
    <main style={{ marginTop: "200px", padding: "20px"}}>
    <div
      style={{
        display: "table",
        tableTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: "20px"
      }}
    >
      <ul>
        {feedback.map((feed) => (
          <li key={feed.feedback_id} 
          style={{
            border: "1px solid brown",
            borderRadius: "33px",
            marginTop: "300px",
            padding: "20px",
            background: "lightgray",
            marginBottom: "15px"
          }}>
            <li key={feed.feedback_id} ></li>
            <h3>{feed.product_id}</h3>
            <h3>{feed.product_id}</h3>
            <p><strong>Rating:</strong> {feed.rating}</p>
            <p><strong>Comment:</strong> {feed.comment}</p>
            <p><strong>Date Submitted:</strong> {feed.dateSubmitted}</p>
            <p><strong>Recommended:</strong> {feed.recommended ? 'Yes' : 'No'}</p>
            <p><strong>Color:</strong> {feed.color}</p>
            <p><strong>Font:</strong> {feed.font}</p>
            <p><strong>Position:</strong> {feed.position}</p>
          </li>
        ))}
      </ul>
    </div>
    </main>
  )
}

export default FeedBack
