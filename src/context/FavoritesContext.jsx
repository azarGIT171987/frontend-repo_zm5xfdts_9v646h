import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'

const FavoritesContext = createContext({
  favorites: [],
  isFavorite: () => false,
  toggleFavorite: () => {},
  setFavorites: () => {}
})

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([])

  useEffect(() => {
    try {
      const raw = localStorage.getItem('noornames_favorites')
      if (raw) setFavorites(JSON.parse(raw))
    } catch (e) {
      console.error('Failed to load favorites', e)
    }
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem('noornames_favorites', JSON.stringify(favorites))
    } catch (e) {
      console.error('Failed to save favorites', e)
    }
  }, [favorites])

  const isFavorite = (name) => favorites.some(n => n.english_name === name.english_name)

  const toggleFavorite = (name) => {
    setFavorites((prev) => {
      const exists = prev.some(n => n.english_name === name.english_name)
      if (exists) return prev.filter(n => n.english_name !== name.english_name)
      return [...prev, name]
    })
  }

  const value = useMemo(() => ({ favorites, isFavorite, toggleFavorite, setFavorites }), [favorites])

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>
}

export const useFavorites = () => useContext(FavoritesContext)
