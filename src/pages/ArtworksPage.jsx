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
      <div className="page-title">우리가 잊지 말아야 할 것은 <br></br>무엇인가요 
      <p className="page-subtitle">Archive web</p></div>
      
      <ArtworkList onSelect={setSelected} />
    </div>
  );
}