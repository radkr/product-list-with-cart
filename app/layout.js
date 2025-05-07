import { Red_Hat_Text } from "next/font/google";
import "./globals.css";

const redHatSans = Red_Hat_Text({
  variable: "--font-red-hat-sans",
  subsets: ["latin"],
});

export const metadata = {
  title: "Frontend Mentor | Product list with cart",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={redHatSans.variable}>{children}</body>
    </html>
  );
}
