import React from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";

export default function MainLayout({ children }) {
  return (
    <div>
      <NavBar />

      {children}
      <Footer />
    </div>
  );
}
