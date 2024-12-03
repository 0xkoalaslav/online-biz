export interface PlacesSuggestion {
  mainText: string
  secondaryText: string
  placeId: string
  fullAddress: {
    street: string
    city: string
    state: string
    postcode: string
    country: string
  }
}

const mockAddresses: PlacesSuggestion[] = [
  {
    mainText: '123 Collins Street',
    secondaryText: 'Melbourne VIC, Australia',
    placeId: 'place1',
    fullAddress: {
      street: '123 Collins Street',
      city: 'Melbourne',
      state: 'VIC',
      postcode: '3000',
      country: 'Australia'
    }
  },
  {
    mainText: '45 George Street',
    secondaryText: 'Sydney NSW, Australia',
    placeId: 'place2',
    fullAddress: {
      street: '45 George Street',
      city: 'Sydney',
      state: 'NSW',
      postcode: '2000',
      country: 'Australia'
    }
  },
  {
    mainText: '78 Queen Street',
    secondaryText: 'Brisbane QLD, Australia',
    placeId: 'place3',
    fullAddress: {
      street: '78 Queen Street',
      city: 'Brisbane',
      state: 'QLD',
      postcode: '4000',
      country: 'Australia'
    }
  }
]

export function searchPlaces(query: string): PlacesSuggestion[] {
  if (!query || query.length < 1) return []
  
  return mockAddresses.filter(address => 
    address.mainText.toLowerCase().includes(query.toLowerCase()) ||
    address.secondaryText.toLowerCase().includes(query.toLowerCase())
  )
}

export function getPlaceDetails(placeId: string): PlacesSuggestion | undefined {
  return mockAddresses.find(address => address.placeId === placeId)
} 