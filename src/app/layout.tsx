import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ProductCard from "./components/ProductCard";
import Header from "./components/Header";

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
  return (
    <html lang="en" data-theme="sweetTooth">
      <Header />
      {children}
      <ProductCard />
    </html>
  );
}
