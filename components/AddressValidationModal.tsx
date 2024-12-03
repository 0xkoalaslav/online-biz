'use client'

import React from 'react'

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
  suggestedAddress: Address
  onConfirm: (address: Address) => void
}

export default function AddressValidationModal({
  isOpen,
  onClose,
  originalAddress,
  suggestedAddress,
  onConfirm
}: AddressValidationModalProps) {
  if (!isOpen) return null

  const formatAddress = (address: Address) => (
    <>
      <div>{address.street}</div>
      {address.apartment && <div>{address.apartment}</div>}
      <div>{address.city} {address.state} {address.postcode}</div>
      <div>{address.country}</div>
    </>
  )

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white text-black p-8 max-w-md w-full mx-4">
        <div className="flex justify-between items-start mb-6">
          <h2 className="text-xl font-mono">Confirm your shipping address</h2>
          <button onClick={onClose} className="text-2xl">&times;</button>
        </div>

        <p className="text-sm mb-6">
          We couldn't recognize the address you entered. Please confirm your shipping address:
        </p>

        <div className="space-y-4">
          <div className="flex items-start gap-2">
            <input 
              type="radio" 
              name="address" 
              id="suggested"
              defaultChecked 
              className="mt-1"
            />
            <label htmlFor="suggested" className="text-sm">
              <div className="font-bold">Suggested address</div>
              <div>{suggestedAddress.street}</div>
              <div>{suggestedAddress.city} {suggestedAddress.state} {suggestedAddress.postcode}</div>
              <div>{suggestedAddress.country}</div>
            </label>
          </div>

          <div className="flex items-start gap-2">
            <input 
              type="radio" 
              name="address" 
              id="original"
              className="mt-1"
            />
            <label htmlFor="original" className="text-sm">
              <div className="font-bold">Original address</div>
              {formatAddress(originalAddress)}
            </label>
          </div>
        </div>

        <div className="flex justify-end gap-4 mt-8">
          <button 
            onClick={onClose}
            className="px-4 py-2 text-sm hover:underline"
          >
            Go back
          </button>
          <button
            onClick={() => onConfirm(suggestedAddress)}
            className="px-4 py-2 text-sm bg-black text-white hover:bg-gray-800"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  )
} 