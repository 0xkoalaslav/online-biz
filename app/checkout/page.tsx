'use client'

import { useState, useEffect, Suspense } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import AddressValidationModal from '@/components/AddressValidationModal'
import { searchPlaces, getPlaceDetails, PlacesSuggestion } from '@/lib/mockPlaces'

interface FormData {
  email: string
  fullName: string
  street: string
  apartment: string
  city: string
  state: string
  postcode: string
  phone: string
  country: string
}

interface Errors {
  email: string
  fullName: string
  street: string
  city: string
  postcode: string
  phone: string
}

interface Address {
  street: string
  apartment?: string
  city: string
  state: string
  postcode: string
  country: string
}

function CheckoutContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const quantity = searchParams.get('quantity') || '1'
  const price = 35
  const total = Number(quantity) * price

  const [formData, setFormData] = useState<FormData>({
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

  const [errors, setErrors] = useState<Errors>({
    email: '',
    fullName: '',
    street: '',
    city: '',
    postcode: '',
    phone: ''
  })

  const [showAddressValidation, setShowAddressValidation] = useState(false)
  const [isGooglePayAvailable, setIsGooglePayAvailable] = useState(false)
  const [isApplePayAvailable, setIsApplePayAvailable] = useState(false)
  const [addressSuggestions, setAddressSuggestions] = useState<PlacesSuggestion[]>([])
  const [showAddressSuggestions, setShowAddressSuggestions] = useState(false)

  useEffect(() => {
    // Simplified availability checks for now
    setIsGooglePayAvailable(true)  // We'll add proper detection later
    setIsApplePayAvailable(true)   // We'll add proper detection later
  }, [])

  // Validation functions
  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const isValidFullName = (name: string) => {
    const nameParts = name.trim().split(' ')
    return nameParts.length >= 2 && nameParts[0].length > 0 && nameParts[1].length > 0
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Clear error when user starts typing
    if (name in errors) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const handleBlur = (field: keyof Errors, message: string) => {
    if (!formData[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: message
      }))
    }
  }

  const handleStreetAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    console.log('Input value:', value)
    
    // Update form data
    handleInputChange(e)

    // Get suggestions if user has typed at least 1 character
    if (value.length > 0) {
      const results = searchPlaces(value)
      console.log('Search results:', results)
      setAddressSuggestions(results)
      setShowAddressSuggestions(true)
    } else {
      setAddressSuggestions([])
      setShowAddressSuggestions(false)
    }
  }

  const handleSuggestionSelect = (suggestion: PlacesSuggestion) => {
    // Auto-fill the form with selected address
    setFormData(prev => ({
      ...prev,
      street: suggestion.fullAddress.street,
      city: suggestion.fullAddress.city,
      state: suggestion.fullAddress.state,
      postcode: suggestion.fullAddress.postcode,
      country: suggestion.fullAddress.country
    }))
    setShowAddressSuggestions(false)
  }

  const validateForm = () => {
    const newErrors = {
      email: '',
      fullName: '',
      street: '',
      city: '',
      postcode: '',
      phone: ''
    }

    if (!formData.email || !isValidEmail(formData.email)) {
      newErrors.email = 'A valid email is required.'
    }
    if (!formData.fullName || !isValidFullName(formData.fullName)) {
      newErrors.fullName = 'A recipient full name has to contain both first and last name'
    }
    if (!formData.street) newErrors.street = 'A shipping street address is required.'
    if (!formData.city) newErrors.city = 'A shipping city is required.'
    if (!formData.postcode) newErrors.postcode = 'A shipping zip or postal code is required.'
    if (!formData.phone) newErrors.phone = 'A recipient phone number is required.'

    setErrors(newErrors)
    return !Object.values(newErrors).some(error => error !== '')
  }

  const handleContinueToShipping = () => {
    if (validateForm()) {
      setShowAddressValidation(true)
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handleAddressConfirm = (confirmedAddress: Address) => {
    setFormData(prev => ({
      ...prev,
      ...confirmedAddress
    }))
    setShowAddressValidation(false)
    
    // Create URL with address parameters
    const params = new URLSearchParams({
      street: confirmedAddress.street,
      city: confirmedAddress.city,
      state: confirmedAddress.state,
      postcode: confirmedAddress.postcode,
      country: confirmedAddress.country
    })
    
    if (confirmedAddress.apartment) {
      params.append('apartment', confirmedAddress.apartment)
    }
    
    router.push(`/checkout/shipping?${params.toString()}`)
  }

  const handleGooglePay = () => {
    // Simplified for now
    console.log('Google Pay clicked')
  }

  const handleApplePay = () => {
    // Simplified for now
    console.log('Apple Pay clicked')
  }

  return (
    <div className="min-h-screen bg-black text-white font-mono">
      {/* Header */}
      <div className="text-center py-4 border-b border-gray-800">
        <div className="flex justify-center gap-8 text-sm">
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
          <div>
            <div className="text-center text-sm mb-4">EXPRESS CHECKOUT</div>
            
            <div className="flex gap-2 mb-4">
              {isGooglePayAvailable && (
                <button
                  onClick={handleGooglePay}
                  className="flex-1 h-12 bg-white flex items-center justify-center rounded"
                >
                  <Image
                    src="/images/payment/googlepay.jpg"
                    alt="Google Pay"
                    width={45}
                    height={20}
                    className="object-contain"
                  />
                </button>
              )}
              
              {isApplePayAvailable && (
                <button
                  onClick={handleApplePay}
                  className="flex-1 h-12 bg-black border border-white flex items-center justify-center rounded"
                >
                  <Image
                    src="/images/payment/applepay.jpg"
                    alt="Apple Pay"
                    width={45}
                    height={20}
                    className="object-contain"
                  />
                </button>
              )}
            </div>

            <div className="text-center text-sm mb-8">OR</div>

            <div className="space-y-8">
              {/* Contact Section */}
              <div>Contact</div>
              
              {/* Email Input */}
              <div className="relative mb-8">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  onBlur={() => handleBlur('email', 'A valid email is required.')}
                  placeholder="E-mail address"
                  className={`w-full p-3 bg-gray-100 text-black ${
                    errors.email ? 'border border-red-500' : ''
                  }`}
                />
                {errors.email && (
                  <div className="absolute -bottom-7 left-0 bg-red-500 text-white text-sm px-2 py-1">
                    {errors.email}
                  </div>
                )}
              </div>

              {/* Full Name Input */}
              <div className="relative mb-8">
                <input
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  onBlur={() => handleBlur('fullName', 'A recipient full name is required.')}
                  type="text"
                  placeholder="Full name"
                  className={`w-full p-3 bg-gray-100 text-black ${
                    errors.fullName ? 'border border-red-500' : ''
                  }`}
                />
                {errors.fullName && (
                  <div className="absolute -bottom-7 left-0 bg-red-500 text-white text-sm px-2 py-1">
                    {errors.fullName}
                  </div>
                )}
              </div>

              {/* Street Address Input with Suggestions */}
              <div className="relative mb-8">
                <input
                  type="text"
                  name="street"
                  value={formData.street}
                  onChange={handleStreetAddressChange}
                  onBlur={() => setTimeout(() => setShowAddressSuggestions(false), 200)}
                  placeholder="Street address"
                  className={`w-full p-3 bg-gray-100 text-black ${
                    errors.street ? 'border border-red-500' : ''
                  }`}
                />
                
                {/* Address Suggestions Dropdown */}
                {showAddressSuggestions && addressSuggestions.length > 0 && (
                  <div className="absolute z-50 w-full bg-white border border-gray-200 mt-1 rounded-md shadow-lg max-h-60 overflow-auto">
                    {addressSuggestions.map((suggestion) => (
                      <button
                        key={suggestion.placeId}
                        onClick={() => handleSuggestionSelect(suggestion)}
                        className="w-full text-left p-3 hover:bg-gray-100 text-black border-b border-gray-100 last:border-0"
                      >
                        <div className="font-medium">{suggestion.mainText}</div>
                        <div className="text-sm text-gray-600">{suggestion.secondaryText}</div>
                      </button>
                    ))}
                  </div>
                )}
                {errors.street && (
                  <div className="absolute -bottom-7 left-0 bg-red-500 text-white text-sm px-2 py-1">
                    {errors.street}
                  </div>
                )}
              </div>

              <div className="mb-8">
                <input
                  name="apartment"
                  value={formData.apartment}
                  onChange={handleInputChange}
                  type="text"
                  placeholder="Apartment, suite, etc. (optional)"
                  className="w-full p-3 bg-gray-100 text-black"
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="relative mb-8">
                  <input
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    onBlur={() => handleBlur('city', 'A shipping city is required.')}
                    type="text"
                    placeholder="City"
                    className={`w-full p-3 bg-gray-100 text-black ${
                      errors.city ? 'border border-red-500' : ''
                    }`}
                  />
                  {errors.city && (
                    <div className="absolute -bottom-7 left-0 bg-red-500 text-white text-sm px-2 py-1">
                      {errors.city}
                    </div>
                  )}
                </div>
                <input
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  type="text"
                  placeholder="State/province"
                  className="p-3 bg-gray-100 text-black"
                />
                <div className="relative mb-8">
                  <input
                    name="postcode"
                    value={formData.postcode}
                    onChange={handleInputChange}
                    onBlur={() => handleBlur('postcode', 'A shipping zip or postal code is required.')}
                    type="text"
                    placeholder="Postal code"
                    className={`w-full p-3 bg-gray-100 text-black ${
                      errors.postcode ? 'border border-red-500' : ''
                    }`}
                  />
                  {errors.postcode && (
                    <div className="absolute -bottom-7 left-0 bg-red-500 text-white text-sm px-2 py-1">
                      {errors.postcode}
                    </div>
                  )}
                </div>
              </div>

              <div className="relative mb-8">
                <input
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  onBlur={() => handleBlur('phone', 'A recipient phone number is required.')}
                  type="tel"
                  placeholder="Phone number"
                  className={`w-full p-3 bg-gray-100 text-black ${
                    errors.phone ? 'border border-red-500' : ''
                  }`}
                />
                {errors.phone && (
                  <div className="absolute -bottom-7 left-0 bg-red-500 text-white text-sm px-2 py-1">
                    {errors.phone}
                  </div>
                )}
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
        originalAddress={{
          street: formData.street,
          apartment: formData.apartment,
          city: formData.city,
          state: formData.state,
          postcode: formData.postcode,
          country: formData.country
        }}
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

export default function Checkout() {
  return (
    <Suspense 
      fallback={
        <div className="min-h-screen bg-black text-white font-mono flex items-center justify-center">
          Loading...
        </div>
      }
    >
      <CheckoutContent />
    </Suspense>
  )
} 