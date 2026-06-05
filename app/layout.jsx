import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import QueryProvider from "@/provider/query-provider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata = {
  title: "Login",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} antialiased bg-background`}>
        <QueryProvider>
          <Toaster position="bottom-center" richColors />
          <main className="h-screen">{children}</main>
        </QueryProvider>
      </body>
    </html>
  );
}
