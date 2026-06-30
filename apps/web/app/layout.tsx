import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'TaxPilot AI',
  description: 'AI-powered Indian income tax filing assistant',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
