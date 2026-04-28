import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './index.css'
import App from './components/App.jsx'
import HomePage from "./components/HomePage.jsx";
import Authors from "./components/authors/Authors.jsx";
import AuthorForm from "./components/authors/AuthorForm.jsx";

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<App />}>
                  <Route index element={<HomePage />} />
                  <Route path="works">

                  </Route>
                  <Route path="authors">
                    <Route index element={<Authors />} />
                    <Route path="add" element={<AuthorForm />} />
                  </Route>
              </Route>
          </Routes>
      </BrowserRouter>
  </StrictMode>,
)
