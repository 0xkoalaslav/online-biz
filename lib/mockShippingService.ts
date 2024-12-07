interface ShippingMethod {
  id: string
  name: string
  price: number
  estimatedDays: string
}

interface ShippingAddress {
  street: string
  city: string
  state: string
  postcode: string
  country: string
}

interface ShippingAvailability {
  available: boolean
  methods: ShippingMethod[]
  message?: string
}

// Mock data for major cities and their postcodes
const majorCities = {
  'ireland': {
    cities: ['dublin', 'cork', 'galway', 'limerick'],
    postcodes: ['D01', 'D02', 'D03', 'D04', 'D06', 'D08', 'T12', 'H91', 'V94']
  },
  'uk': {
    cities: ['london', 'manchester', 'birmingham', 'edinburgh'],
    postcodes: ['E1', 'SW1', 'M1', 'B1', 'EH1']
  }
}

const standardShipping: ShippingMethod = {
  id: 'standard',
  name: 'Standard Shipping',
  price: 5,
  estimatedDays: '5-7 business days'
}

const expeditedShipping: ShippingMethod = {
  id: 'expedited',
  name: 'Expedited Shipping',
  price: 15,
  estimatedDays: '2-3 business days'
}

export const getAvailableShippingMethods = (address: ShippingAddress): ShippingAvailability => {
  // Convert inputs to lowercase for comparison
  const country = address.country.toLowerCase()
  const city = address.city.toLowerCase()
  const postcode = address.postcode.toUpperCase()

  // Always include standard shipping
  const methods: ShippingMethod[] = [standardShipping]

  // Check if expedited shipping is available
  let expeditedAvailable = false
  let message: string | undefined

  // First check if we service this country
  if (!majorCities[country as keyof typeof majorCities]) {
    return {
      available: true,
      methods,
      message: 'Only standard shipping available for this country'
    }
  }

  // Check if it's a major city
  const isMajorCity = majorCities[country as keyof typeof majorCities].cities.some(
    majorCity => city.includes(majorCity)
  )

  // Check if postcode is in supported areas
  const isPostcodeSupported = majorCities[country as keyof typeof majorCities].postcodes.some(
    supportedPostcode => postcode.startsWith(supportedPostcode)
  )

  // Mock service disruptions for certain areas (random for demo purposes)
  const hasServiceDisruption = Math.random() < 0.1 // 10% chance of service disruption

  if (hasServiceDisruption) {
    message = 'Due to service disruptions in your area, only standard shipping is available'
  } else if (isMajorCity || isPostcodeSupported) {
    expeditedAvailable = true
  } else {
    message = 'Expedited shipping is only available in major cities and select postal codes'
  }

  // Add expedited shipping if available
  if (expeditedAvailable) {
    methods.push(expeditedShipping)
  }

  return {
    available: true,
    methods,
    message
  }
} 