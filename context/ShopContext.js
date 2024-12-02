'use client'

import { createContext, useContext, useState } from 'react'

const ShopContext = createContext()

export function ShopProvider({ children }) {
  const [cart, setCart] = useState([])
  const [quantity, setQuantity] = useState(1)

  const value = {
    cart,
    quantity,
    setQuantity,
    setCart
  }

  return (
    <ShopContext.Provider value={value}>
      {children}
    </ShopContext.Provider>
  )
}

export const useShop = () => useContext(ShopContext)
