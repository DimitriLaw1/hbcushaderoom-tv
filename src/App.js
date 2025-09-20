import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Advertise from "./pages/Advertise";
import Live from "./pages/Live";

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/advertise" element={<Advertise />} />
        <Route path="/live" element={<Live />} />
        <Route
          path="*"
          element={
            <div className="container spacer">
              <h2>Page not found</h2>
            </div>
          }
        />
      </Routes>
    </Layout>
  );
}
