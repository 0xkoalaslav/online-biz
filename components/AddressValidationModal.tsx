'use client'

import React from 'react'
import { validateAddress } from '@/lib/mockAddressValidation'

interface Address {
  street: string
  city: string
  state: string
  postcode: string
  country: string
  apartment?: string
}

interface AddressValidationModalProps {
  isOpen: boolean
  onClose: () => void
  originalAddress: Address
  onConfirm: (address: Address) => void
}

export default function AddressValidationModal({
  isOpen,
  onClose,
  originalAddress,
  onConfirm
}: AddressValidationModalProps) {
  const suggestedAddress = validateAddress(originalAddress)

  return (
    <div className={`fixed inset-0 bg-black bg-opacity-50 z-50 ${isOpen ? 'block' : 'hidden'}`}>
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 max-w-md w-full text-black">
        <h2 className="text-xl mb-6">Verify Your Address</h2>
        
        <div className="mb-6">
          <p className="mb-2">We couldn't verify your address. Did you mean:</p>
          <div className="p-4 bg-gray-100">
            <p>{suggestedAddress.street}</p>
            {suggestedAddress.apartment && <p>{suggestedAddress.apartment}</p>}
            <p>{suggestedAddress.city}</p>
            <p>{suggestedAddress.state}, {suggestedAddress.postcode}</p>
            <p>{suggestedAddress.country}</p>
          </div>
        </div>

        <div className="flex gap-4">
          <button
            onClick={() => onConfirm(suggestedAddress)}
            className="flex-1 py-2 px-4 bg-black text-white hover:bg-gray-800"
          >
            Use suggested address
          </button>
          <button
            onClick={() => onConfirm(originalAddress)}
            className="flex-1 py-2 px-4 border border-black hover:bg-gray-100"
          >
            Keep original address
          </button>
        </div>
      </div>
    </div>
  )
} 