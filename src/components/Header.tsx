"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import "./Header.scss";
import { useRouter } from "next/navigation";

export default function Header() {
  const [currentDate, setCurrentDate] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    const today = new Date();
    const formattedDate = today
      .toLocaleDateString("pt-BR", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })
      .replace("-feira", "")
      .replace(/^./, (match) => match.toUpperCase());

    setCurrentDate(formattedDate);

    const fetchUsername = () => {
      const storedName = localStorage.getItem("username");
      if (storedName) {
        setUsername(storedName);
      } else {
        router.push("/login");
      }
    };

    fetchUsername();

    const handleStorageChange = () => {
      fetchUsername();
    };

    window.addEventListener("storageChange", handleStorageChange);

    return () => {
      window.removeEventListener("storageChange", handleStorageChange);
    };
  }, [router]);

  return (
    <header className="header">
      <div className="logo">
        <Image src="/assets/logo.svg" alt="Logo" width={150} height={36} />
      </div>
      <div className="welcome">
        <h1>Bem-vindo de volta, {username ? username : "Convidado"}</h1>
      </div>
      <div className="date">
        <span>{currentDate}</span>
      </div>
    </header>
  );
}
