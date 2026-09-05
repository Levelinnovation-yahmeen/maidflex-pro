import type { Metadata } from 'next';
import './globals.css';

const siteUrl = 'https://maidflex-pro.yahmzar.chatgpt.site';

const businessStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'MaidFlex Pro',
  url: siteUrl,
  telephone: '+1-804-802-9639',
  email: 'info@maidflexpro.com',
  areaServed: [
    { '@type': 'City', name: 'Richmond, Virginia' },
    { '@type': 'Place', name: 'Rocky Mountain region' },
  ],
  serviceType: [
    'Commercial cleaning',
    'Janitorial service',
    'Vacation-rental turnover cleaning',
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
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
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
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
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(businessStructuredData).replace(
              /</g,
              '\\u003c',
            ),
          }}
        />
      </body>
    </html>
  );
}
