import { useNavigate } from "react-router-dom";
import "./Login.css";

export default function LibraryPage() {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="library-page">
      <div className="library-card">
        {/* LEFT COLUMN */}
        <div className="library-left">
          <h1 className="app-title">Mini Library</h1>
          <p className="welcome-text">Hello, <strong>{storedUser?.name}</strong> 👋</p>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>

        {/* RIGHT COLUMN */}
        <div className="library-right">
          <div className="library-header">
            <h2>Books</h2>
            <button className="add-btn">+ Add Book</button>
          </div>

          <div className="book-list">
            <div className="book-item">
              <span>Book 1</span>
              <button className="view-btn">View</button>
            </div>
            <div className="book-item">
              <span>Book 2</span>
              <button className="view-btn">View</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
