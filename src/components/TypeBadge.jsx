import React from "react";
import "../styles.css";

export default function TypeBadge({ type }) {
  let label = "Picture"; // 기본값
  switch (type) {
    case "picture":
      label = "Picture";
      break;
    case "poem":
      label = "Poem";
      break;
    case "3d":
      label = "3D Model";
      break;
    case "space":
      label = "Space";
      break;
    default:
      // 알 수 없는 타입도 표시
      label = type ? String(type) : "Item";
      break;
  }

  return <span className="type-badge">{label}</span>;
}