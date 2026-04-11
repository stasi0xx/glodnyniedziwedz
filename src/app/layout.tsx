import type { Metadata } from 'next';
import { Epilogue, Manrope } from 'next/font/google';
import './globals.css';
import { getSiteConfig } from '@/config/sites';

const epilogue = Epilogue({
  variable: '--font-epilogue',
  subsets: ['latin', 'latin-ext'],
  weight: ['700', '800', '900'],
});

const manrope = Manrope({
  variable: '--font-manrope',
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '600', '700'],
});

const site = getSiteConfig();

export const metadata: Metadata = {
  title: site.siteTitle,
  description: site.siteDescription,
  icons: { icon: site.favicon },
  verification: {
    google: 'KkSb97VG_p5Q5o2tGChR7vdLIL8Qf9Ns27GD97c_vRg',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning>
      <body className={`${epilogue.variable} ${manrope.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
