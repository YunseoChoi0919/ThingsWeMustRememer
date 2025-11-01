import React from "react";
import "../../styles.css";

export default function PictureViewer({ url, alt }) {
  return (
    <div className="picture-viewer">
      <img src={url} alt={alt} className="picture-viewer-img" />
    </div>
  );
}