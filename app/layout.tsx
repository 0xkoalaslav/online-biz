import '@/styles/globals.css'
import { ShopProvider } from '@/context/ShopContext'
import Script from 'next/script'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <Script
          src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`}
          strategy="beforeInteractive"
        />
      </head>
      <body>
        <ShopProvider>
          {children}
        </ShopProvider>
      </body>
    </html>
  )
} 