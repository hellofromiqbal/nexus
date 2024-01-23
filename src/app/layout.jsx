import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Nexus",
  description: "Social Media App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`bg-gradient-to-b from-slate-800 via-slate-900 to-slate-950 max-w-[1440px] mx-auto ${inter.className}`}>
        <Toaster/>
        {children}
      </body>
    </html>
  );
}
