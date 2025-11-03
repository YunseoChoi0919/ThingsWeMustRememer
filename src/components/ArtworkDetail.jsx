import React, { useEffect, useState } from "react";
import { getPublicUrl, fmtDate, normalizeTags } from "../lib/utils";
import Tag from "./Tag";
import PictureViewer from "./viewers/PictureViewer";
import ModelViewer from "./viewers/ModelViewer";
import SkyboxViewer from "./viewers/SkyboxViewer";

import BackButton from "./BackButton"; // 이 컴포넌트가 "뒤로 가기"를 담당

import { useIsMobile } from "../hooks/useIsMobile"; 
import "../styles.css";

// [1. 수정] onBack prop 제거
export default function ArtworkDetail({ meta }) {
  const [url, setUrl] = useState(null);
  const [error, setError] = useState(null);

  const isMobile = useIsMobile();

  // ... (useEffect, tags, allowedTypes, containerClassName 등은 동일) ...
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

  const tags = normalizeTags(meta);
  const allowedTypes = ["picture", "poem", "3d", "skybox"];

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
          {url && (
            <a
              href={url}
              target="_blank"
              rel="noreferrer"
              className="detail-action-link"
            >
              원본
            </a>
          )}
          {/* [2. 삭제] '목록으로' 버튼 삭제 */}
          {/* <button onClick={onBack} className="detail-back-button">
            목록으로
          </button>
          */}
          
          {/* [3. 유지] 이 BackButton이 '목록으로' 버튼을 대체합니다. */}
          <BackButton/>
        </div>
      </div>

      {/* 뷰어 */}
      <div className="detail-viewer-container">
        {/* ... (뷰어 로직은 동일) ... */}
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

      {/* 메타: 태그, 프롬프트 */}
      <div>
        {/* ... (태그, 프롬프트 로직은 동일) ... */}
        {tags.length > 0 && (
          <div className="detail-meta-tags">
            {tags.map((t) => (
              <Tag key={t}>{t}</Tag>
            ))}
          </div>
        )}
        {meta.prompt && (
          <div className="detail-meta-prompt">{meta.prompt}</div>
        )}
      </div>
    </div>
  );
}