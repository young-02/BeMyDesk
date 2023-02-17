// 홍구 카카오 API키
export const kakaoInit = () => {
  const kakao = (window as any).Kakao;

  kakao.init('2e25b083ca47e600eb159f496a652513');

  return kakao;
};
