// src/components/layout/Sidebar.jsx

import React, { useState, useEffect } from 'react'; // useState, useEffect 임포트
import { Link } from 'react-router-dom';
import './Sidebar.css';

export default function Sidebar({ isOpen, onClose }) {
  // [1. 추가] 렌더링 여부를 제어하는 내부 상태
  // (애니메이션이 끝난 후 DOM에서 제거하기 위함)
  const [isRendered, setIsRendered] = useState(isOpen);

  useEffect(() => {
    if (isOpen) {
      // 1. 열릴 때: 즉시 렌더링
      setIsRendered(true);
    } else {
      // 2. 닫힐 때: 300ms (CSS 애니메이션 시간) 후에 렌더링 상태 false로 변경
      const timer = setTimeout(() => {
        setIsRendered(false);
      }, 300); // CSS의 animation-duration과 일치해야 함

      // 3. 닫히기 전에 컴포넌트가 사라지면 타이머 제거
      return () => clearTimeout(timer);
    }
  }, [isOpen]); // isOpen prop이 변경될 때마다 실행

  // [2. 수정] isRendered가 false면 아무것도 렌더링하지 않음
  if (!isRendered) {
    return null;
  }

  return (
    <>
      {/* [3. 수정] isOpen prop에 따라 'is-closing' 클래스 추가 */}
      <div
        className={`sidebar-backdrop ${isOpen ? 'is-open' : 'is-closing'}`}
        onClick={onClose}
      />
      
      <aside className={`sidebar-panel ${isOpen ? 'is-open' : 'is-closing'}`}>
        <nav>
          <Link to="/" className="sidebar-nav-item" onClick={onClose}>
            아카이브
          </Link>
        <Link to="/our-works" className="sidebar-nav-item" onClick={onClose}>
            소녀의 작품
          </Link>
          <Link to="/project" className="sidebar-nav-item" onClick={onClose}>
            프로젝트 소개
          </Link>
          <Link to="/about" className="sidebar-nav-item" onClick={onClose}>
            about us
          </Link>

        </nav>
      </aside>
    </>
  );
}