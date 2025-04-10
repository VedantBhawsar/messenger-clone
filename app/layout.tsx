import { Inter } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import ToasterContext from "@/context/ToasterContext";
import AuthContext from "@/context/AuthContext";
import ActiveStatus from "@/components/ActiveStatus";
import { TooltipProvider } from "../components/ui/tooltip";
import "./globals.css";
import { MusicProvider } from '@/context/MusicContext'

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Messenger Clone",
  description: "Messenger Clone",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <TooltipProvider>
          <AuthContext>
            <NextTopLoader />
            <ToasterContext />
            <MusicProvider>
              <ActiveStatus />
              {children}
            </MusicProvider>
          </AuthContext>
        </TooltipProvider>
      </body>
    </html>
  );
}
