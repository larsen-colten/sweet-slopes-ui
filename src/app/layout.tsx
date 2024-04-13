'use client'

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ProductCard from "./components/ProductCard";
import Header from "./components/Header";
import { useState } from "react";
import { createContext } from "vm";
import Product from "./types/Product";
import { CartContext } from "./contexts";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sweet Slopes Bakery",
  description: "Sweet Slopes Bakery",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [cart, setCart] = useState<Product[]>([]);

  return (
    <html lang="en" data-theme="sweetTooth">
      <CartContext.Provider value={cart}>
        <Header />
        {children}
      </CartContext.Provider>
    </html>
  );
}
