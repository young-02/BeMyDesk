import { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';

type ResponsiveSizeProps = {
  [key: string]: number;
};

const useResponsive = ({ maxWidth, minWidth }: ResponsiveSizeProps) => {
  // 반응형 사이즈
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isDesktop, setIsDesktop] = useState<boolean>(false);
  const isMobileSize = useMediaQuery({ maxWidth });
  const isDesktopSize = useMediaQuery({ minWidth });

  //서버사이드렌더링
  useEffect(() => {
    setIsMobile(isMobileSize);
    setIsDesktop(isDesktopSize);
  }, [isMobileSize, isDesktopSize]);

  return { isMobile, isDesktop };
};

export default useResponsive;
