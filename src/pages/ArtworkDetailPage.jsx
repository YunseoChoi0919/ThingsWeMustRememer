// src/pages/ArtworkDetailPage.jsx

import React, { useState, useMemo } from "react";
import { useParams, Navigate } from "react-router-dom";
import { useArtworks } from "../hooks/useArtworks"; // 기존 훅 재사용
import ArtworkDetail from "../components/ArtworkDetail";
import Sidebar from "../components/Sidebar"; // [수정] Sidebar 임포트 경로 확인
import MenuButton from "../components/MenuButton"; // [수정] MenuButton 임포트 경로 확인
import "../styles.css";

export default function ArtworkDetailPage() {
  const { id } = useParams(); // URL에서 :id 값을 가져옵니다
  const { items, loading, error } = useArtworks(); // 모든 작품 데이터를 로드합니다
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // 로드된 'items' 배열에서 URL의 'id'와 일치하는 항목을 찾습니다.
  const meta = useMemo(() => {
    if (!items) return null;
    // ID를 문자열로 비교하여 안전하게 찾습니다.
    return items.find(item => String(item.id) === String(id));
  }, [items, id]);

  const toggleSidebar = () => {
    // 진동 API (안드로이드)
    if (navigator.vibrate) {
      navigator.vibrate(15);
    }
    setIsSidebarOpen(prev => !prev);
  };

  // [FIX] 로딩 조건 수정: loading이 true이거나, 아직 items가 null일 때
  if (loading || !items) {
    return (
      <div className="artworks-page">
        <div className="artworks-header">
          <MenuButton />
        </div>
        <div>로딩 중...</div> {/* 또는 ListSkeleton 사용 */}
      </div>
    );
  }

  // 에러 발생 시
  if (error) {
    return (
      <div className="artworks-page">
        <div className="artworks-header">
          <MenuButton />
        </div>
        <div>데이터 로드에 실패했습니다.</div>
      </div>
    );
  }
  
  // [FIX] 리다이렉트 조건 수정: 로딩이 끝났고, items가 있는데, meta가 없을 때
  if (items && !meta) {
    return <Navigate to="/" replace />;
  }
  
  // 성공적으로 meta 객체를 찾았을 때
  return (
    <div className="artworks-page">
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
      <div className="artworks-header">
        <MenuButton onClick={toggleSidebar} />
      </div>
      
      <ArtworkDetail meta={meta} />
    </div>
  );
}