import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useAuthStore } from "../store/auth";
import { Home } from "../pages/Home";
import { Login } from "../pages/Login";
import { Register } from "../pages/Register";
import { Order } from "../pages/Order";
import React from "react";
import { Admin } from "../pages/admin";

export function RouteApp() {
  let isLogged = useAuthStore(set => set.isLogged)
  const authToken = useAuthStore(set => set.authToken)
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={isLogged ? <Home /> : <Login />} />
        <Route path="/" element={isLogged ? <Home /> : <Login />} />
        <Route path="/order" element={isLogged ? <Order /> : <Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  )
}
