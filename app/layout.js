import './globals.css'

export const metadata = {
  title: 'Quantum Atom Explorer - Interactive Educational Tool',
  description: 'Explore atomic structure, electron configurations, and chemical reactivity through interactive visualizations. Learn about ionization energy, electron affinity, and the quantum origins of the octet rule.',
  keywords: 'atom, chemistry, quantum mechanics, electron configuration, periodic table, ionization energy, electron affinity, education',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>{children}</body>
    </html>
  )
}