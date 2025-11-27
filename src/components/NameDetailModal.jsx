import React from 'react'
import { X, Share2 } from 'lucide-react'
import Button from './ui/Button'

const NameDetailModal = ({ item, onClose }) => {
  if (!item) return null

  const share = async () => {
    const text = `${item.english_name} (${item.arabic_name}) — ${item.meaning}`
    if (navigator.share) {
      try { await navigator.share({ title: 'NoorNames', text }) } catch {}
    } else {
      await navigator.clipboard.writeText(text)
      alert('Copied!')
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-emerald-950/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative max-w-2xl w-full bg-white dark:bg-emerald-900 rounded-3xl border border-emerald-900/10 dark:border-emerald-100/10 shadow-2xl overflow-hidden">
        <button onClick={onClose} className="absolute top-4 right-4 z-10 p-2 rounded-full hover:bg-emerald-50 dark:hover:bg-emerald-800 text-emerald-900 dark:text-emerald-100 transition-colors">
          <X />
        </button>
        <div className="p-6 sm:p-10">
          <div className="flex flex-col-reverse sm:flex-row items-start justify-between gap-6 pt-8 sm:pt-0">
            <div className="flex-1">
              <h2 className="font-serif text-4xl sm:text-5xl text-emerald-900 dark:text-emerald-50">{item.english_name}</h2>
              <p className="mt-2 text-emerald-900/70 dark:text-emerald-100/70 max-w-prose text-lg">{item.meaning}</p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                {item.gender && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-emerald-50 dark:bg-emerald-800/40 text-emerald-900 dark:text-emerald-100 border border-emerald-900/10 dark:border-emerald-100/10 capitalize">{item.gender}</span>
                )}
                {item.origin && (
                  <span className="text-sm text-emerald-900/60 dark:text-emerald-100/60">Origin: {item.origin}</span>
                )}
              </div>
            </div>
            <div className="text-right self-end sm:self-start">
              <div className="font-[Amiri] text-6xl sm:text-7xl leading-none text-emerald-900 dark:text-emerald-100 opacity-90">{item.arabic_name}</div>
            </div>
          </div>
          <div className="mt-10 pt-6 border-t border-emerald-900/10 dark:border-emerald-100/10">
            <Button onClick={share} className="inline-flex items-center gap-2 w-full sm:w-auto justify-center">
              <Share2 className="w-4 h-4"/> Share this Name
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NameDetailModal
