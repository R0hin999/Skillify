"use client";
import LoginForm from "@/components/LoginForm";
import { AdminLoginForm } from "@/components/admin-login-form";
import { useEffect, useState } from "react";
const LoginPage = () => {
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const handleTrigger = (event: KeyboardEvent) => {
    if (event.key == "a" && event.altKey) {
      setShowAdminLogin(!showAdminLogin);
    }
  };
  useEffect(() => {
    document.addEventListener("keydown", handleTrigger);
    return () => document.removeEventListener("keydown", handleTrigger);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showAdminLogin]);
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      {showAdminLogin ? <AdminLoginForm /> : <LoginForm></LoginForm>}
    </div>
  );
};

export default LoginPage;
