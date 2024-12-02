'use client'

import { useState } from 'react'
import Image from 'next/image'

interface ProductGalleryProps {
  images: string[]
  productName: string
}

export default function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [currentImage, setCurrentImage] = useState(0)

  return (
    <div className="space-y-4">
      <div className="relative aspect-square">
        <Image
          src={images[currentImage]}
          alt={productName}
          fill
          className="object-cover"
        />
      </div>
      <div className="grid grid-cols-4 gap-2">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setCurrentImage(index)}
            className={`relative aspect-square ${
              currentImage === index ? 'border-2 border-white' : ''
            }`}
          >
            <Image
              src={image}
              alt={`${productName} view ${index + 1}`}
              fill
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  )
} 