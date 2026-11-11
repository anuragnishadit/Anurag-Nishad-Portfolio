import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Admin from "./pages/Admin.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="*" element={<div className="center"><h1>404</h1><p>Page not found</p><Link to="/" className="btn">Go Home</Link></div>} />
    </Routes>
  );
}
