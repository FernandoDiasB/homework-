import React, { useState } from "react";
import BookList from "../components/BookList";

function Home() {
  const [selectedBook, setSelectedBook] = useState(null);
  const [synopsis, setSynopsis] = useState(null);

  const fetchSynopsis = async (id) => {
    const res = await fetch(`http://localhost:3000/api/book/${id}`);
    const data = await res.json();
    setSynopsis(data.data.book.description);
  };

  return (
    <div style={{ padding: "20px", margin: "0 auto"}}>
      <h1>📚 Sinopses</h1>

      <BookList 
        onSelectBook={(id) => {
          setSelectedBook(id);
          fetchSynopsis(id);
        }} 
      />

      {synopsis && (
        <div style={{ marginTop: "30px", padding: "20px", border: "1px solid #ccc", borderRadius: "8px" }}>
          <h2>Sinopse</h2>
          <p>{synopsis}</p>
        </div>
      )}
    </div>
  );
}

export default Home;
