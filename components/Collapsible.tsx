'use client'

import { useState } from 'react'

interface CollapsibleProps {
  title: string
  children: React.ReactNode
}

export default function Collapsible({ title, children }: CollapsibleProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="border-t border-gray-800">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-4 flex justify-between items-center text-left"
      >
        <span>{title}</span>
        <span>{isOpen ? '-' : '+'}</span>
      </button>
      {isOpen && (
        <div className="pb-4">
          {children}
        </div>
      )}
    </div>
  )
} 