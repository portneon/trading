import "./globals.css";

export const metadata = {
  title: "Trading App",
  description: "Live Trading System",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className="antialiased"
      >
        {children}
      </body>
    </html>
  );
}
