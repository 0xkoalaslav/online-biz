interface ShippingZone {
  country: string
  baseRate: number
  additionalItemRate: number
  estimatedDays: {
    min: number
    max: number
  }
}

const shippingZones: ShippingZone[] = [
  {
    country: 'Australia',
    baseRate: 13.05,
    additionalItemRate: 5.00,
    estimatedDays: {
      min: 3,
      max: 7
    }
  },
  {
    country: 'United States',
    baseRate: 15.00,
    additionalItemRate: 6.00,
    estimatedDays: {
      min: 5,
      max: 10
    }
  },
  // Add more zones as needed
]

export function calculateShipping(country: string, quantity: number): {
  cost: number
  estimatedDelivery: {
    min: Date
    max: Date
  }
} {
  // Find the shipping zone
  const zone = shippingZones.find(z => z.country === country) || shippingZones[0]

  // Calculate cost
  const cost = zone.baseRate + (zone.additionalItemRate * (quantity - 1))

  // Calculate delivery dates
  const today = new Date()
  const minDelivery = new Date(today.setDate(today.getDate() + zone.estimatedDays.min))
  const maxDelivery = new Date(today.setDate(today.getDate() + zone.estimatedDays.max))

  return {
    cost: Number(cost.toFixed(2)),
    estimatedDelivery: {
      min: minDelivery,
      max: maxDelivery
    }
  }
}

export function formatDeliveryDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric'
  })
} 