import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import LoginPage from './components/Login'
import RegisterPage from './components/Register'
import LibraryPage from "./components/LibPage";

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/home" element={<LibraryPage />} />
      </Routes>
    </Router>
  )
}

export default App