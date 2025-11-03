// src/components/TypeBadge.jsx

import React from "react";
import "../styles.css";
// [1. 수정] 훅을 임포트합니다.
import { getTypeLabel } from "../lib/utils";

export default function TypeBadge({ type }) {
  // [2. 수정] 로직을 훅 호출로 대체합니다.
  const label = getTypeLabel(type);

  return <span className="type-badge">{label}</span>;
}