import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from 'react-query';
import Head from 'next/head';
import Script from 'next/script';
import Top from '@/components/Search';
import GlobalNavigationBar from '../components/GlobalNavigationBar';
import styled, { ThemeProvider } from 'styled-components';
import Footer from '@/components/Footer';
import { ReactQueryDevtools } from 'react-query/devtools';
import { theme } from '@/shared/theme';
import '@/styles/globals.css';
import { init } from '@amplitude/analytics-browser';
import { useEffect } from 'react';

declare global {
  interface Window {
    Kakao: any;
  }
}

const client = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  // const kakaoInit = () => {
  //   const kakao = (window as any).Kakao;

  //   kakao.init('2e25b083ca47e600eb159f496a652513');

  //   return kakao;
  // };

  const amplitude_key: any = process.env.NEXT_PUBLIC_AMPLITUDE_KEY;

  useEffect(() => {
    init(amplitude_key);
  }, []);

  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalNavigationBar />
        {/* <Script
          defer
          src="https://developers.kakao.com/sdk/js/kakao.js"
          onLoad={kakaoInit}
        ></Script> */}
        <QueryClientProvider client={client}>
          <Component {...pageProps} />
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
        <Footer />
      </ThemeProvider>
    </>
  );
}
