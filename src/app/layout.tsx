import { Metadata } from 'next';
import { ASSETS, GOOGLE_TAG_MANAGER_ID, IS_PROD } from '../constants';
import ConfigWrapper from '../commonComponents/configsWrapper';
import { GoogleTagManager } from '@next/third-parties/google';

const baseURL = 'https://asimbilal.com';
const pageUrl = `${baseURL}/`;
const pageImage = ASSETS.logo;
const title = `login | Your Custom Link to Infinite Horizons |`;
const description = 'login | Your Custom Link to Infinite Horizons |';

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
  return (
    <html lang="en">
      <body>
        <ConfigWrapper>{children}</ConfigWrapper>
      </body>
      {IS_PROD && GOOGLE_TAG_MANAGER_ID && <GoogleTagManager gtmId={GOOGLE_TAG_MANAGER_ID} />}
    </html>
  );
}
