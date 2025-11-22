import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './Layout'
import { FavoritesProvider } from './context/FavoritesContext'
import { ThemeProvider } from './context/ThemeContext'
import Home from './pages/Home'
import Browse from './pages/Browse'
import Favorites from './pages/Favorites'
import Etiquette from './pages/Etiquette'

function App() {
  return (
    <ThemeProvider>
      <FavoritesProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/browse" element={<Browse />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/etiquette" element={<Etiquette />} />
          </Routes>
        </Layout>
      </FavoritesProvider>
    </ThemeProvider>
  )
}

export default App
