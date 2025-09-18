import React from "react";

function BookCard({ book, onClick }) {
  return (
    <div 
      className="book-card" 
      onClick={() => onClick(book._id)}
      style={{
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "5px",
        textAlign: "center",
        cursor: "pointer",
      }}
    >
      <img 
        src={book.image[0]}
        alt={book.name} 
        style={{ width: "150px", height:"200px" ,borderRadius: "8px" }}
      />
      <h3>{book.name}</h3>
      <p>{book.author}</p>
      <p>⭐ {book.rating}</p>
    </div>
  );
}

export default BookCard;
