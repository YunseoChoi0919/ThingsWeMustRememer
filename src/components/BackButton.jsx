// src/components/BackButton.js
import React from "react";
import PropTypes from 'prop-types'; // 타입 검사 추가 (선택 사항)

export default function BackButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="back-button" // CSS 클래스 적용
    >
      ← 목록으로
    </button>
  );
}

BackButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};