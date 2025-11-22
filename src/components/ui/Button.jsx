import React from 'react'
import { cn } from '../../lib/cn'

const Button = ({ as: Comp = 'button', className = '', variant = 'default', size = 'md', ...props }) => {
  const variants = {
    default: 'bg-emerald-800 text-white hover:bg-emerald-700',
    outline: 'border border-emerald-800 text-emerald-800 hover:bg-emerald-50',
    ghost: 'text-emerald-900 hover:bg-emerald-50',
    gold: 'bg-amber-600 text-white hover:bg-amber-500'
  }
  const sizes = {
    sm: 'px-3 py-1.5 text-sm rounded-md',
    md: 'px-4 py-2 text-sm rounded-lg',
    lg: 'px-5 py-3 text-base rounded-xl'
  }
  return (
    <Comp className={cn('inline-flex items-center justify-center transition-colors disabled:opacity-50 disabled:pointer-events-none', variants[variant], sizes[size], className)} {...props} />
  )
}

export default Button
