import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Top from '../components/layout/Top';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Top />
      <Component {...pageProps} />
    </>
  );
}
