"use client";
import { useEffect, useState } from "react";

const AdminLoginPage = () => {
  const [showLogin, setShowLogin] = useState(false);

  const handleTrigger = (event: KeyboardEvent) => {
    if (event.key === "x" && event.ctrlKey) {
      setShowLogin(!showLogin);
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleTrigger);

    return () => document.removeEventListener("keydown", handleTrigger);
  }, [showLogin]);

  return <div>{showLogin && "ROHIN"}</div>;
};

export default AdminLoginPage;
