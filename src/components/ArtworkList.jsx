import React, { useMemo, useState, useEffect, useRef } from "react"; // [1. useEffect, useRef 임포트]
import { useArtworks } from "../hooks/useArtworks";
import ArtworkListItem from "./ArtworkListItem";
import { normalizeTags, getTypeLabel } from "../lib/utils";
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
  
  // [2. 수정] useState가 sessionStorage에서 초기값을 읽어오도록 변경
  const [q, setQ] = useState(
    () => sessionStorage.getItem('artworkListQuery') || ""
  );
  
  const [spinOnce, setSpinOnce] = useState(false); // 클릭 시 1회 회전
  
  // [3. 추가] 스크롤되는 div를 참조하기 위한 ref 생성
  const scrollRef = useRef(null);

  // [4. 추가] 스크롤 위치 복원 로직
  useEffect(() => {
    // 데이터 로딩이 끝났고(loading: false), items가 존재할 때
    if (!loading && items) {
      const scrollPos = sessionStorage.getItem('artworkListScroll');

      if (scrollPos && scrollRef.current) {
        
        // DOM이 렌더링될 시간을 줍니다 (setTimeout 0)
        setTimeout(() => {
          if (scrollRef.current) {
            scrollRef.current.scrollTop = parseInt(scrollPos, 10);
          }
          
          // 복원 후에는 스토리지에서 값을 삭제
          sessionStorage.removeItem('artworkListScroll');
          sessionStorage.removeItem('artworkListQuery');
        }, 0); // 0밀리초 지연 = 다음 렌더링 틱(tick)에 실행
      }
    }
    // 'loading'과 'items'가 변경될 때마다 이 로직을 재시도
  }, [items, loading]); 

  // [5. 추가] 컴포넌트가 언마운트될 때(페이지 이탈 시) 상태 저장
  useEffect(() => {
    const scrollEl = scrollRef.current; // 현재 ref 값을 캡처

    // cleanup 함수는 컴포넌트가 사라지기 직전에 호출됩니다.
    return () => {
      // 컴포넌트가 사라지는 시점의 검색어(q)와 스크롤 위치를 저장합니다.
      sessionStorage.setItem('artworkListQuery', q);
      if (scrollEl) {
        sessionStorage.setItem('artworkListScroll', scrollEl.scrollTop);
      }
    };
  }, [q]); // 'q'가 바뀔 때마다 cleanup 함수를 최신 'q'로 갱신

  const filtered = useMemo(() => {
    if (!items) return [];
    if (!q.trim()) return items;
    const lower = q.toLowerCase();
    return items.filter((i) =>
      [
        i.title,
        i.prompt,
        i.type, // 원본 값 (예: "3d")
        getTypeLabel(i.type), // [2. 추가] 변환된 값 (예: "3D Model")
        ...normalizeTags(i),
      ]
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
            width="24"
            height="24"
            viewBox="0 0 24 24"
            className={`refresh-icon ${
              // 로딩 동안엔 무한 회전, 아니면 클릭 순간 1회 회전
              loading ? "spin-loop" : spinOnce ? "spin-once" : ""
            }`}
          >
            <path
              fill="#6990ad"
              d="M12 20q-3.35 0-5.675-2.325T4 12t2.325-5.675T12 4q1.725 0 3.3.712T18 6.75V5q0-.425.288-.712T19 4t.713.288T20 5v5q0 .425-.288.713T19 11h-5q-.425 0-.712-.288T13 10t.288-.712T14 9h3.2q-.8-1.4-2.187-2.2T12 6Q9.5 6 7.75 7.75T6 12t1.75 4.25T12 18q1.7 0 3.113-.862t2.187-2.313q.2-.35.563-.487t.737-.013q.4.125.575.525t-.025.75q-1.025 2-2.925 3.2T12 20"
            />
          </svg>
        </button>
      </div>

      {/* [6. 수정] 스크롤 영역에 ref 추가 */}
      <div ref={scrollRef} className="list-scroll-area">
        <div className="list-grid">
          {loading && !items && <ListSkeleton />}

          {error && (
            <div className="error-box">불러오기 실패: {error}</div>
          )}

          {items &&
            filtered.map((meta) => (
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