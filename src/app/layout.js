import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Digital ui Store",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full">
      <body
        className={cn(
          " relative h-full font-sans antialiased",
          inter.className
        )}
      >
        <main className="relative min-h-screen flex flex-col">
          <Navbar />
          <Toaster
            toastOptions={{
              className: "font",
              style: {
                border: "1px solid #87ceeb",
                padding: "16px",
                color: "black",
              },
            }}
          />
          {children}
          <Footer />
        </main>
      </body>
    </html>
  );
}
