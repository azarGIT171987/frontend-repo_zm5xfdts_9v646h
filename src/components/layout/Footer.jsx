import React from 'react'

const Footer = () => {
  return (
    <footer className="mt-16 border-t border-emerald-900/10 dark:border-emerald-100/10 bg-white/70 dark:bg-emerald-950/40 backdrop-blur-xl">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-sm text-emerald-900/70 dark:text-emerald-100/70 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p>© {new Date().getFullYear()} NoorNames — The Light of Names</p>
        <div className="flex gap-4">
          <a href="#" className="hover:text-emerald-900 dark:hover:text-emerald-50 transition-colors">Credits</a>
          <a href="#" className="hover:text-emerald-900 dark:hover:text-emerald-50 transition-colors">Contact</a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
