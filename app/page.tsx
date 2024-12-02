'use client'

import Image from 'next/image'
import Link from 'next/link'
import { products } from '@/lib/products'
import Collapsible from '@/components/Collapsible'
import ProductGallery from '@/components/ProductGallery'
import { useShop } from '@/context/ShopContext'
import { useRouter } from 'next/navigation'

export default function Home() {
  const { quantity, setQuantity } = useShop()
  const router = useRouter()
  const featuredProduct = products['miga-cap-navy']

  const handleBuyNow = () => {
    router.push(`/checkout?quantity=${quantity}`)
  }

  return (
    <div className="min-h-screen bg-black text-white font-mono">
      {/* Promo Banner */}
      <div className="py-2 text-center border-b border-gray-800">
        <p className="text-sm font-mono">USE PROMO CODE ACCELERATE FOR 20% OFF</p>
      </div>

      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <div className="flex justify-end">
          <div>🔲</div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold mb-4">
          Wear Your Pride: Make Ireland Great Again!
        </h1>
        <p className="text-xl text-gray-400">
          Join the movement and show your love for Ireland this election season!
        </p>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-[220px_1fr_400px] gap-20">
          {/* Left Sidebar */}
          <div className="space-y-4 font-mono text-sm">
            <div>★ BESTSELLERS</div>
            <div className="space-y-2 text-gray-400">
              <div>see all products</div>
              <div>100% cotton</div>
              <div>hats</div>
              <div>t-shirts & tops</div>
              <div>hoodies</div>
              <div>stickers</div>
              <div>bags</div>
            </div>
          </div>

          {/* Center Image */}
          <div>
            <ProductGallery 
              images={featuredProduct.images}
              productName={featuredProduct.name}
            />
          </div>

          {/* Right Product Info */}
          <div className="space-y-6">
            <h1 className="text-2xl">
              make ireland great again cap (MIGA official) hat blue - 100% cotton
            </h1>
            
            <div className="text-xl">$35.00</div>
            
            <div>LIMITED EDITION</div>

            {/* Buy Now Section */}
            <div className="flex gap-2">
              <select
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="w-20 h-12 bg-black border border-white/20 text-center"
              >
                {[1, 2, 3, 4, 5].map((num) => (
                  <option key={num} value={num}>{num}</option>
                ))}
              </select>

              <button
                onClick={handleBuyNow}
                className="flex-1 h-12 bg-white text-black hover:bg-gray-100 font-medium"
              >
                Buy Now
              </button>
            </div>

            {/* Payment Methods */}
            <div className="flex gap-2 items-center mt-4">
              <span className="text-sm text-gray-400">Secure payment via</span>
              <div className="flex gap-2">
                <Image
                  src="/images/payment/visa.jpg"
                  alt="Visa"
                  width={32}
                  height={20}
                  className="opacity-60 hover:opacity-100"
                />
                <Image
                  src="/images/payment/mastercard.jpg"
                  alt="Mastercard"
                  width={32}
                  height={20}
                  className="opacity-60 hover:opacity-100"
                />
                <Image
                  src="/images/payment/amex.jpg"
                  alt="American Express"
                  width={32}
                  height={20}
                  className="opacity-60 hover:opacity-100"
                />
                <Image
                  src="/images/payment/applepay.jpg"
                  alt="Apple Pay"
                  width={32}
                  height={20}
                  className="opacity-60 hover:opacity-100"
                />
                <Image
                  src="/images/payment/googlepay.jpg"
                  alt="Google Pay"
                  width={32}
                  height={20}
                  className="opacity-60 hover:opacity-100"
                />
              </div>
            </div>

            {/* Collapsible Sections */}
            <div className="space-y-4 pt-8">
              <Collapsible title="More details">
                <ul className="list-disc pl-5 text-sm space-y-2">
                  <li>100% chino cotton twill</li>
                  <li>Green Camo color is 35% chino cotton twill, 65% polyester</li>
                  <li>One size fits most</li>
                  <li>Buckle Closure</li>
                </ul>
              </Collapsible>

              <Collapsible title="Size & Fit">
                <ul className="list-disc pl-5 text-sm">
                  <li>Circumference: 23 ⅛" - 24 ⅛"</li>
                </ul>
              </Collapsible>

              <Collapsible title="Quality Guarantee & Returns">
                <ul className="list-disc pl-5 text-sm space-y-2">
                  <li>Quality is guaranteed. If there is a print error or visible quality issue, we'll replace or refund it.</li>
                  <li>Because the products are made to order, we do not accept general returns or sizing-related returns.</li>
                </ul>
              </Collapsible>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
