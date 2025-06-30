import "./globals.css"

export const metadata = {
  title: "Climbing Topos - Diario de Escalada",
  description: "Registra y analiza tus rutas de escalada",
    generator: 'v0.dev'
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}
