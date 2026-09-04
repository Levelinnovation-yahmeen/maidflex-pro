import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://maidflex-pro.snug-civet-5353.chatgpt.site'),
  title: 'MaidFlex Pro | Commercial Cleaning in Richmond, VA',
  description:
    'Reliable commercial cleaning for Richmond businesses, with clear scopes, flexible schedules, and documented service updates.',
  openGraph: {
    title: 'MaidFlex Pro | Commercial Cleaning in Richmond, VA',
    description:
      'Clean operations start with a crew that shows up. Schedule a commercial facility walkthrough.',
    url: '/',
    siteName: 'MaidFlex Pro',
    images: [
      {
        url: '/og.png',
        width: 1200,
        height: 630,
        alt: 'MaidFlex Pro - Commercial cleaning for Richmond businesses.',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MaidFlex Pro | Commercial Cleaning in Richmond, VA',
    description:
      'Clean operations start with a crew that shows up. Schedule a commercial facility walkthrough.',
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
