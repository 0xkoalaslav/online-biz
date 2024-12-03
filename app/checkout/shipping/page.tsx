'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { calculateShipping, formatDeliveryDate } from '@/lib/shipping'

export default function Shipping() {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  // Get address data from URL params
  const street = searchParams.get('street') || ''
  const apartment = searchParams.get('apartment')
  const city = searchParams.get('city') || ''
  const state = searchParams.get('state') || ''
  const postcode = searchParams.get('postcode') || ''
  const country = searchParams.get('country') || 'Australia'

  // Format the address
  const formattedAddress = [
    street,
    apartment,
    `${city} ${state} ${postcode}`,
    country
  ].filter(Boolean).join(', ')

  const quantity = Number(searchParams.get('quantity') || '1')
  const price = 35
  const subtotal = Number(quantity) * price
  const { cost: shippingCost, estimatedDelivery } = calculateShipping(country, quantity)
  const deliveryRange = `${formatDeliveryDate(estimatedDelivery.min)} - ${formatDeliveryDate(estimatedDelivery.max)}`
  const tax = (subtotal + shippingCost) * 0.1 // Example: 10% tax
  const total = subtotal + shippingCost + tax

  const [selectedShipping, setSelectedShipping] = useState('standard')

  const handleContinueToPayment = () => {
    router.push('/checkout/payment')
  }

  return (
    <div className="min-h-screen bg-black text-white font-mono">
      {/* Header */}
      <div className="text-center py-4 border-b border-gray-800">
        <div className="flex justify-center gap-8 text-sm">
          <div>Information</div>
          <div>›</div>
          <div className="font-bold">Shipping</div>
          <div>›</div>
          <div>Payment</div>
        </div>
      </div>

      <div className="max-w-[1000px] mx-auto px-4 py-8">
        <div className="grid grid-cols-[1fr,400px] gap-8">
          {/* Left Column */}
          <div>
            <div className="mb-8">
              <div className="flex items-baseline justify-between mb-2">
                <div className="text-sm">Ships to:</div>
                <button 
                  onClick={() => router.back()} 
                  className="text-sm underline"
                >
                  Change
                </button>
              </div>
              <div className="text-sm bg-transparent border border-gray-600 p-4 rounded">
                {formattedAddress}
              </div>
            </div>

            <div>
              <div className="text-sm mb-4">Delivery options</div>
              <div className="border border-gray-600 rounded">
                <label className="flex items-center justify-between p-4 cursor-pointer">
                  <div className="flex items-center gap-4">
                    <input
                      type="radio"
                      name="shipping"
                      value="standard"
                      checked={selectedShipping === 'standard'}
                      onChange={(e) => setSelectedShipping(e.target.value)}
                      className="text-black"
                    />
                    <div className="text-sm">
                      <div>{deliveryRange}</div>
                      <div className="text-gray-400">(Standard)</div>
                    </div>
                  </div>
                  <div>${shippingCost.toFixed(2)}</div>
                </label>
              </div>
            </div>

            <div className="flex justify-between items-center mt-8">
              <Link href="/checkout" className="text-sm hover:underline">
                ‹ Return to Information
              </Link>
              <button 
                onClick={handleContinueToPayment}
                className="px-6 py-3 bg-black text-white border border-white hover:bg-white hover:text-black"
              >
                Continue to Payment
              </button>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="bg-gray-50 p-6 text-black h-full">
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
              <div>${subtotal}</div>
            </div>

            <div className="py-4 border-b border-gray-200">
              <div className="flex justify-between mb-2">
                <div>Subtotal ({quantity} items)</div>
                <div>${subtotal}</div>
              </div>
              <div className="flex justify-between mb-2">
                <div>Shipping</div>
                <div>${shippingCost.toFixed(2)}</div>
              </div>
              <div className="flex justify-between">
                <div>Taxes/VAT</div>
                <div>${tax.toFixed(2)}</div>
              </div>
            </div>

            <div className="flex justify-between py-4">
              <div>Total</div>
              <div className="text-right">
                <div className="text-sm text-gray-500">USD</div>
                <div>${total.toFixed(2)}</div>
              </div>
            </div>

            <button className="w-full text-left text-sm mt-4">
              Promo code ›
            </button>
          </div>
        </div>
      </div>
    </div>
  )
} 