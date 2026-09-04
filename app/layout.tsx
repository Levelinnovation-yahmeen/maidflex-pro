import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://maidflex-pro.snug-civet-5353.chatgpt.site'),
  title: 'MaidFlex Pro | Richmond Commercial + Rockies Vacation Rentals',
  description:
    'Commercial cleaning for Richmond facilities and documented vacation-rental turnovers across the Rocky Mountain region.',
  openGraph: {
    title: 'MaidFlex Pro | Two Markets. One Operating Standard.',
    description:
      'Richmond commercial cleaning and Rockies vacation-rental turnovers.',
    url: '/',
    siteName: 'MaidFlex Pro',
    images: [
      {
        url: '/og.png',
        width: 1200,
        height: 630,
        alt: 'MaidFlex Pro - Richmond commercial cleaning and Rockies vacation-rental turnovers.',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MaidFlex Pro | Richmond Commercial + Rockies Vacation Rentals',
    description:
      'Richmond commercial cleaning and Rockies vacation-rental turnovers.',
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
