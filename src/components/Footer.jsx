// Footer.jsx
import React from "react";
import "./Footer.css";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div>© {year} All rights reserved. </div>
      <div className="maker">made by Eva </div>
    </footer>
  );
}
