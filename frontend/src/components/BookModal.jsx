import React from "react";

function BookModal({ book, onClose }) {
    if (!book) return null;

    return (
        <div
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                backgroundColor: "rgba(0,0,0,0.5)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 1000,
            }}
            onClick={onClose}
        >
            <div
                style={{
                    backgroundColor: "#fff",
                    padding: "20px",
                    borderRadius: "8px",
                    maxWidth: "500px",
                    width: "90%",
                    position: "relative",
                    color: "black"
                }}
                onClick={(e) => e.stopPropagation()} // evita fechar ao clicar dentro
            >
                <button
                    onClick={onClose}
                    style={{ position: "absolute", top: 10, right: 10 }}
                >
                    X
                </button>

                <h2>{book.name}</h2>
                <p><strong>Autor:</strong> {book.author}</p>
                <p><strong>Rating:</strong> ⭐ {book.rating}</p>
                <p>{book.description}</p>
            </div>
        </div>
    );
}

export default BookModal;
