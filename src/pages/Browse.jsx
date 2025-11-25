import React, { useMemo, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { VirtuosoGrid } from 'react-virtuoso'
import { namesData, alpha, propheticNames } from '../data/namesData'
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
  const [prophetic, setProphetic] = useState(qs.get('prophetic') === 'true')
  const [letter, setLetter] = useState('All')
  const [pop, setPop] = useState('desc')
  const [open, setOpen] = useState(null)
  const { showAuthModal, setShowAuthModal } = useFavorites()

  const filtered = useMemo(() => {
    let arr = [...namesData]
    if (selectedGenders.size > 0) {
      arr = arr.filter(n => selectedGenders.has(n.gender) || (n.gender === 'unisex' && (selectedGenders.has('male') || selectedGenders.has('female'))))
    } else {
      arr = []
    }
    if (prophetic) arr = arr.filter(n => propheticNames.includes(n.english_name))
    if (letter !== 'All') arr = arr.filter(n => n.english_name.startsWith(letter))
    arr.sort((a, b) => pop === 'desc' ? b.popularity - a.popularity : a.popularity - b.popularity)
    return arr
  }, [selectedGenders, letter, pop, prophetic])

  const toggleGender = (g) => {
    const next = new Set(selectedGenders)
    if (next.has(g)) next.delete(g)
    else next.add(g)
    setSelectedGenders(next)
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 h-[calc(100vh-80px)]">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 h-full">
        <aside className="lg:col-span-1 space-y-6 h-fit">
          <div className="bg-white rounded-2xl p-6 border border-emerald-900/10 shadow-sm dark:bg-emerald-900/20 dark:border-emerald-100/10 dark:shadow-black/20">
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
            <label className="flex items-center gap-2 cursor-pointer group">
              <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${prophetic ? 'bg-emerald-900 border-emerald-900 dark:bg-emerald-500 dark:border-emerald-500' : 'border-emerald-900/30 dark:border-emerald-100/30 group-hover:border-emerald-900 dark:group-hover:border-emerald-500'}`}>
                {prophetic && <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
              </div>
              <input type="checkbox" className="hidden" checked={prophetic} onChange={() => setProphetic(!prophetic)} />
              <span className="text-emerald-900 dark:text-emerald-100">Prophetic Names</span>
            </label>
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

        <main className="lg:col-span-3 h-[600px] lg:h-auto flex flex-col">
          <div className="mb-4 text-emerald-900/60 dark:text-emerald-100/60 font-medium">
            Showing {filtered.length} names
          </div>
          {filtered.length === 0 && prophetic && letter !== 'All' ? (
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
            <VirtuosoGrid
              style={{ height: '100%' }}
              totalCount={filtered.length}
              overscan={200}
              components={{
                List: React.forwardRef(({ style, children, ...props }, ref) => (
                  <div
                    ref={ref}
                    {...props}
                    style={style}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
                  >
                    {children}
                  </div>
                )),
                Item: ({ children, ...props }) => (
                  <div {...props} className="h-full">
                    {children}
                  </div>
                )
              }}
              itemContent={(index) => {
                const item = filtered[index]
                return <NameCard key={`${item.english_name}-${item.gender}`} item={item} onOpen={(it) => setOpen(it)} />
              }}
            />
          )}
        </main>
      </div>

      {open && <NameDetailModal item={open} onClose={() => setOpen(null)} />}
      {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} />}
    </div>
  )
}

export default Browse
