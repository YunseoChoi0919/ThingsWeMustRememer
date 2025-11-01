import React, { useEffect, useState } from "react";
import { getPublicUrl, fmtDate, normalizeTags } from "../lib/utils";
import Tag from "./Tag";
import PictureViewer from "./viewers/PictureViewer";
import ModelViewer from "./viewers/ModelViewer";
import SkyboxViewer from "./viewers/SkyboxViewer";
// import PoemViewer from "./viewers/PoemViewer"; // <-- 이 줄을 삭제합니다.
import "../styles.css";

export default function ArtworkDetail({ meta, onBack }) {
  const [url, setUrl] = useState(null);
  const [error, setError] = useState(null);

  // 파일 URL 가져오기
  useEffect(() => {
    let alive = true;
    setUrl(null); // 메타가 변경되면 URL 초기화
    setError(null);
    (async () => {
      try {
        // 'poem' 타입도 file_name을 사용하므로 동일하게 URL을 가져옵니다.
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
  const allowedTypes = ["picture", "poem", "3d", "space"];

  return (
    <div className="detail-container">
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
          <button onClick={onBack} className="detail-back-button">
            목록으로
          </button>
        </div>
      </div>

      {/* 메타: 태그, 프롬프트 */}
      <div>
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

        {/* --- 타입별 뷰어 분기 (수정됨) --- */}

        {/* 'picture'와 'poem'은 모두 PictureViewer를 사용합니다. */}
        {url && (meta.type === "picture" || meta.type === "poem") && (
          <PictureViewer url={url} alt={meta.title} />
        )}

        {/* '3d'는 ModelViewer를 사용합니다. (GLB 파일) */}
        {url && meta.type === "3d" && <ModelViewer url={url} />}

        {/* 'space'는 SkyboxViewer를 사용합니다. (파노라마 이미지) */}
        {url && meta.type === "skybox" && <SkyboxViewer url={url} />}
        
        {/* ---------------------------------- */}


        {/* 지원하지 않는 타입 처리 */}
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
    </div>
  );
}