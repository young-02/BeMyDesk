import Head from 'next/head';
import React from 'react';

type Props = {};

export default function HeadSeo({ title }: HeadInfoProps) {
  return (
    <Head>
      <title>{title}</title>
      <meta
        name="description"
        content="나의 시작점이 되는 책상, 어떤 일의 시작점인 책상, 준비하는 공간 “그렇게 하세요.”, “편하신 대로 하세요.”, 좋을대로 하세요.”, “그럼요. 그렇게 하세요.”마음껏 꾸며보고 마음껏 소개하는 책상"
      />
      <meta name="author" content="be-my-desk" />
      <meta
        name="keyword"
        content="데스크테리어, 책상인테리어, 테꾸, 데스크, 인테리어, 커뮤니티"
      />
    </Head>
  );
}
