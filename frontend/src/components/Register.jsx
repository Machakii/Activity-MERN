import "./Login.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import API from "../services/api";

export default function RegisterPage() {
    const [form, setForm] = useState({name: "", email: "", password: "",});
    const navigate = useNavigate();

    const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/auth/register", form);
      alert("Registration successful!");
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

    const  handleLogin = () =>{
        navigate("/");
    } 

  return (
    <div className="login-page">
      <div className="login-card">
        <h1 className="app-title">Mini Library</h1>
        <h3 className="login-title">Register</h3>

        <form className="login-form" onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Juan Dela Cruz" value={form.name} onChange={handleChange} required />
          <input type="text" name="email" placeholder="example@gmail.com" value={form.email} onChange={handleChange}  required />
          <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} required />
          <button type="submit" >REGISTER</button>
        </form>

        <p className="register-text">
          Already have an account? <a onClick={handleLogin}>Login</a>
        </p>
      </div>
    </div>
  );
}
