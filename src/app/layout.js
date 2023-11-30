import { Inter } from 'next/font/google'

import '@style/global.css';
import Navbar from '@components/navbar/navbar';


const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Abdul Muqsit Fadil',
  description: 'Made from PMW 2023',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
      <Navbar></Navbar>{children}
      </body>
    </html>
  )
}
