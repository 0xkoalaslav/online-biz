'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Payment() {
  const router = useRouter()
  const [sameAsShipping, setSameAsShipping] = useState(true)
  const shippingAddress = "104 Ramleh Park, Dublin 6 Dublin D06 R5F6, Ireland"

  const handleChangeAddress = () => {
    router.push('/checkout')
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
          {/* Left Column */}
          <div className="space-y-8">
            {/* Shipping Address Display */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <div>Ships to: {shippingAddress}</div>
                <button 
                  onClick={handleChangeAddress}
                  className="text-sm underline hover:text-gray-400"
                >
                  Change
                </button>
              </div>
            </div>

            {/* Billing Address */}
            <div>
              <h2 className="text-xl mb-4">Billing address</h2>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={sameAsShipping}
                  onChange={(e) => setSameAsShipping(e.target.checked)}
                />
                <span>Same as shipping address</span>
              </label>
            </div>

            {/* Payment Method */}
            <div>
              <h2 className="text-xl mb-4">Payment method</h2>
              
              {/* Card Payment */}
              <div className="border border-white/20 p-4">
                <div className="flex items-center gap-2 mb-4">
                  <input type="radio" name="payment" id="card" defaultChecked />
                  <label htmlFor="card">Card</label>
                </div>

                <div className="space-y-4">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="1234 1234 1234 1234"
                      className="w-full p-3 bg-black border border-white/20"
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-2">
                      <Image
                        src="/images/payment/visa.jpg"
                        alt="Visa"
                        width={32}
                        height={20}
                      />
                      <Image
                        src="/images/payment/mastercard.jpg"
                        alt="Mastercard"
                        width={32}
                        height={20}
                      />
                      <Image
                        src="/images/payment/amex.jpg"
                        alt="American Express"
                        width={32}
                        height={20}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="MM / YY"
                      className="p-3 bg-black border border-white/20"
                    />
                    <input
                      type="text"
                      placeholder="CVC"
                      className="p-3 bg-black border border-white/20"
                    />
                  </div>
                </div>
              </div>

              {/* PayPal */}
              <div className="border border-white/20 p-4 mt-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <input type="radio" name="payment" id="paypal" />
                    <label htmlFor="paypal">PayPal</label>
                  </div>
                  <Image
                    src="/images/payment/paypal.jpg"
                    alt="PayPal"
                    width={60}
                    height={20}
                  />
                </div>
              </div>

              {/* Apple Pay */}
              <div className="border border-white/20 p-4 mt-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <input type="radio" name="payment" id="applepay" />
                    <label htmlFor="applepay">Apple Pay</label>
                  </div>
                  <Image
                    src="/images/payment/applepay.jpg"
                    alt="Apple Pay"
                    width={50}
                    height={20}
                  />
                </div>
              </div>

              {/* Google Pay */}
              <div className="border border-white/20 p-4 mt-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <input type="radio" name="payment" id="googlepay" />
                    <label htmlFor="googlepay">Google Pay</label>
                  </div>
                  <Image
                    src="/images/payment/googlepay.jpg"
                    alt="Google Pay"
                    width={50}
                    height={20}
                  />
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex justify-between items-center pt-4">
              <Link href="/checkout" className="text-sm">
                ‹ Return to Shipping
              </Link>
              <button className="px-6 py-3 bg-black text-white border border-white hover:bg-white hover:text-black">
                Complete order
              </button>
            </div>

            {/* Terms */}
            <p className="text-xs text-gray-400">
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
                  4
                </span>
              </div>
              <div className="flex-1">
                <div className="text-sm">
                  make europe great again cap (MEGA eu/acc official) hat blue - 100% cotton
                </div>
                <div className="text-sm text-gray-500">Navy, One size</div>
              </div>
              <div>$35</div>
            </div>

            <div className="py-4 border-b border-gray-200">
              <div className="flex justify-between mb-2">
                <div>Subtotal (4 items)</div>
                <div>$140</div>
              </div>
              <div className="flex justify-between mb-2">
                <div>Shipping</div>
                <div>$9.60</div>
              </div>
              <div className="flex justify-between">
                <div>Taxes/VAT</div>
                <div>$14.61</div>
              </div>
            </div>

            <div className="flex justify-between py-4">
              <div>Total</div>
              <div className="text-right">
                <div className="text-sm text-gray-500">USD</div>
                <div>$164.21</div>
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