import React from 'react'

const Footer = () => {
  return (
    <footer className="mt-16 border-t border-emerald-900/10 bg-white/70 backdrop-blur-xl">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-sm text-emerald-900/70 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p>© {new Date().getFullYear()} NoorNames — The Light of Names</p>
        <div className="flex gap-4">
          <a href="#" className="hover:text-emerald-900">Credits</a>
          <a href="#" className="hover:text-emerald-900">Contact</a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
