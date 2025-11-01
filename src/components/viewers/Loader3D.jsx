// src/components/viewers/Loader3D.jsx

import React from "react";
import { Html } from "@react-three/drei";
import "../../styles.css";

/**
 * 3D 캔버스 내부에서 Suspense fallback으로 사용될 HTML 로더입니다.
 * <Html> 컴포넌트가 HTML을 3D 공간에 렌더링해줍니다.
 */
export default function Loader3D() {
  return (
    <Html center>
      {/* 기존 CSS 클래스를 재사용하되, 
        어두운 3D 뷰어 배경에서도 잘 보이도록 인라인 스타일을 추가합니다.
      */}
      <div
        className="suspense-fallback-loader-inner"
        style={{
          background: "rgba(255, 255, 255, 0.9)",
          color: "#111827",
        }}
      >
        로딩 중...
      </div>
    </Html>
  );
}