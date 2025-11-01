// src/components/viewers/ModelViewer.jsx

import React, { Suspense } from "react"; // React의 Suspense를 임포트
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, useGLTF } from "@react-three/drei";
// import SuspenseFallback from "./SuspenseFallback"; // <-- 이 줄 삭제
import Loader3D from "./Loader3D"; // <-- 이 줄 추가
import "../../styles.css";

function Model({ url }) {
  const { scene } = useGLTF(url);
  return <primitive object={scene} />;
}

export default function ModelViewer({ url }) {
  return (
    <div className="viewer-3d">
      <Canvas camera={{ position: [2, 2, 3], fov: 50 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 10, 5]} intensity={1.0} />
        <Suspense fallback={<Loader3D />}> {/* <-- 여기를 수정 */}
          <Model url={url} />
        </Suspense>
        <Environment preset="warehouse" />
        <OrbitControls makeDefault />
      </Canvas>
    </div>
  );
}