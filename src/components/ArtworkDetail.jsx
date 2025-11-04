import React, { useEffect, useState } from "react";
import { getPublicUrl, fmtDate, normalizeTags } from "../lib/utils";
import Tag from "./Tag";
import PictureViewer from "./viewers/PictureViewer";
import ModelViewer from "./viewers/ModelViewer";
import SkyboxViewer from "./viewers/SkyboxViewer";
import TypeBadge from "./TypeBadge";

import BackButton from "./BackButton";

import { useIsMobile } from "../hooks/useIsMobile"; 
import "../styles.css";

export default function ArtworkDetail({ meta }) {
  const [url, setUrl] = useState(null);
  const [error, setError] = useState(null);

  const isMobile = useIsMobile();

  useEffect(() => {
    let alive = true;
    setUrl(null); 
    setError(null);
    (async () => {
      try {
        const u = await getPublicUrl(meta.file_name);
        if (alive) setUrl(u);
      } catch (e) {
        if (alive) setError(e?.message || "URL 생성 실패");
      }
    })();
    return () => {
      alive = false;
    };
  }, [meta.file_name]);

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
      console.error("파일 다운로드 실패:", e);
      alert("파일 다운로드에 실패했습니다.");
    }
  };

  const allowedTypes = ["picture", "poem", "3d", "skybox"];

  // ✅ 태그를 길이 순으로 정렬 (짧은 것부터)
  const tags = normalizeTags(meta)
    .slice() // 원본 보호
    .sort((a, b) => a.length - b.length);

  const containerClassName = `
    detail-container 
    type-${meta.type} 
    ${isMobile ? "is-mobile" : "is-desktop"}
  `;

  return (
    <div className={containerClassName}>
      {/* 헤더: 제목, 버튼 */}
      <div className="detail-header">
        <div>
          <div className="detail-title">{meta.title}</div>
          <div className="detail-subtitle">
            {fmtDate(meta.date)} · {meta.type}
          </div>
        </div>
        <div className="detail-header-actions">
          <div className="detail-btns">
            {url && (
              <a
                href={url}
                target="_blank"
                rel="noreferrer"
                className="detail-action-link"
              >
                원본 보기
              </a>
            )}

            {url && (
              <button
                onClick={handleDownload}
                className="detail-action-link"
              >
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
          {tags.map((t) => (
            <div className="detail-tag" key={t}>
              {t}
            </div>
          ))}
        </div>
      )}

      {/* 뷰어 */}
      <div className="detail-viewer-container">
        {!url && !error && (
          <div className="detail-viewer-message">파일 URL 로딩 중...</div>
        )}
        {error && (
          <div className="detail-viewer-error">
            파일 URL 생성 실패: {error}
          </div>
        )}
        {url && (meta.type === "picture" || meta.type === "poem") && (
          <PictureViewer url={url} alt={meta.title} />
        )}
        {url && meta.type === "3d" && <ModelViewer url={url} />}
        {url && meta.type === "skybox" && (
          isMobile ? (
            <PictureViewer url={url} alt={meta.title} />
          ) : (
            <SkyboxViewer url={url} />
          )
        )}
        {url && !allowedTypes.includes(meta.type) && (
          <div className="detail-viewer-fallback">
            이 타입({meta.type})은 기본 뷰어가 없습니다.{" "}
            <a
              href={url}
              target="_blank"
              rel="noreferrer"
              className="detail-action-link"
            >
              파일 링크
            </a>
            로 확인하세요.
          </div>
        )}
      </div>

      {/* 메타 */}
      <div>
        <div className="detail-meta-title">생성된 프롬프트</div>
        {meta.prompt && (
          <div className="detail-meta-prompt">{meta.prompt}</div>
        )}
      </div>
    </div>
  );
}
