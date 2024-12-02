import '@/styles/globals.css'
import { ShopProvider } from '@/context/ShopContext'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <ShopProvider>
          {children}
        </ShopProvider>
      </body>
    </html>
  )
} 