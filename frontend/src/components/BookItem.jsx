// src/components/BookItem.jsx
import React, { useState } from "react";

function BookItem({ book }) {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <div>
      {/* Card do livro */}
      <div
        onClick={() => setShowPopup(true)}
        className="cursor-pointer border p-3 rounded shadow hover:bg-gray-100"
      >
        <img
          src={book.image?.[0] || "https://via.placeholder.com/150"}
          alt={book.name}
          className="w-full h-40 object-cover rounded"
        />
        <h3 className="text-lg font-bold mt-2">{book.name}</h3>
        <p className="text-sm text-gray-600">Autor: {book.author}</p>
        <p className="text-yellow-500">⭐ {book.rating}</p>
      </div>

      {/* Popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg max-w-md w-full relative">
            <button
              onClick={() => setShowPopup(false)}
              className="absolute top-2 right-2 text-gray-600 hover:text-black"
            >
              ✖
            </button>
            <h2 className="text-2xl font-bold mb-2">{book.name}</h2>
            <p className="italic text-sm text-gray-500 mb-4">Autor: {book.author}</p>
            <p>{book.description}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default BookItem;
