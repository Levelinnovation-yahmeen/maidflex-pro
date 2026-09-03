import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://maidflex-pro.snug-civet-5353.chatgpt.site'),
  title: 'MaidFlex Pro | Cleaning on your schedule',
  description:
    'Flexible residential and commercial cleaning from trusted professionals serving the Richmond area.',
  openGraph: {
    title: 'MaidFlex Pro | Cleaning on your schedule',
    description:
      'Book trusted cleaning pros for your home, move, construction project, or business.',
    url: '/',
    siteName: 'MaidFlex Pro',
    images: [
      {
        url: '/og.png',
        width: 1200,
        height: 630,
        alt: 'MaidFlex Pro - Cleaning on your schedule. With zero hassle.',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MaidFlex Pro | Cleaning on your schedule',
    description:
      'Book trusted cleaning pros for your home, move, construction project, or business.',
    images: ['/og.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
