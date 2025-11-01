import { createClient } from "@supabase/supabase-js";

// 환경 변수 가져오기
export const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
export const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;
export const STORAGE_BUCKET = import.meta.env.VITE_STORAGE_BUCKET || "artworks";

// 클라이언트 생성 및 내보내기
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);