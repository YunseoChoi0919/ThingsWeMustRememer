import React from "react"; // useState, useEffect 불필요!
import { getPublicUrl, fmtDate, normalizeTags } from "../lib/utils";
import PictureViewer from "./viewers/PictureViewer";
import ModelViewer from "./viewers/ModelViewer";
import SkyboxViewer from "./viewers/SkyboxViewer";
import TypeBadge from "./TypeBadge";
import BackButton from "./BackButton";
import { useIsMobile } from "../hooks/useIsMobile"; 
import "../styles.css";

export default function ArtworkDetail({ meta }) {
  const isMobile = useIsMobile();

  // ✅ [핵심] 로딩 없이 바로 URL 변수 생성
  const url = getPublicUrl(meta.file_name);
  
  // 파일 다운로드 핸들러
  const handleDownload = async () => {
    if (!url) return;
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = meta.file_name || 'download';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (e) {
      console.error("다운로드 실패:", e);
      alert("다운로드 실패. R2 CORS 설정을 확인해주세요.");
    }
  };

  const allowedTypes = ["picture", "poem", "3d", "skybox"];
  const tags = normalizeTags(meta).slice().sort((a, b) => a.length - b.length);

  const containerClassName = `detail-container type-${meta.type} ${isMobile ? "is-mobile" : "is-desktop"}`;

  return (
    <div className={containerClassName}>
      <div className="detail-header">
        <div>
          <div className="detail-title">{meta.title}</div>
          <div className="detail-subtitle">{fmtDate(meta.date)} · {meta.type}</div>
        </div>
        <div className="detail-header-actions">
          <div className="detail-btns">
            {url && (
              <a href={url} target="_blank" rel="noreferrer" className="detail-action-link">
                원본 보기
              </a>
            )}
            {url && (
              <button onClick={handleDownload} className="detail-action-link">
                원본 다운로드
              </button>
            )}
          </div>
          <TypeBadge type={meta.type} />
          <BackButton/>
        </div>
      </div>

      {tags.length > 0 && (
        <div className="detail-meta-tags">
          {tags.map((t) => <div className="detail-tag" key={t}>{t}</div>)}
        </div>
      )}

      {/* 뷰어 영역: 로딩 상태 표시가 필요 없어짐 */}
      <div className="detail-viewer-container">
        {url && (meta.type === "picture" || meta.type === "poem") && (
          <PictureViewer url={url} alt={meta.title} />
        )}
        {url && meta.type === "3d" && <ModelViewer url={url} />}
        {url && meta.type === "skybox" && (
          isMobile ? <PictureViewer url={url} alt={meta.title} /> : <SkyboxViewer url={url} />
        )}
        
        {url && !allowedTypes.includes(meta.type) && (
          <div className="detail-viewer-fallback">
            이 타입({meta.type})은 뷰어가 없습니다. <a href={url} target="_blank" rel="noreferrer">파일 링크</a>
          </div>
        )}
      </div>

      <div>
        <div className="detail-meta-title">생성된 프롬프트</div>
        {meta.prompt && <div className="detail-meta-prompt">{meta.prompt}</div>}
      </div>
    </div>
  );
}