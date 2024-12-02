'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import AddressValidationModal from '@/components/AddressValidationModal'

export default function Checkout() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const quantity = searchParams.get('quantity') || '1'
  const price = 35
  const total = Number(quantity) * price

  const [showAddressValidation, setShowAddressValidation] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    fullName: '',
    street: '',
    apartment: '',
    city: '',
    state: '',
    postcode: '',
    phone: '',
    country: 'Ireland'
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleContinueToShipping = () => {
    setShowAddressValidation(true)
  }

  const handleAddressConfirm = (confirmedAddress: Address) => {
    setFormData(confirmedAddress)
    setShowAddressValidation(false)
    router.push('/checkout/payment')
  }

  // Format the address for the modal
  const originalAddress = {
    street: formData.street,
    apartment: formData.apartment,
    city: formData.city,
    state: formData.state,
    postcode: formData.postcode,
    country: formData.country
  }

  return (
    <div className="min-h-screen bg-black text-white font-mono">
      {/* Header */}
      <div className="text-center py-4 border-b border-gray-800">
        <div>@levelsio | techno optimism</div>
        <div className="flex justify-center gap-8 mt-4 text-sm">
          <div>Information</div>
          <div>›</div>
          <div>Shipping</div>
          <div>›</div>
          <div>Payment</div>
        </div>
      </div>

      <div className="max-w-[1000px] mx-auto px-4 py-8">
        <div className="grid grid-cols-[1fr,400px] gap-8">
          {/* Left Column - Form */}
          <div className="space-y-8">
            <div className="text-center">EXPRESS CHECKOUT</div>

            <div className="text-center">OR</div>

            <div>
              <h2 className="text-xl mb-4">Contact</h2>
              <input
                type="email"
                placeholder="E-mail address"
                className="w-full p-3 bg-gray-100 text-black"
              />
            </div>

            <div>
              <h2 className="text-xl mb-4">Shipping address</h2>
              <div className="space-y-4">
                <select className="w-full p-3 bg-gray-100 text-black">
                  <option>Ireland</option>
                </select>
                <input
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  type="text"
                  placeholder="Full name"
                  className="w-full p-3 bg-gray-100 text-black"
                />
                <input
                  name="street"
                  value={formData.street}
                  onChange={handleInputChange}
                  type="text"
                  placeholder="Street address"
                  className="w-full p-3 bg-gray-100 text-black"
                />
                <input
                  name="apartment"
                  value={formData.apartment}
                  onChange={handleInputChange}
                  type="text"
                  placeholder="Apartment, suite, etc. (optional)"
                  className="w-full p-3 bg-gray-100 text-black"
                />
                <div className="grid grid-cols-3 gap-4">
                  <input
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    type="text"
                    placeholder="City"
                    className="p-3 bg-gray-100 text-black"
                  />
                  <input
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    type="text"
                    placeholder="State/province"
                    className="p-3 bg-gray-100 text-black"
                  />
                  <input
                    name="postcode"
                    value={formData.postcode}
                    onChange={handleInputChange}
                    type="text"
                    placeholder="Postal code"
                    className="p-3 bg-gray-100 text-black"
                  />
                </div>
                <input
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  type="tel"
                  placeholder="Phone number"
                  className="w-full p-3 bg-gray-100 text-black"
                />
                <p className="text-sm text-gray-400">
                  The shipping carrier for this order requires a contact number
                </p>
              </div>
            </div>

            <div className="flex justify-between items-center pt-4">
              <Link href="/" className="text-sm">
                ‹ Return to Cart
              </Link>
              <button 
                onClick={handleContinueToShipping}
                className="px-6 py-3 bg-black text-white border border-white hover:bg-white hover:text-black"
              >
                Continue to Shipping
              </button>
            </div>

            <p className="text-xs text-gray-400 pt-4">
              This order is handled by our online retailer and Merchant of Record, Fourthwall.com, who handle order-related inquiries and returns.
              <Link href="/privacy" className="underline ml-1">Privacy Policy</Link>
              <Link href="/terms" className="underline ml-1">Terms of Service</Link>
            </p>
          </div>

          {/* Right Column - Order Summary */}
          <div className="bg-gray-50 p-6 text-black">
            <div className="flex items-center gap-4 pb-6 border-b border-gray-200">
              <div className="relative w-16 h-16 bg-gray-200">
                <Image
                  src="/images/products/miga-cap-1.jpg"
                  alt="Product"
                  fill
                  className="object-cover"
                />
                <span className="absolute -right-2 -top-2 bg-gray-500 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs">
                  {quantity}
                </span>
              </div>
              <div className="flex-1">
                <div className="text-sm">
                  make europe great again cap (MEGA eu/acc official) hat blue - 100% cotton
                </div>
                <div className="text-sm text-gray-500">Navy, One size</div>
              </div>
              <div>${total}</div>
            </div>

            <div className="py-4 border-b border-gray-200">
              <div className="flex justify-between mb-2">
                <div>Subtotal ({quantity} items)</div>
                <div>${total}</div>
              </div>
              <div className="flex justify-between">
                <div>Taxes/VAT</div>
                <div>-</div>
              </div>
            </div>

            <div className="flex justify-between py-4">
              <div>Total</div>
              <div className="text-right">
                <div className="text-sm text-gray-500">USD</div>
                <div>${total}</div>
              </div>
            </div>

            <button className="w-full text-left text-sm mt-4">
              Promo code ›
            </button>
          </div>
        </div>
      </div>

      <AddressValidationModal
        isOpen={showAddressValidation}
        onClose={() => setShowAddressValidation(false)}
        originalAddress={originalAddress}
        suggestedAddress={{
          street: '104 Ramleh Park',
          city: 'Dublin 6',
          state: 'Dublin',
          postcode: 'D06 R5F6',
          country: 'Ireland'
        }}
        onConfirm={handleAddressConfirm}
      />
    </div>
  )
} 