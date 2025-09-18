import React, { useEffect, useState } from "react";
import BookCard from "../components/BookCard";
import BookModal from "../components/BookModal";

function BookList() {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("rating");
  const [ratingFilter, setRatingFilter] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const booksPerPage = 6;

  useEffect(() => {
    fetch("http://localhost:3000/api/book")
      .then((res) => res.json())
      .then((data) => setBooks(data.data.books))
      .catch((err) => console.error(err));
  }, []);

  const handleSelectBook = (id) => {
    const book = books.find((b) => b._id === id);
    setSelectedBook(book);
  };

  const handleCloseModal = () => setSelectedBook(null);

  // Filtra e ordena
  const filteredBooks = books
    .filter((b) => b.name.toLowerCase().includes(search.toLowerCase()))
    .filter((b) => b.rating >= ratingFilter)
    .sort((a, b) => {
      if (sort === "rating") return b.rating - a.rating;
      if (sort === "name") return a.name.localeCompare(b.name);
      return 0;
    });

  // Paginação
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);
  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);

  return (
    <div>
      {/* Barra de busca e filtros */}
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Pesquisar..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="rating">Ordenar por Relevância</option>
          <option value="name">Ordenar por Nome</option>
        </select>

      </div>

      {/* Grid de livros (2 linhas × 3 colunas = 6 livros) */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
        {currentBooks.map((book) => (
          <BookCard key={book._id} book={book} onClick={handleSelectBook} />
        ))}
      </div>

      {/* Navegação de páginas */}
      <div style={{ display: "flex", justifyContent: "center", marginTop: "20px", gap: "10px" }}>
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          ◀ Anterior
        </button>
        <span>Página {currentPage} de {totalPages}</span>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Próxima ▶
        </button>
      </div>

      {/* Popup */}
      {selectedBook && <BookModal book={selectedBook} onClose={handleCloseModal} />}
    </div>
  );
}

export default BookList;
