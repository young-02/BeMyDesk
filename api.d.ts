// 홍구 카카오 API키
export const kakaoInit = () => {
  const kakao = (window as any).Kakao;

  kakao.init(process.env.NEXT_PUBLIC_KAKAO_API);

  return kakao;
};
