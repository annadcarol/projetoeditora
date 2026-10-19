import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import ListArtigo from './components/listArtigo';
import AddArtigo from './components/addArtigo';
import UpdArtigo from './components/updArtigo';

function App() {
  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark px-3">
        <Link to={"/list"} className="navbar-brand fw-bold">
          Editora
        </Link>
        <div className="navbar-nav me-auto">
          <li className="nav-item">
            <Link to={"/list"} className="nav-link">
              Artigos
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/add"} className="nav-link">
              Adicionar Artigo
            </Link>
          </li>
        </div>
      </nav>

      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<ListArtigo />} />
          <Route path="/list" element={<ListArtigo />} />
          <Route path="/add" element={<AddArtigo />} />
          <Route path="/list/:id" element={<UpdArtigo />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;