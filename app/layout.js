import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.min.css'
import { AuthStoreProvider } from '@/providers/auth-store-provider'
import { Noto_Sans } from 'next/font/google';

import "./globals.css";
import BootstrapClient from '@/app/components/BootstrapClient.js';

export const metadata = {
  title: "Yachasun Kichwa",
  description: "App para aprender Kichwa",
};

const sans = Noto_Sans({
  subsets: ['latin'],
  weight: "400",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" >
      <AuthStoreProvider>
        <body className={sans.className}>
          {children}
          <BootstrapClient />
        </body>
      </AuthStoreProvider>
    </html>
  )
}
