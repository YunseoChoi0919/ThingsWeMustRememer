import React, { Suspense, useEffect, useMemo } from "react";
import { Canvas, useLoader, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import Loader3D from "./Loader3D";
import "../../styles.css";

function EquirectSky({ url }) {
  // useThree에서 gl과 scene을 올바르게 가져옵니다.
  const { gl, scene } = useThree();
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
    const prev = scene.background;
    scene.background = texture;
    gl.setClearColor("#000000");
    
    return () => {
      scene.background = prev;
      gl.setClearColor(old);
    };
  }, [gl, old, texture, scene]); // scene을 의존성에 추가

  return null;
}

export default function SkyboxViewer({ url }) {
  return (
    <div className="viewer-3d">
      {/* [수정] dpr={[1, 1.5]} 속성을 추가하여 모바일 성능 최적화 */}
      <Canvas camera={{ position: [0, 0, 0.1], fov: 75 }} dpr={[1, 1.5]}>
        <Suspense fallback={<Loader3D />}>
          <EquirectSky url={url} />
        </Suspense>
        <OrbitControls enableZoom={false} />
      </Canvas>
    </div>
  );
}