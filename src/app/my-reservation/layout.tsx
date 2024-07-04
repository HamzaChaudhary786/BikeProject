import { Metadata } from 'next';
import { ASSETS } from '../../constants';

const baseURL = 'https://asimbilal.com';
const pageUrl = `${baseURL}/`;
const pageImage = ASSETS.logo;
const title = `my-reservation | Your Custom Link to Infinite Horizons |`;
const description = 'my-reservation  | Your Custom Link to Infinite Horizons |';

export const metadata: Metadata = {
  title: title,
  description: description,
  openGraph: {
    title: title,
    description: description,
    url: pageUrl,
    siteName: pageUrl,
    images: [
      {
        url: pageImage,
        secureUrl: pageImage,
        alt: 'Asim Bilal Logo',
      },
    ],
  },
  twitter: {
    title: title,
    description: description,
    card: 'summary_large_image',
    images: [
      {
        url: pageImage,
        secureUrl: pageImage,
        alt: 'Asim Bilal Logo',
      },
    ],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <> {children}</>;
}
