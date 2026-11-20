import { Plus_Jakarta_Sans } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata = {
  title: {
    default: "GearLoop | Rent Equipment Online",
    template: "%s | GearLoop",
  },
  description:
    "GearLoop is an equipment rental marketplace. Browse verified listings, book for the dates you need and pay securely with Stripe.",
};

// Applies the saved theme before first paint to avoid a flash.
const themeScript = `(function(){try{var t=localStorage.getItem('gearloop-theme');if(!t){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'gearloop-dark':'gearloop'}document.documentElement.setAttribute('data-theme',t)}catch(e){document.documentElement.setAttribute('data-theme','gearloop')}})();`;

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="gearloop" suppressHydrationWarning className={jakarta.variable}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-screen antialiased">
        {children}
        <Toaster position="top-center" toastOptions={{ duration: 3500, style: { borderRadius: "12px", fontWeight: 600 } }} />
      </body>
    </html>
  );
}
