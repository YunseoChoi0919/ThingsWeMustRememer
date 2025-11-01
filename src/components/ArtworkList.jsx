import React, { useMemo, useState } from "react";
import { useArtworks } from "../hooks/useArtworks";
import ArtworkListItem from "./ArtworkListItem";
import { normalizeTags } from "../lib/utils";
import "../styles.css";

// 스켈레톤 로딩 UI
function ListSkeleton() {
  return (
    <>
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="skeleton-item">
          <div className="skeleton-image" />
          <div className="skeleton-text">
            <div className="skeleton-line short" />
            <div className="skeleton-line xshort" />
          </div>
        </div>
      ))}
    </>
  );
}

export default function ArtworkList({ onSelect }) {
  const { items, error, loading, refetch } = useArtworks();
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    if (!items) return [];
    if (!q.trim()) return items;
    const lower = q.toLowerCase();
    // 검색 필드: title, prompt, type, tags
    return items.filter((i) =>
      [i.title, i.prompt, i.type, ...normalizeTags(i)]
        .filter(Boolean)
        .join("\u0000") // null 문자로 구분
        .toLowerCase()
        .includes(lower)
    );
  }, [items, q]);

  return (
    <div className="artwork-list-container">
      {/* 상단: 검색/새로고침 */}
      <div className="list-header">
        <input
          placeholder="검색: 제목, 태그, 타입..."
          value={q}
          onChange={(e) => setQ(e.target.value)}
          className="list-search-input"
        />
        <button
          onClick={refetch}
          disabled={loading}
          className="list-refresh-button"
        >
          {loading ? "로딩..." : "새로고침"}
        </button>
      </div>

      {/* 목록 */}
      <div className="list-scroll-area">
        <div className="list-grid">
          {loading && !items && <ListSkeleton />}

          {error && (
            <div className="error-box">불러오기 실패: {error}</div>
          )}

          {items && filtered.map((meta) => (
            <ArtworkListItem
              key={meta.id}
              meta={meta}
              onClick={() => onSelect(meta)}
            />
          ))}
        </div>
      </div>

      {/* 하단: 카운트 */}
      <div className="list-footer">
        {items ? `총 ${filtered.length}개` : ""}
      </div>
    </div>
  );
}