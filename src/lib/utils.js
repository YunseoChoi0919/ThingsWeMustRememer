import { supabase, STORAGE_BUCKET } from "./supabaseClient";

export function fmtDate(iso, locale = "ko-KR") {
  if (!iso) return "";
  const d = new Date(iso);
  return isNaN(d.getTime())
    ? iso
    : d.toLocaleString(locale, { timeZone: "Asia/Seoul" }); // ← KST로 고정
}


export function normalizeTags(meta) {
  // 사용자가 제공한 테이블 스키마에 `tag` 필드가 없으므로 `tags`만 사용합니다.
  const tags = Array.isArray(meta?.tags) ? meta.tags : [];
  return Array.from(new Set(tags.filter(Boolean)));
}

// cn 유틸리티는 현재 코드에서 사용되지 않지만, 필요시 사용할 수 있습니다.
export function cn(...a) {
  return a.filter(Boolean).join(" ");
}

export async function getPublicUrl(fileName) {
  const { data } = supabase.storage.from(STORAGE_BUCKET).getPublicUrl(fileName);
  if (data?.publicUrl) return data.publicUrl;

  // 공개 URL이 없으면 서명된 URL 생성 (10분)
  const { data: signed, error } = await supabase.storage
    .from(STORAGE_BUCKET)
    .createSignedUrl(fileName, 60 * 10);
  if (error) throw error;
  return signed.signedUrl;
}