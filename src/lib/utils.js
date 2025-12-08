// src/lib/utils.js

// ❗ 여기에 방금 얻은 R2 주소를 넣으세요 (맨 뒤에 '/'는 빼고!)
const R2_BASE_URL = "https://pub-cb48b6b40322408f8fcdcb946f496e99.r2.dev"; 

// 1. 날짜 포맷팅 (기존 유지)
export function fmtDate(iso, locale = "ko-KR") {
  if (!iso) return "";
  const localDateStr = iso.split('+')[0]; 
  const d = new Date(localDateStr);
  return isNaN(d.getTime()) ? iso : d.toLocaleString(locale); 
}

// 2. 태그 정규화 (기존 유지)
export function normalizeTags(meta) {
  const tags = Array.isArray(meta?.tags) ? meta.tags : [];
  return Array.from(new Set(tags.filter(Boolean)));
}

// 3. 클래스네임 유틸 (기존 유지)
export function cn(...a) {
  return a.filter(Boolean).join(" ");
}

// ✅ [핵심 변경] 비동기(async) 제거 -> 동기 함수로 변경
// 이제 기다릴 필요 없이 즉시 URL을 뱉어냅니다.
export function getPublicUrl(fileName) {
  if (!fileName) return null;

  // 파일명에 한글이나 공백이 있을 수 있으므로 안전하게 인코딩
  const encodedName = encodeURIComponent(fileName);
  
  // 주소 조합해서 바로 반환
  return `${R2_BASE_URL}/${encodedName}`;
}

// 4. 타입 라벨 (기존 유지)
export function getTypeLabel(type) {
  let label = "Picture"; 
  switch (type) {
    case "picture": label = "그림"; break;
    case "poem": label = "시"; break;
    case "3d": label = "3D 캐릭터"; break;
    case "skybox": label = "공간"; break;
    default: label = type ? String(type) : "Item"; break;
  }
  return label;
}