import React, { useEffect, useState } from "react";
import BookCard from "../components/BookCard";
import BookModal from "../components/BookModal";

function BookList() {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("rating"); // pode ser "rating" ou "name"
  const [ratingFilter, setRatingFilter] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const booksPerPage = 6;

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const queryParams = new URLSearchParams({
          page: currentPage,
          limit: booksPerPage,
          ...(search && { search }), // só adiciona se tiver valor
          ...(ratingFilter > 0 && { rating: ratingFilter }),
          ...(sort === "name" && { sort: "name" }),
          ...(sort === "rating" && { sortRating: "rating" }),
        });

        const res = await fetch(`http://localhost:3000/api/book?${queryParams}`);
        const data = await res.json();

        setBooks(data.data.books);
        // totalPages calculado pelo backend seria melhor, mas vamos calcular simples:
        setTotalPages(Math.ceil(data.result / booksPerPage));
      } catch (err) {
        console.error(err);
      }
    };

    fetchBooks();
  }, [search, sort, ratingFilter, currentPage]);

  const handleSelectBook = (id) => {
    const book = books.find((b) => b._id === id);
    setSelectedBook(book);
  };

  const handleCloseModal = () => setSelectedBook(null);

  return (
    <div>
      {/* Barra de busca e filtros */}
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Pesquisar..."
          value={search}
          onChange={(e) => {
            setCurrentPage(1); // resetar pra primeira página ao pesquisar
            setSearch(e.target.value);
          }}
        />
        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="rating">Ordenar por Relevância</option>
          <option value="name">Ordenar por Nome</option>
        </select>
      </div>

      {/* Grid de livros */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
        {books.map((book) => (
          <BookCard key={book._id} book={book} onClick={handleSelectBook} />
        ))}
      </div>

      {/* Navegação de páginas */}
      <div style={{ display: "flex", justifyContent: "center", marginTop: "20px", gap: "10px" }}>
        <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1}>
          ◀ Anterior
        </button>
        <span>Página {currentPage} de {totalPages}</span>
        <button onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages}>
          Próxima ▶
        </button>
      </div>

      {/* Popup */}
      {selectedBook && <BookModal book={selectedBook} onClose={handleCloseModal} />}
    </div>
  );
}

export default BookList;
