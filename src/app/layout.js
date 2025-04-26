import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Echo Chatbot",
  description: "By itsmehardawood @Neurovise",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased text-black bg-transparent  m-0 p-0` }>
        {/* Overlay Language Button */}
      

        {/* Main Page Content */}
        {children}
      </body>
    </html>
  );
}
