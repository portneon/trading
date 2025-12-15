import "./globals.css";

export const metadata = {
  title: "Trade-IN",
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
