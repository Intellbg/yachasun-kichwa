import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.min.css'
import { Inter } from "next/font/google";
import "./globals.css";
const inter = Inter({ subsets: ["latin"] });
import BootstrapClient from '@/app/components/BootstrapClient.js';

export const metadata = {
  title: "Yachasun Kichwa",
  description: "App para aprender Kichwa",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <body className={inter.className}>
          {children}
          <BootstrapClient />
          {/* <Footer /> */}
        </body>
      </body>      
    </html>
  )
}


