import { useState, useEffect } from 'react';

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // navigator 객체는 client-side에서만 접근 가능하므로
    // useEffect 내부에서 확인합니다.
    const checkIsMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    setIsMobile(checkIsMobile);
  }, []); // 컴포넌트 마운트 시 한 번만 실행

  return isMobile;
}