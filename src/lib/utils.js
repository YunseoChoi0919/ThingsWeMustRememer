import { supabase, STORAGE_BUCKET } from "./supabaseClient";

export function fmtDate(iso, locale = "ko-KR") {
  if (!iso) return "";

  // 1. 날짜 문자열에서 '+' 기호 앞부분만 잘라냅니다.
  // 예: "2025-08-18 13:26:56.612814+00" -> "2025-08-18 13:26:56.612814"
  // 이렇게 하면 브라우저는 뒤의 타임존을 무시하고, 적혀있는 시간 숫자를 그대로 받아들입니다.
  const localDateStr = iso.split('+')[0]; 

  const d = new Date(localDateStr);

  // 2. toLocaleString은 별도 옵션이 없으면 입력된 시간 그대로 현지 포맷으로 바꿔줍니다.
  return isNaN(d.getTime())
    ? iso
    : d.toLocaleString(locale); 
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

// src/lib/utils.js

// ... (fmtDate, normalizeTags, getPublicUrl 등 기존 함수들) ...

// [추가] 타입 변환 함수
export function getTypeLabel(type) {
  let label = "Picture"; // 기본값
  switch (type) {
    case "picture":
      label = "그림";
      break;
    case "poem":
      label = "시";
      break;
    case "3d":
      label = "3D 캐릭터";
      break;
    case "skybox":
      label = "공간";
      break;
    default:
      // 알 수 없는 타입도 표시
      label = type ? String(type) : "Item";
      break;
  }
  return label;
}