import localFont from 'next/font/local';

const fontPrimary = localFont({
  variable: '--font-primary',
  src: [
    {
      path: './assets/Blatant.woff',
      weight: '400',
      style: 'normal',
    },
    {
      path: './assets/Blatant-Bold.woff',
      weight: '700',
      style: 'bold',
    },
  ],
});

const fontSecondary = localFont({
  variable: '--font-secondary',
  src: [
    {
      path: './assets/Standerd.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: './assets/Standerd-Bold.woff2',
      weight: '700',
      style: 'bold',
    },
  ],
});

export { fontPrimary, fontSecondary };
