import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from 'react-query';
import Head from 'next/head';
import Script from 'next/script';
import Top from '@/components/Search';
import GlobalNavigationBar from '../components/GlobalNavigationBar';
import styled from 'styled-components';
import Footer from '@/components/Footer';

declare global {
  interface Window {
    Kakao: any;
  }
}

const client = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  const kakaoInit = () => {
    const kakao = (window as any).Kakao;

    kakao.init('2e25b083ca47e600eb159f496a652513');

    return kakao;
  };

  return (
    <>
      <GlobalNavigationBar />
      <Script
        defer
        src="https://developers.kakao.com/sdk/js/kakao.js"
        onLoad={kakaoInit}
      ></Script>
      <QueryClientProvider client={client}>
        <Component {...pageProps} />
      </QueryClientProvider>
      <Footer />
    </>
  );
}
