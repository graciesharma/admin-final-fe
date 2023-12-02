export const metadata = {
  title: "Admin - Toilet Locator",
  description: "By Gracie Sharma Chapagain",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0 }}>{children}</body>
    </html>
  );
}
