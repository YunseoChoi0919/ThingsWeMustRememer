import React, { useState } from "react";
import ArtworkList from "../components/ArtworkList";
import ArtworkDetail from "../components/ArtworkDetail";
import "../styles.css";

export default function ArtworksPage() {
  const [selected, setSelected] = useState(null);

  // selected 상태에 따라 상세 뷰를 렌더링
  if (selected) {
    return (
      <div className="artworks-page">
        {/* 상세 뷰는 h1이 필요 없으므로 꽉 채웁니다. */}
        {/* CSS에서 .artworks-page가 grid-template-rows: auto 1fr; 이므로 
            이 컴포넌트가 1fr 영역을 차지하게 합니다. */}
        <style>{`.artworks-page { grid-template-rows: 1fr; padding: 16px 16px 0 16px; }`}</style>
        <ArtworkDetail meta={selected} onBack={() => setSelected(null)} />
      </div>
    );
  }

  // 기본 목록 뷰
  return (
    <div className="artworks-page">
      <h1 className="page-title">Artworks</h1>
      <ArtworkList onSelect={setSelected} />
    </div>
  );
}