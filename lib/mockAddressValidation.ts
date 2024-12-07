interface SuggestedAddress {
  street: string
  apartment?: string
  city: string
  state: string
  postcode: string
  country: string
}

export const validateAddress = (address: {
  street: string
  city: string
  state: string
  postcode: string
  country: string
}): SuggestedAddress => {
  // Mock validation - returns slightly modified address
  const suggestions: Record<string, SuggestedAddress> = {
    // Dublin addresses
    'dublin': {
      street: '104 Ramleh Park',
      city: 'Dublin 6',
      state: 'Dublin',
      postcode: 'D06 R5F6',
      country: 'Ireland'
    },
    // Cork addresses
    'cork': {
      street: '15 Saint Patrick\'s Hill',
      city: 'Cork City',
      state: 'Cork',
      postcode: 'T23 H6FF',
      country: 'Ireland'
    },
    // Default suggestion
    'default': {
      street: address.street,
      city: address.city,
      state: address.state,
      postcode: address.postcode.toUpperCase(),
      country: address.country
    }
  }

  // Simple logic to return different suggestions based on the city
  const cityLower = address.city.toLowerCase()
  if (cityLower.includes('dublin')) {
    return suggestions.dublin
  } else if (cityLower.includes('cork')) {
    return suggestions.cork
  }
  
  return suggestions.default
} 