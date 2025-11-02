import React from "react";
import "../styles.css";

export default function TypeBadge({ type }) {
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

  return <span className="type-badge">{label}</span>;
}