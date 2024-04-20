'use client'

import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import { useState } from "react";
import Product from "./types/Product";
import { CartContext } from "./contexts";

const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "Sweet Slopes Bakery",
//   description: "Sweet Slopes Bakery",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [cart, setCart] = useState<Product[]>([]);

  return (
    <html lang="en" data-theme="sweetTooth">
      <body>
        <CartContext.Provider value={cart} >
          <Header />
          {children}
        </CartContext.Provider>
      </body>
    </html>
  );
}
