import '@style/global.css';
import Navbar from '@components/navbar/navbar';

export const metadata = {
  title: 'Abdul Muqsit Fadil',
  description: 'Made from PMW 2023',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
