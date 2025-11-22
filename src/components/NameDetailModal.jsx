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
      <div className="relative max-w-2xl w-full bg-white rounded-3xl border border-emerald-900/10 shadow-2xl">
        <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-full hover:bg-emerald-50 text-emerald-900">
          <X />
        </button>
        <div className="p-6 sm:p-10">
          <div className="flex items-start justify-between gap-6">
            <div>
              <h2 className="font-serif text-4xl sm:text-5xl text-emerald-900">{item.english_name}</h2>
              <p className="mt-2 text-emerald-900/70 max-w-prose">{item.meaning}</p>
              <div className="mt-4 flex items-center gap-3">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-emerald-50 text-emerald-900 border border-emerald-900/10 capitalize">{item.gender}</span>
                {item.origin && (
                  <span className="text-xs text-emerald-900/60">Origin: {item.origin}</span>
                )}
              </div>
            </div>
            <div className="text-right">
              <div className="font-[Amiri] text-6xl leading-none text-emerald-900">{item.arabic_name}</div>
            </div>
          </div>
          <div className="mt-8">
            <Button onClick={share} variant="gold" className="inline-flex items-center gap-2">
              <Share2 className="w-4 h-4"/> Share this Name
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NameDetailModal
