import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.min.css'
import { Inter } from "next/font/google";
import "./globals.css";
const inter = Inter({ subsets: ["latin"] });
import BootstrapClient from '@/app/components/BootstrapClient.js';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

export const metadata = {
  title: "Yachasun Kichwa",
  description: "App para aprender Kichwa",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <body className={inter.className}>
          <Navbar />
          {children}
          <BootstrapClient />
          <Footer />
        </body>
      </body>
    </html>
  )
}


