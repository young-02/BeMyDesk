import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from 'react-query';
import Head from 'next/head';
import Script from 'next/script';
import Top from '@/components/Search';
import GlobalNavigationBar from '../components/GlobalNavigationBar';
import styled from 'styled-components';
import Footer from '@/components/Footer';
import { ReactQueryDevtools } from 'react-query/devtools';
import { RecoilRoot } from 'recoil';
import { useEffect } from 'react';
import { auth } from '@/shared/firebase';

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
      <Script
        defer
        src="https://developers.kakao.com/sdk/js/kakao.js"
        onLoad={kakaoInit}
      ></Script>
      <RecoilRoot>
        <GlobalNavigationBar />
        <QueryClientProvider client={client}>
          <Component {...pageProps} />
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
        <Footer />
      </RecoilRoot>
    </>
  );
}
