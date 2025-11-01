import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import "../../styles.css";

export default function SuspenseFallback({ children }) {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    // 0.1초 딜레이 후 로딩 표시 (빠른 로딩 시 깜빡임 방지)
    const t = setTimeout(() => setReady(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: ready ? 1 : 0 }}
        style={{ width: "100%", height: "100%" }} // 3D 컨텐츠 영역 확보
      >
        {children}
      </motion.div>
      {!ready && (
        <div className="suspense-fallback-loader">
          <div className="suspense-fallback-loader-inner">로딩 중...</div>
        </div>
      )}
    </>
  );
}