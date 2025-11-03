// src/components/layout/BackButton.jsx

import React from 'react';
import { useNavigate } from 'react-router-dom'; // 1. useNavigate 훅 임포트
import './BackButton.css'; // 버튼 스타일

/**
 * "뒤로 가기" 아이콘 버튼 컴포넌트
 * @param {object} props
 * @param {string} [props.className] - 추가로 적용할 CSS 클래스
 */
export default function BackButton({ className }) {
  const navigate = useNavigate(); // 2. navigate 함수 생성

  // 3. 클릭 시 이전 페이지(-1)로 이동
  const handleBackClick = () => {
    navigate(-1);
  };

  const combinedClassName = `back-button ${className || ''}`.trim();

  return (
    <button 
      className={combinedClassName} 
      onClick={handleBackClick}
      aria-label="뒤로 가기" // 스크린 리더용 라벨
    >
      {/* 왼쪽 화살표 아이콘 SVG */}
      <svg
        width="30"
        height="30"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="back-button-icon"
      >
        <path
          d="M15 18L9 12L15 6" // '<' 모양 화살표
          stroke="currentColor" // CSS의 color 속성으로 색상 제어
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}