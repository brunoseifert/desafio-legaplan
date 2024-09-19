"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import "./login.scss";

export default function Login() {
  const [name, setName] = useState("");
  const router = useRouter();

  const handleLogin = () => {
    localStorage.setItem("username", name);
    window.dispatchEvent(new Event("storageChange"));
    router.push("/");
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <input
        type="text"
        placeholder="Digite seu nome"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="login-input"
      />
      <button onClick={handleLogin} className="login-button">
        Login
      </button>
    </div>
  );
}
