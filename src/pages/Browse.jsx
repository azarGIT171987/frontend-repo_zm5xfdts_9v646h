import React, { useMemo, useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react'
import { namesData, alpha, propheticNames } from '../data/namesData'
import allahNames from '../data/allah_names.json'
import prophetNames from '../data/prophet_names.json'
import angelNames from '../data/angel_names.json'
import NameCard from '../components/NameCard'
import NameDetailModal from '../components/NameDetailModal'
import AuthModal from '../components/AuthModal'
import { useFavorites } from '../context/FavoritesContext'

function useQuery() {
  const { search } = useLocation()
  return useMemo(() => new URLSearchParams(search), [search])
}

const Browse = () => {
  const qs = useQuery()
  const [selectedGenders, setSelectedGenders] = useState(() => {
    const g = qs.get('gender')
    return new Set(g && g !== 'all' ? [g] : ['male', 'female', 'unisex'])
  })
  const [category, setCategory] = useState(qs.get('category') || 'all')
  const [letter, setLetter] = useState('All')
  const [pop, setPop] = useState('desc')
  const [open, setOpen] = useState(null)
  const { showAuthModal, setShowAuthModal } = useFavorites()
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1)
  const ITEMS_PER_PAGE = 24

  const filtered = useMemo(() => {
    let arr = []
    let source = namesData

    // Select Source
    if (category === 'allah') source = allahNames
    else if (category === 'muhammad') source = prophetNames
    else if (category === 'angel') source = angelNames
    
    arr = [...source]

    // Gender Filter (Only for 'all' or 'prophetic')
    if (category === 'all' || category === 'prophetic') {
      if (selectedGenders.size > 0) {
        arr = arr.filter(n => selectedGenders.has(n.gender) || (n.gender === 'unisex' && (selectedGenders.has('male') || selectedGenders.has('female'))))
      } else {
        arr = []
      }
    }

    // Category Filter
    if (category === 'prophetic') arr = arr.filter(n => propheticNames.includes(n.english_name))
    
    // Letter Filter
    if (letter !== 'All') arr = arr.filter(n => n.english_name.startsWith(letter))
    
    // Sort
    arr.sort((a, b) => {
      if (a.popularity && b.popularity) {
        return pop === 'desc' ? b.popularity - a.popularity : a.popularity - b.popularity
      }
      return 0 // Keep original order for special lists
    })
    
    return arr
  }, [selectedGenders, letter, pop, category])

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [category, letter, selectedGenders, pop])

  // Pagination Logic
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE)
  const paginatedItems = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE, 
    currentPage * ITEMS_PER_PAGE
  )

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const toggleGender = (g) => {
    const next = new Set(selectedGenders)
    if (next.has(g)) next.delete(g)
    else next.add(g)
    setSelectedGenders(next)
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 min-h-[calc(100vh-80px)]">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <aside className="lg:col-span-1 space-y-6 h-fit">
          <div className={`bg-white rounded-2xl p-6 border border-emerald-900/10 shadow-sm dark:bg-emerald-900/20 dark:border-emerald-100/10 dark:shadow-black/20 transition-opacity ${['allah', 'muhammad', 'angel'].includes(category) ? 'opacity-50 pointer-events-none' : ''}`}>
            <h3 className="font-serif text-xl text-emerald-900 mb-3 dark:text-emerald-50">Gender</h3>
            <div className="flex flex-col gap-2">
              {['male', 'female', 'unisex'].map(g => (
                <label key={g} className="flex items-center gap-2 cursor-pointer group">
                  <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${selectedGenders.has(g) ? 'bg-emerald-900 border-emerald-900 dark:bg-emerald-500 dark:border-emerald-500' : 'border-emerald-900/30 dark:border-emerald-100/30 group-hover:border-emerald-900 dark:group-hover:border-emerald-500'}`}>
                    {selectedGenders.has(g) && <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                  </div>
                  <input type="checkbox" className="hidden" checked={selectedGenders.has(g)} onChange={() => toggleGender(g)} />
                  <span className="capitalize text-emerald-900 dark:text-emerald-100">{g}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-emerald-900/10 shadow-sm dark:bg-emerald-900/20 dark:border-emerald-100/10 dark:shadow-black/20">
            <h3 className="font-serif text-xl text-emerald-900 mb-3 dark:text-emerald-50">Category</h3>
            <div className="flex flex-col gap-2">
              {[
                { id: 'prophetic', label: 'Prophetic Names' },
                { id: 'allah', label: '99 Names of Allah' },
                { id: 'muhammad', label: 'Prophet Muhammad Names' },
                { id: 'angel', label: 'Angel Names' }
              ].map(cat => (
                <label key={cat.id} className="flex items-center gap-2 cursor-pointer group">
                  <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${category === cat.id ? 'bg-emerald-900 border-emerald-900 dark:bg-emerald-500 dark:border-emerald-500' : 'border-emerald-900/30 dark:border-emerald-100/30 group-hover:border-emerald-900 dark:group-hover:border-emerald-500'}`}>
                    {category === cat.id && <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                  </div>
                  <input 
                    type="checkbox" 
                    className="hidden" 
                    checked={category === cat.id} 
                    onChange={() => setCategory(category === cat.id ? 'all' : cat.id)} 
                  />
                  <span className="text-emerald-900 dark:text-emerald-100">{cat.label}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-emerald-900/10 shadow-sm dark:bg-emerald-900/20 dark:border-emerald-100/10 dark:shadow-black/20">
            <h3 className="font-serif text-xl text-emerald-900 mb-3 dark:text-emerald-50">Alphabet</h3>
            <div className="flex flex-wrap gap-2">
              <button onClick={() => setLetter('All')} className={`px-3 py-1.5 rounded-md text-sm border ${letter==='All'?'bg-emerald-900 text-white border-emerald-900':'border-emerald-900/20 text-emerald-900 hover:bg-emerald-50 dark:border-emerald-100/20 dark:text-emerald-100 dark:hover:bg-emerald-800/40'}`}>All</button>
              {alpha.map(l => (
                <button key={l} onClick={() => setLetter(l)} className={`w-8 h-8 rounded-md text-sm border ${letter===l?'bg-emerald-900 text-white border-emerald-900':'border-emerald-900/20 text-emerald-900 hover:bg-emerald-50 dark:border-emerald-100/20 dark:text-emerald-100 dark:hover:bg-emerald-800/40'}`}>{l}</button>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-emerald-900/10 shadow-sm dark:bg-emerald-900/20 dark:border-emerald-100/10 dark:shadow-black/20">
            <h3 className="font-serif text-xl text-emerald-900 mb-3 dark:text-emerald-50">Popularity</h3>
            <div className="flex flex-col gap-2">
              {[
                {k:'desc', label:'High to Low'},
                {k:'asc', label:'Low to High'}
              ].map(o => (
                <label key={o.k} className="flex items-center gap-2 cursor-pointer group">
                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${pop === o.k ? 'border-amber-600' : 'border-emerald-900/30 dark:border-emerald-100/30 group-hover:border-amber-600'}`}>
                    {pop === o.k && <div className="w-2.5 h-2.5 rounded-full bg-amber-600" />}
                  </div>
                  <input type="radio" className="hidden" checked={pop === o.k} onChange={() => setPop(o.k)} />
                  <span className="text-emerald-900 dark:text-emerald-100">{o.label}</span>
                </label>
              ))}
            </div>
          </div>
        </aside>

        <main className="lg:col-span-3 flex flex-col">
          <div className="mb-4 text-emerald-900/60 dark:text-emerald-100/60 font-medium">
            Showing {filtered.length} names
          </div>
          {filtered.length === 0 && category !== 'all' && letter !== 'All' ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-8">
              <p className="font-serif text-xl text-emerald-900/60 dark:text-emerald-100/60">
                No prophetic names found starting with "{letter}".
              </p>
              <button 
                onClick={() => setLetter('All')}
                className="mt-4 text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300 underline"
              >
                View all prophetic names
              </button>
            </div>
          ) : (

            <div className="flex flex-col gap-8" key={category}>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {paginatedItems.map((item) => (
                  <NameCard key={`${item.english_name}-${item.gender}`} item={item} onOpen={(it) => setOpen(it)} />
                ))}
              </div>

              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-8 pb-8 flex-wrap">
                  <button
                    onClick={() => handlePageChange(1)}
                    disabled={currentPage === 1}
                    className="w-8 h-8 flex items-center justify-center rounded-md border border-emerald-900/20 text-emerald-900 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-emerald-50 dark:border-emerald-100/20 dark:text-emerald-100 dark:hover:bg-emerald-800/40 transition-colors"
                    title="First Page"
                  >
                    <ChevronsLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="w-8 h-8 flex items-center justify-center rounded-md border border-emerald-900/20 text-emerald-900 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-emerald-50 dark:border-emerald-100/20 dark:text-emerald-100 dark:hover:bg-emerald-800/40 transition-colors"
                    title="Previous Page"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  
                  {(() => {
                    const pages = []
                    if (totalPages <= 7) {
                      for (let i = 1; i <= totalPages; i++) pages.push(i)
                    } else {
                      if (currentPage <= 4) {
                        for (let i = 1; i <= 5; i++) pages.push(i)
                        pages.push('...')
                        pages.push(totalPages)
                      } else if (currentPage >= totalPages - 3) {
                        pages.push(1)
                        pages.push('...')
                        for (let i = totalPages - 4; i <= totalPages; i++) pages.push(i)
                      } else {
                        pages.push(1)
                        pages.push('...')
                        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i)
                        pages.push('...')
                        pages.push(totalPages)
                      }
                    }
                    return pages.map((p, i) => (
                      <button
                        key={i}
                        onClick={() => typeof p === 'number' && handlePageChange(p)}
                        disabled={p === '...'}
                        className={`w-8 h-8 flex items-center justify-center rounded-md text-sm font-medium border transition-colors ${
                          p === currentPage
                            ? 'bg-emerald-900 text-white border-emerald-900 dark:bg-emerald-500 dark:border-emerald-500'
                            : p === '...'
                            ? 'border-transparent text-emerald-900 dark:text-emerald-100 cursor-default'
                            : 'border-emerald-900/20 text-emerald-900 hover:bg-emerald-50 dark:border-emerald-100/20 dark:text-emerald-100 dark:hover:bg-emerald-800/40'
                        }`}
                      >
                        {p}
                      </button>
                    ))
                  })()}

                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="w-8 h-8 flex items-center justify-center rounded-md border border-emerald-900/20 text-emerald-900 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-emerald-50 dark:border-emerald-100/20 dark:text-emerald-100 dark:hover:bg-emerald-800/40 transition-colors"
                    title="Next Page"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handlePageChange(totalPages)}
                    disabled={currentPage === totalPages}
                    className="w-8 h-8 flex items-center justify-center rounded-md border border-emerald-900/20 text-emerald-900 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-emerald-50 dark:border-emerald-100/20 dark:text-emerald-100 dark:hover:bg-emerald-800/40 transition-colors"
                    title="Last Page"
                  >
                    <ChevronsRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          )}
        </main>
      </div>

      {open && <NameDetailModal item={open} onClose={() => setOpen(null)} />}
      {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} />}
    </div>
  )
}

export default Browse
