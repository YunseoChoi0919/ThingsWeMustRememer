import { useState, useEffect } from "react";
import { SUPABASE_URL, SUPABASE_ANON_KEY } from "../lib/supabaseClient";

export function useArtworks() {
  const [items, setItems] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchAll = async () => {
    setLoading(true);
    setError(null);
    try {
      // artworks 테이블에서 모든(*) 필드를 날짜(date) 내림차순(desc)으로 조회
      const url = new URL(`${SUPABASE_URL}/rest/v1/artworks`);
      url.searchParams.set("select", "*");
      url.searchParams.set("order", "date.desc");

      const res = await fetch(url.toString(), {
        headers: {
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        },
      });
      if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText}`);
      const raw = await res.json();

      // id 기준 중복 제거 + 최신순 (원본 로직 유지)
      const unique = Array.from(new Map(raw.map((r) => [r.id, r])).values()).sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
      setItems(unique);
    } catch (e) {
      setError(e?.message || "불러오기 실패");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  return { items, error, loading, refetch: fetchAll };
}