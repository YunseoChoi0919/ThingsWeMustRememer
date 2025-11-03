// src/pages/ArtworksPage.jsx

import React, { useState } from "react";
// [1. 수정] useNavigate 임포트, ArtworkDetail 제거
import { useNavigate } from "react-router-dom";
import ArtworkList from "../components/ArtworkList";
import "../styles.css";
import MenuButton from "../components/MenuButton.jsx";
import Sidebar from "../components/Sidebar";
import header2 from "../assets/header2.svg";

export default function ArtworksPage() {
  // [2. 수정] selected 상태 제거
  // const [selected, setSelected] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  // [3. 추가] navigate 함수 생성
  const navigate = useNavigate();

  const toggleSidebar = () => {
    // 진동 API (안드로이드)
    if (navigator.vibrate) {
      navigator.vibrate(15);
    }
    setIsSidebarOpen(prev => !prev);
  };

  // [4. 추가] 리스트 항목 클릭 시 상세 페이지로 이동하는 핸들러
  const handleSelect = (meta) => {
    navigate(`/artwork/${meta.id}`);
  };

  // [5. 수정] if (selected) { ... } 블록 전체 삭제
  /*
  if (selected) {
    ... (이 부분 전체 삭제) ...
  }
  */

  // 기본 목록 뷰 (이제 유일한 return문)
  return (
    <div className="artworks-page">
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

     

      <div className="artworks-header">
        <MenuButton onClick={toggleSidebar} />
        
        <div className="page-title">
          우리가 잊지 말아야 할 것은 <br />
          무엇인가요
          <p className="page-subtitle">Archive web</p>
          
        </div>
      </div>

      {/* [6. 수정] onSelect에 setSelected 대신 handleSelect 전달 */}
      <ArtworkList onSelect={handleSelect} />
    </div>
  );
}