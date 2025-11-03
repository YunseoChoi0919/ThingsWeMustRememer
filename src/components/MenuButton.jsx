// src/components/layout/MenuButton.jsx

import React from 'react';
import './MenuButton.css'; // 버튼 스타일을 위한 CSS 파일

/**
 * 햄버거 메뉴 아이콘 버튼 컴포넌트
 * @param {object} props
 * @param {function} props.onClick - 버튼 클릭 시 실행될 함수
 * @param {string} [props.className] - 추가로 적용할 CSS 클래스
 */
export default function MenuButton({ onClick, className }) {
  
  // 기본 클래스와 props로 받은 클래스를 합칩니다.
  const combinedClassName = `menu-button ${className || ''}`.trim();

  return (
    <button 
      className={combinedClassName} 
      onClick={onClick}
      aria-label="메뉴 열기" // 스크린 리더 사용자를 위한 라벨
    >
      {/* 아이콘 SVG입니다. 
        'stroke="currentColor"'로 설정하면 CSS의 'color' 속성으로 선 색상을 제어할 수 있습니다.
      */}
      <svg 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="menu-button-icon"
      >
        <path 
          d="M4 6H20" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
        />
        <path 
          d="M4 12H20" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
        />
        <path 
          d="M4 18H20" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
        />
      </svg>
    </button>
  );
}