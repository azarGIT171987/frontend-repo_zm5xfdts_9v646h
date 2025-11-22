import React from 'react'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#F9FAFB] text-emerald-900 dark:bg-emerald-950 dark:text-emerald-50">
      <div className="fixed inset-0 -z-10 pointer-events-none" aria-hidden>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-50 via-transparent to-transparent dark:from-emerald-900/20" />
        <div className="absolute inset-0 opacity-[0.04] dark:opacity-[0.08]" style={{ backgroundImage: 'radial-gradient(#064E3B 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
      </div>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  )
}

export default Layout
