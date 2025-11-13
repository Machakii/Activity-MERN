import "./../styles/Login.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import API from "../services/api";

export default function LoginPage() {
    const navigate = useNavigate();

    const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const submitForm = { ...form, email: form.email.toLowerCase() };

    try {
      const res = await API.post("/auth/login", submitForm);
      console.log(res.data);

      const userData = {
        id: res.data.id,
        token: res.data.token,
        role: res.data.role,
        name: res.data.name,
        email: res.data.email,
      };

      localStorage.setItem("user", JSON.stringify(userData));

      navigate("/home");
      alert(`Welcome back, ${res.data.name || "user"}!`);
    } catch (err) {
      alert(err.response?.data?.message || "Invalid email or password");
    }
  };

    const  handleRegister = () =>{
        navigate("/register");
    } 
  return (
    <div className="login-page">
      <div className="login-card">
        <h1 className="app-title">Mini Library</h1>

        <form className="login-form" onSubmit={handleSubmit}>
          <input type="text" name="email" placeholder="example@gmail.com" value={form.email} onChange={handleChange} required />
          <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} required />
          <button type="submit">LOGIN</button>
        </form>

        <p className="register-text">
          Don’t have an account? <a onClick={handleRegister}>Register</a>
        </p>
      </div>
    </div>
  );
}
