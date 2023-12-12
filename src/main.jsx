import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import App from './App.jsx'
import AutoresPage from './components/AutoresPage.jsx'
import AdicionarEditarAutor from './Autor/AdicionarEditarAutor.jsx'
import LivrosPage from './components/LivrosPage.jsx'
import AdicionarEditarLivro from './Livro/AdicionarEditarLivro.jsx'


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
        <Route path="/autores" element={<AutoresPage />} />
        <Route path="/autores/:id" element={<AdicionarEditarAutor />} />
        <Route path="/livros" element={<LivrosPage />} />
        <Route path="/livros/:id" element={<AdicionarEditarLivro />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)