import React from "react";
import { motion } from "framer-motion";
import { normalizeTags, fmtDate } from "../lib/utils";
import Tag from "./Tag.jsx";
import TypeBadge from "./TypeBadge.jsx";
import "../styles.css";

export default function ArtworkListItem({ meta, onClick }) {
  const tags = normalizeTags(meta);
  return (
    <motion.div layout>
      <div className="list-item" onClick={onClick}>
        <div className="list-item-header">
          <div className="list-item-header-top">
            <div className="list-item-title">{meta.title}</div>
            <TypeBadge type={meta.type} />
          </div>
          <div className="list-item-date">{fmtDate(meta.date)}</div>
        </div>
        <div className="list-item-body">
          {tags.length > 0 ? (
            <div className="list-item-tags">
              {tags.slice(0, 4).map((t) => (
                <Tag key={t}>{t}</Tag>
              ))}
              {tags.length > 4 && (
                <span className="list-item-tags-more">
                  +{tags.length - 4}
                </span>
              )}
            </div>
          ) : (
            <div className="list-item-no-tags">태그 없음</div>
          )}
          
          <div className="list-item-action"><p>자세히 보기</p></div>
        </div>
      </div>
    </motion.div>
  );
}