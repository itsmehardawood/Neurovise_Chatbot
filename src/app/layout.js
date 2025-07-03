import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Head from "next/head";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Neurovise Chatbot",
  description: "By itsmehardawood @Neurovise",
   icons: {
    icon: "/images/logo_only.png", // relative to /public
  },

};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
<link rel="shortcut icon" href="/images/logo_only.png" type="image/png" />
<link rel="icon" href="/images/logo_only.png" type="image/png" />
        <title>Neurovise Chatbot</title>
      </Head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased text-black bg-transparent m-0 p-0`}>
        {children}
      </body>
    </html>
  );
}

