import React, { useEffect, useMemo, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { motion } from "framer-motion";

// 3D/Skybox 뷰어용
import { Canvas, useLoader, useThree } from "@react-three/fiber";
import { OrbitControls, Environment, Html, useGLTF } from "@react-three/drei";
import * as THREE from "three";

// --------------------
// Supabase Config
// --------------------
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;
const STORAGE_BUCKET = import.meta.env.VITE_STORAGE_BUCKET || "artworks";
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// --------------------
// Utils
// --------------------
function fmtDate(iso) {
  if (!iso) return "";
  const d = new Date(iso);
  return isNaN(d.getTime()) ? iso : d.toLocaleString();
}

function normalizeTags(meta) {
  const a = Array.isArray(meta?.tags) ? meta.tags : [];
  const b = Array.isArray(meta?.tag) ? meta.tag : [];
  return Array.from(new Set([...a, ...b].filter(Boolean)));
}

function cn(...a) {
  return a.filter(Boolean).join(" ");
}

async function getPublicUrl(fileName) {
  const { data } = supabase.storage.from(STORAGE_BUCKET).getPublicUrl(fileName);
  if (data?.publicUrl) return data.publicUrl;

  const { data: signed, error } = await supabase.storage
    .from(STORAGE_BUCKET)
    .createSignedUrl(fileName, 60 * 10); // 10분
  if (error) throw error;
  return signed.signedUrl;
}

// --------------------
// Data Hook — 목록 로딩
// --------------------
function useArtworks() {
  const [items, setItems] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchAll = async () => {
    setLoading(true);
    setError(null);
    try {
      const url = new URL(`${SUPABASE_URL}/rest/v1/artworks`);
      url.searchParams.set("select", "*");
      url.searchParams.set("order", "date.desc");

      const res = await fetch(url.toString(), {
        headers: {
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        },
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const raw = await res.json();

      // id 기준 중복 제거 + 최신순
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

// --------------------
// List & Item
// --------------------
function ArtworkList({ onSelect }) {
  const { items, error, loading, refetch } = useArtworks();
  const [q, setQ] = useState("");

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

  return (
    <div style={{ display: "grid", gridTemplateRows: "auto 1fr auto", height: "100%", gap: 12 }}>
      {/* 상단: 검색/새로고침 */}
      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <input
          placeholder="검색: 제목, 태그, 타입..."
          value={q}
          onChange={(e) => setQ(e.target.value)}
          style={{ padding: 8, border: "1px solid #ccc", borderRadius: 8, width: 260 }}
        />
        <button
          onClick={refetch}
          disabled={loading}
          style={{ padding: "8px 12px", borderRadius: 8, border: "1px solid #ccc", background: "#fff" }}
        >
          {loading ? "로딩..." : "새로고침"}
        </button>
      </div>

      {/* 목록 */}
      <div style={{ overflow: "auto", border: "1px solid #e5e7eb", borderRadius: 12, padding: 8 }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
            gap: 12,
          }}
        >
          {loading && !items &&
            Array.from({ length: 6 }).map((_, i) => (
              <div key={i} style={{ border: "1px solid #eee", borderRadius: 12, overflow: "hidden" }}>
                <div style={{ height: 160, background: "#f3f4f6" }} />
                <div style={{ padding: 16 }}>
                  <div style={{ height: 12, width: "70%", background: "#f3f4f6", marginBottom: 8 }} />
                  <div style={{ height: 12, width: "40%", background: "#f3f4f6" }} />
                </div>
              </div>
            ))}

          {error && (
            <div style={{ gridColumn: "1 / -1", border: "1px solid #fecaca", borderRadius: 12, padding: 16, color: "#b91c1c" }}>
              불러오기 실패: {error}
            </div>
          )}

          {filtered.map((meta) => (
            <ArtworkListItem key={meta.id} meta={meta} onClick={() => onSelect(meta)} />
          ))}
        </div>
      </div>

      <div style={{ fontSize: 12, color: "#6b7280" }}>총 {filtered.length}개 · 최신순</div>
    </div>
  );
}

function Tag({ children }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        padding: "2px 6px",
        borderRadius: 8,
        border: "1px solid #e5e7eb",
        fontSize: 12,
      }}
    >
      {children}
    </span>
  );
}

function ArtworkListItem({ meta, onClick }) {
  const tags = normalizeTags(meta);
  return (
    <motion.div layout>
      <div
        onClick={onClick}
        style={{
          cursor: "pointer",
          border: "1px solid #e5e7eb",
          borderRadius: 12,
          overflow: "hidden",
          transition: "box-shadow .2s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,0,0,.06)")}
        onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "none")}
      >
        <div style={{ padding: "12px 16px", borderBottom: "1px solid #f3f4f6" }}>
          <div style={{ display: "flex", justifyContent: "space-between", gap: 8 }}>
            <div style={{ fontWeight: 600, fontSize: 14, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {meta.title}
            </div>
            <TypeBadge type={meta.type} />
          </div>
          <div style={{ fontSize: 12, color: "#6b7280" }}>{fmtDate(meta.date)}</div>
        </div>
        <div style={{ padding: 16 }}>
          {tags.length > 0 ? (
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {tags.slice(0, 4).map((t) => (
                <Tag key={t}>{t}</Tag>
              ))}
              {tags.length > 4 && <span style={{ fontSize: 12, color: "#6b7280" }}>+{tags.length - 4}</span>}
            </div>
          ) : (
            <div style={{ fontSize: 12, color: "#9ca3af" }}>태그 없음</div>
          )}
          <div style={{ height: 1, background: "#f3f4f6", margin: "12px 0" }} />
          <div style={{ textAlign: "right", color: "#2563eb", fontSize: 14 }}>자세히 보기 →</div>
        </div>
      </div>
    </motion.div>
  );
}

function TypeBadge({ type }) {
  const label = type === "model" ? "Model" : type === "skybox" ? "Skybox" : "Picture";
  return (
    <span
      style={{
        padding: "2px 6px",
        borderRadius: 8,
        background: "#f3f4f6",
        fontSize: 12,
      }}
    >
      {label}
    </span>
  );
}

// --------------------
// Detail + 파일 로딩
// --------------------
function ArtworkDetail({ meta, onBack }) {
  const [url, setUrl] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let alive = true;
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

  return (
    <div style={{ display: "grid", gridTemplateRows: "auto auto 1fr", height: "100%", gap: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
        <div>
          <div style={{ fontSize: 20, fontWeight: 700 }}>{meta.title}</div>
          <div style={{ fontSize: 12, color: "#6b7280" }}>
            {fmtDate(meta.date)} · {meta.type}
          </div>
        </div>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          {url && (
            <a href={url} target="_blank" rel="noreferrer" style={{ color: "#2563eb", textDecoration: "underline", fontSize: 14 }}>
              원본 열기
            </a>
          )}
          <button onClick={onBack} style={{ padding: "8px 12px", borderRadius: 8, border: "1px solid #ccc", background: "#fff" }}>
            목록으로
          </button>
        </div>
      </div>

      <div>
        {normalizeTags(meta).length > 0 && (
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 8 }}>
            {normalizeTags(meta).map((t) => (
              <Tag key={t}>{t}</Tag>
            ))}
          </div>
        )}
        {meta.prompt && <div style={{ fontSize: 14, color: "#6b7280" }}>{meta.prompt}</div>}
      </div>

      <div style={{ border: "1px solid #e5e7eb", borderRadius: 12, overflow: "hidden", minHeight: 200 }}>
        {!url && !error && <div style={{ padding: 24 }}>로딩 중...</div>}
        {error && <div style={{ padding: 24, color: "#b91c1c" }}>파일 URL 생성 실패: {error}</div>}

        {url && meta.type === "picture" && <PictureViewer url={url} alt={meta.title} />}
        {url && meta.type === "model" && <ModelViewer url={url} />}
        {url && meta.type === "skybox" && <SkyboxViewer url={url} />}
        {url && !["picture", "model", "skybox"].includes(meta.type) && (
          <div style={{ padding: 24, fontSize: 14 }}>
            이 타입은 기본 뷰어가 없습니다.{" "}
            <a href={url} target="_blank" rel="noreferrer" style={{ color: "#2563eb", textDecoration: "underline" }}>
              파일 링크
            </a>
            로 확인하세요.
          </div>
        )}
      </div>
    </div>
  );
}

// --------------------
// Viewers
// --------------------
function PictureViewer({ url, alt }) {
  return (
    <div style={{ width: "100%", height: "100%", background: "#f3f4f6", display: "grid", placeItems: "center" }}>
      {/* eslint-disable-next-line jsx-a11y/alt-text */}
      <img src={url} alt={alt} style={{ maxHeight: "70vh", width: "auto", objectFit: "contain" }} />
    </div>
  );
}

function SuspenseFallback({ children }) {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setReady(true), 100);
    return () => clearTimeout(t);
  }, []);
  return (
    <>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: ready ? 1 : 0 }} style={{ width: "100%", height: "100%" }}>
        {children}
      </motion.div>
      {!ready && (
        <div style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center" }}>
          <div style={{ background: "rgba(255,255,255,.7)", padding: "6px 10px", borderRadius: 8, fontSize: 14 }}>로딩 중...</div>
        </div>
      )}
    </>
  );
}

// ---- 3D Model (GLB/GLTF)
function ModelViewer({ url }) {
  return (
    <div style={{ width: "100%", height: "70vh", background: "#000", position: "relative" }}>
      <Canvas camera={{ position: [2, 2, 3], fov: 50 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 10, 5]} intensity={1.0} />
        <SuspenseFallback>
          <Model url={url} />
        </SuspenseFallback>
        <Environment preset="warehouse" />
        <OrbitControls makeDefault />
      </Canvas>
    </div>
  );
}
function Model({ url }) {
  const { scene } = useGLTF(url);
  return <primitive object={scene} />;
}

// ---- Skybox (equirectangular)
function SkyboxViewer({ url }) {
  return (
    <div style={{ width: "100%", height: "70vh", background: "#000", position: "relative" }}>
      <Canvas camera={{ position: [0, 0, 0.1], fov: 75 }}>
        <SuspenseFallback>
          <EquirectSky url={url} />
        </SuspenseFallback>
        <OrbitControls enableZoom={false} />
      </Canvas>
    </div>
  );
}
function EquirectSky({ url }) {
  const gl = useThree((s) => s.gl);
  const texture = useLoader(THREE.TextureLoader, url);
  const old = useMemo(() => {
    const c = new THREE.Color();
    gl.getClearColor(c);
    return c.clone();
  }, [gl]);

  useEffect(() => {
    texture.mapping = THREE.EquirectangularReflectionMapping;
    texture.colorSpace = THREE.SRGBColorSpace;
  }, [texture]);

  useEffect(() => {
    const scene = gl.scene;
    const prev = scene.background;
    scene.background = texture;
    gl.setClearColor("#000000");
    return () => {
      scene.background = prev;
      gl.setClearColor(old);
    };
  }, [gl, old, texture]);

  return null;
}

// --------------------
// Page (좌: 목록 / 우: 상세)
// --------------------
export default function ArtworksPage() {
  const [selected, setSelected] = useState(null);
  return (
    <div style={{ padding: 16, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, height: "100vh", boxSizing: "border-box" }}>
      <div style={{ display: "grid", gridTemplateRows: "auto 1fr", gap: 12, minHeight: 0 }}>
        <h1 style={{ fontSize: 22, fontWeight: 800 }}>Artworks</h1>
        <ArtworkList onSelect={setSelected} />
      </div>
      <div style={{ minHeight: 0 }}>
        {selected ? (
          <ArtworkDetail meta={selected} onBack={() => setSelected(null)} />
        ) : (
          <div
            style={{
              height: "100%",
              border: "1px solid #e5e7eb",
              borderRadius: 12,
              display: "grid",
              placeItems: "center",
              textAlign: "center",
            }}
          >
            <div>
              <div style={{ fontSize: 16, fontWeight: 600 }}>오른쪽 패널에 상세가 표시됩니다</div>
              <div style={{ fontSize: 14, color: "#6b7280" }}>왼쪽 목록에서 항목을 선택하세요.</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
