import React, { useMemo, useState } from "react"; 
import { useArtworks } from "../hooks/useArtworks"; 
import ArtworkListItem from "./ArtworkListItem"; 
import { normalizeTags } from "../lib/utils"; 
import "../styles.css";


// 스켈레톤 로딩 UI 
function ListSkeleton() { 
  return ( <> {Array.from({ length: 6 }).map((_, i) => (
     <div key={i} className="skeleton-item"> 
  <div className="skeleton-image" /> 
  <div className="skeleton-text"> 
    <div className="skeleton-line short" /> 
    <div className="skeleton-line xshort" /> </div> </div> ))} </> ); }



export default function ArtworkList({ onSelect }) {
  const { items, error, loading, refetch } = useArtworks();
  const [q, setQ] = useState("");
  const [spinOnce, setSpinOnce] = useState(false); // 클릭 시 1회 회전

  const filtered = useMemo(() => {
    if (!items) return [];
    if (!q.trim()) return items;
    const lower = q.toLowerCase();
    return items.filter((i) =>
      [i.title, i.prompt, i.type, ...normalizeTags(i)]
        .filter(Boolean)
        .join("\u0000")
        .toLowerCase()
        .includes(lower)
    );
  }, [items, q]);

  const handleRefresh = () => {
    // 1회 회전 트리거
    setSpinOnce(true);
    // 애니메이션 끝나면 클래스 제거
    setTimeout(() => setSpinOnce(false), 650); // CSS duration(0.6s)보다 살짝 길게
    // 실제 데이터 갱신
    refetch();
  };

  return (
    <div className="artwork-list-container">
      <div className="list-header">
        <input
          placeholder="제목, 태그, 타입 등을 검색하세요"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          className="list-search-input"
        />
        <button
          onClick={handleRefresh}
          disabled={loading}
          className="list-refresh-button"
          aria-label="Refresh"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24" height="24" viewBox="0 0 24 24"
            className={`refresh-icon ${
              // 로딩 동안엔 무한 회전, 아니면 클릭 순간 1회 회전
              loading ? "spin-loop" : (spinOnce ? "spin-once" : "")
            }`}
          >
            <path fill="#6990ad" d="M12 20q-3.35 0-5.675-2.325T4 12t2.325-5.675T12 4q1.725 0 3.3.712T18 6.75V5q0-.425.288-.712T19 4t.713.288T20 5v5q0 .425-.288.713T19 11h-5q-.425 0-.712-.288T13 10t.288-.712T14 9h3.2q-.8-1.4-2.187-2.2T12 6Q9.5 6 7.75 7.75T6 12t1.75 4.25T12 18q1.7 0 3.113-.862t2.187-2.313q.2-.35.563-.487t.737-.013q.4.125.575.525t-.025.75q-1.025 2-2.925 3.2T12 20"/>
          </svg>
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