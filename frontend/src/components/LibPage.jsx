import { useState } from "react";
import "./../styles/LibraryPage.css";
import { useNavigate } from "react-router-dom";
import useBooks from "../services/books";
import API from "../services/api"; // axios instance

export default function LibraryPage() {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const navigate = useNavigate();
    const { books, setBooks } = useBooks(); // assuming setBooks is available

    const [selectedBook, setSelectedBook] = useState(null); // for view modal
    const [addBookModal, setAddBookModal] = useState(false); // for add book modal
    const [newBook, setNewBook] = useState({ title: "", author: "", category: "", description: "", year_published: "" });

    const handleLogout = () => {
        localStorage.clear();
        navigate("/");
    };

    const isAdmin = storedUser?.role === "admin";

    const openModal = (book) => setSelectedBook(book);
    const closeModal = () => setSelectedBook(null);
    const openAddBookModal = () => setAddBookModal(true);
    const closeAddBookModal = () => setAddBookModal(false);

    const handleChange = (e) => {
        setNewBook({ ...newBook, [e.target.name]: e.target.value });
    };

    const handleAddBook = async (e) => {
        e.preventDefault();
        try {
            await API.post("/book/add", newBook);
            alert("Book added successfully!");
            setNewBook({ title: "", author: "", category: "", description: "", year_published: "" });
            closeModal();
        } catch (err) {
            alert(err.response?.data?.message || "Failed to add book");
        }
    };

    return (
        <div className="library-page">
            <div className="library-container">
                {/* Left Sidebar */}
                <aside className="library-sidebar">
                    <h1 className="app-title">Mini Library</h1>
                    <div className="user-info">
                        <p className="welcome-text">
                            Welcome, <strong>{storedUser?.name || "User"}</strong>
                        </p>
                        <button className="logout-btn" onClick={handleLogout}>
                            Logout
                        </button>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="library-main">
                    <div className="library-header">
                        <h2>Books</h2>
                        {isAdmin && (
                            <button className="add-btn" onClick={openAddBookModal}>
                                + Add Book
                            </button>
                        )}
                    </div>

                    <div className="book-list">
                        {books && books.length > 0 ? (
                            books.map((book, index) => (
                                <div className="book-item" key={index}>
                                    <span>
                                        <strong>Title:</strong> {book.title} <br />
                                        <strong>Author:</strong> {book.author}
                                    </span>
                                    <button className="view-btn" onClick={() => openModal(book)}>
                                        View
                                    </button>
                                </div>
                            ))
                        ) : (
                            <p>No books available.</p>
                        )}
                    </div>
                </main>

                {/* View Book Modal */}
                {selectedBook && (
                    <div className="modal-overlay" onClick={closeModal}>
                        <div className="modal-center" onClick={(e) => e.stopPropagation()}>
                            <h2>{selectedBook.title}</h2>
                            <p>
                                <strong>Author:</strong> {selectedBook.author}
                            </p>
                            <p>
                                <strong>Description:</strong> {selectedBook.description}
                            </p>
                            <p>
                                <strong>Year Published:</strong>{" "}
                                {selectedBook.year_published
                                    ? new Date(selectedBook.year_published).getFullYear()
                                    : "N/A"}
                            </p>
                            <button className="close-btn" onClick={closeModal}>
                                Close
                            </button>
                        </div>
                    </div>
                )}

                {/* Add Book Modal */}
                {addBookModal && (
                    <div className="modal-overlay" onClick={closeAddBookModal}>
                        <div
                            className="modal-center"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <h2>Add New Book</h2>
                            <form onSubmit={handleAddBook}>
                                <input
                                    type="text"
                                    name="title"
                                    placeholder="Book's Title"
                                    value={newBook.title}
                                    onChange={handleChange}
                                    required
                                />
                                <input
                                    type="text"
                                    name="author"
                                    placeholder="Book's Author"
                                    value={newBook.author}
                                    onChange={handleChange}
                                    required
                                />
                                <input
                                    type="text"
                                    name="category"
                                    placeholder="Category"
                                    value={newBook.category}
                                    onChange={handleChange}
                                    required
                                />
                                <input
                                    type="text"
                                    name="description"
                                    placeholder="Book's Description / Synopsis"
                                    value={newBook.description}
                                    onChange={handleChange}
                                    required
                                />
                                <input
                                    type="number"
                                    name="year_published"
                                    placeholder="Year Published"
                                    value={newBook.year_published}
                                    onChange={handleChange}
                                    min="1000"
                                    max={new Date().getFullYear()}
                                    required
                                />
                                <button type="submit">Add Book</button>
                            </form>

                            <button className="close-btn" onClick={closeAddBookModal}>
                                Close
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
