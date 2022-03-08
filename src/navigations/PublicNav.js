import React from "react";
import { Routes, Route } from "react-router-dom";
import Homepage from "../pages/Homepage";
import One from "../pages/One";

export default function PublicNav() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/one" element={<One />} />
    </Routes>
  );
}
