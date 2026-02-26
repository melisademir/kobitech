import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { pieces, partnerDetails } from "./partner-data";
import { puzzlePath, CW, CH, COLS, GAP } from "./puzzle-geometry";
import type { PuzzlePiece } from "./partner-data";

// ─── Logo / text inside a piece ──────────────────────────────────────────────
function LogoText({ piece, cx, cy }: { piece: PuzzlePiece; cx: number; cy: number }) {
  const pieceW = piece.cs * CW;
  const pieceH = piece.rs * CH;
  const px = cx - pieceW / 2;
  const py = cy - pieceH / 2;

  if (piece.logo) {
    const isSmall = piece.cs === 1 && piece.rs === 1;
    const padding = isSmall ? Math.min(pieceW, pieceH) * 0.06 : Math.min(pieceW, pieceH) * 0.12;
    return (
      <g clipPath={`url(#clip-${piece.id})`} style={{ pointerEvents: "none" }}>
        <rect x={px} y={py} width={pieceW} height={pieceH} fill="#FFFFFF" />
        <image
          href={piece.logo}
          x={px + padding} y={py + padding}
          width={pieceW - padding * 2} height={pieceH - padding * 2}
          preserveAspectRatio="xMidYMid meet"
          style={{ mixBlendMode: "multiply" }}
        />
      </g>
    );
  }

  // Fallback: text
  const name = piece.name;
  const words = name.split(" ");
  const line1 = words.length > 1 ? words.slice(0, Math.ceil(words.length / 2)).join(" ") : name;
  const line2 = words.length > 1 ? words.slice(Math.ceil(words.length / 2)).join(" ") : null;

  const area = pieceW * pieceH;
  const maxChars = Math.max(line1.length, (line2 || "").length);
  const baseFontSize = Math.min(
    pieceW * 0.8 / Math.max(maxChars * 0.55, 2),
    pieceH * 0.28,
    area > 10000 ? 22 : area > 6000 ? 16 : 12
  );
  const fontSize = Math.max(8, Math.min(baseFontSize, 18));
  const lineH = fontSize * 1.25;
  const totalH = line2 ? lineH * 2 : lineH;
  const startY = cy - totalH / 2 + lineH * 0.7;

  return (
    <g>
      <text x={cx} y={startY} textAnchor="middle" dominantBaseline="middle"
        fill="hsl(260,30%,14%)" fontFamily="'Plus Jakarta Sans', sans-serif" fontWeight="800"
        fontSize={fontSize} letterSpacing="-0.3" style={{ userSelect: "none", pointerEvents: "none" }}>
        {line1}
      </text>
      {line2 && (
        <text x={cx} y={startY + lineH} textAnchor="middle" dominantBaseline="middle"
          fill="hsl(260,30%,14%)" fontFamily="'Plus Jakarta Sans', sans-serif" fontWeight="800"
          fontSize={fontSize} letterSpacing="-0.3" style={{ userSelect: "none", pointerEvents: "none" }}>
          {line2}
        </text>
      )}
    </g>
  );
}

// ─── SVG Puzzle component ─────────────────────────────────────────────────────
export default function PuzzleBoard({
  selectedId,
  onSelect,
  visible
}: {
  selectedId: string | null;
  onSelect: (id: string) => void;
  visible: boolean;
}) {
  const SVG_W = COLS * CW + (COLS - 1) * GAP;
  const maxRow = Math.max(...pieces.map(p => p.row + p.rs));
  const SVG_H = maxRow * CH + (maxRow - 1) * GAP;
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <svg
      viewBox={`-12 -12 ${SVG_W + 24} ${SVG_H + 24}`}
      width="100%"
      style={{ display: "block", overflow: "visible" }}
      aria-label="Partner ekosistemi puzzle"
    >
      <defs>
        {pieces.map((p) => {
          const gx = p.col * CW + p.col * GAP;
          const gy = p.row * CH + p.row * GAP;
          const gw = p.cs * CW;
          const gh = p.rs * CH;
          return (
            <React.Fragment key={`defs-${p.id}`}>
              {/* Main bevel: top-left light → bottom-right dark */}
              <linearGradient id={`bevel-${p.id}`}
                x1={gx} y1={gy} x2={gx + gw} y2={gy + gh} gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="rgba(255,255,255,0.35)" />
                <stop offset="40%" stopColor="rgba(255,255,255,0.05)" />
                <stop offset="100%" stopColor="rgba(0,0,0,0.18)" />
              </linearGradient>
              {/* Top highlight strip */}
              <linearGradient id={`top-light-${p.id}`}
                x1={gx} y1={gy} x2={gx} y2={gy + gh * 0.35} gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="rgba(255,255,255,0.5)" />
                <stop offset="100%" stopColor="rgba(255,255,255,0)" />
              </linearGradient>
              {/* Bottom shadow strip */}
              <linearGradient id={`bot-shadow-${p.id}`}
                x1={gx} y1={gy + gh * 0.7} x2={gx} y2={gy + gh} gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="rgba(0,0,0,0)" />
                <stop offset="100%" stopColor="rgba(0,0,0,0.08)" />
              </linearGradient>
            </React.Fragment>
          );
        })}
        {/* Selected piece purple gradient */}
        <linearGradient id="selected-fill" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="hsl(268,60%,97%)" />
          <stop offset="100%" stopColor="hsl(268,50%,93%)" />
        </linearGradient>
        {/* Background radial gradient */}
        <radialGradient id="puzzle-bg-glow" cx="50%" cy="45%" r="55%">
          <stop offset="0%" stopColor="hsl(268,40%,95%)" stopOpacity="0.5" />
          <stop offset="60%" stopColor="hsl(38,30%,97%)" stopOpacity="0.2" />
          <stop offset="100%" stopColor="hsl(38,30%,97%)" stopOpacity="0" />
        </radialGradient>
        {/* Inner shadow filter for depth */}
        <filter id="inner-shadow" x="-5%" y="-5%" width="110%" height="115%">
          <feComponentTransfer in="SourceAlpha">
            <feFuncA type="table" tableValues="1 0" />
          </feComponentTransfer>
          <feGaussianBlur stdDeviation="2.5" />
          <feOffset dx="0" dy="2" result="offsetblur" />
          <feFlood floodColor="rgba(0,0,0,0.12)" result="color" />
          <feComposite in2="offsetblur" operator="in" />
          <feComposite in2="SourceAlpha" operator="in" />
          <feMerge>
            <feMergeNode in="SourceGraphic" />
            <feMergeNode />
          </feMerge>
        </filter>
      </defs>

      {/* Subtle background glow behind puzzle */}
      <rect x="-12" y="-12" width={SVG_W + 24} height={SVG_H + 24} fill="url(#puzzle-bg-glow)" rx="16" />

        {pieces.map((piece, i) => {
        const px = piece.col * CW + piece.col * GAP;
        const py = piece.row * CH + piece.row * GAP;
        const pw = piece.cs * CW;
        const ph = piece.rs * CH;
        const cx = px + pw / 2;
        const cy = py + ph / 2;

        const pathD = puzzlePath(px, py, piece.cs, piece.rs, piece.edges);
        const isSel = selectedId === piece.id;
        const isHov = hovered === piece.id;

        return (
          <motion.g
            key={piece.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={visible ? {
              opacity: 1,
              scale: isSel ? 1.08 : isHov ? 1.02 : 1,
              filter: isSel
                ? "drop-shadow(0 20px 30px rgba(107,33,168,0.3)) drop-shadow(0 4px 10px rgba(0,0,0,0.1))"
                : isHov
                  ? "drop-shadow(0 8px 15px rgba(107,33,168,0.15))"
                  : "drop-shadow(0 2px 4px rgba(0,0,0,0.06))"
            } : { opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            whileTap={{ scale: 0.95 }}
            style={{ cursor: "pointer", transformOrigin: `${cx}px ${cy}px` }}
            onClick={() => onSelect(piece.id)}
            onMouseEnter={() => setHovered(piece.id)}
            onMouseLeave={() => setHovered(null)}
          >
            <g>
              {/* 3D thickness — stacked offset layers simulate side face */}
              {[4, 3, 2, 1].map((offset) => (
                <path
                  key={`depth-${offset}`}
                  d={pathD}
                  fill={`rgba(0,0,0,${0.03 + offset * 0.015})`}
                  transform={`translate(0, ${offset * 1.2})`}
                />
              ))}

              {/* Base fill */}
              <path d={pathD} fill={isSel ? "url(#selected-fill)" : "#FFFFFF"} />
              {/* 3D bevel overlay */}
              <path d={pathD} fill={`url(#bevel-${piece.id})`} />
              {/* Top light wash — simulates light from above */}
              <path d={pathD} fill={`url(#top-light-${piece.id})`} />
              {/* Bottom shadow wash — simulates shadow underneath */}
              <path d={pathD} fill={`url(#bot-shadow-${piece.id})`} />

              {/* Border with crisp glow for selected */}
              <path
                d={pathD}
                fill="none"
                stroke={isSel ? "#a855f7" : isHov ? "hsl(268,72%,38%,0.35)" : "hsl(260,30%,14%,0.12)"}
                strokeWidth={isSel ? 2.5 : isHov ? 2 : 1.5}
              />
              {isSel && (
                <path d={pathD} fill="none" stroke="rgba(168,85,247,0.12)" strokeWidth={8} />
              )}

              <clipPath id={`clip-${piece.id}`}>
                <path d={pathD} />
              </clipPath>

              {/* Top edge highlight — crisp 3D lip */}
              <rect x={px} y={py} width={pw} height={8} fill="rgba(255,255,255,0.3)" clipPath={`url(#clip-${piece.id})`} />
              {/* Left edge highlight */}
              <rect x={px} y={py} width={8} height={ph} fill="rgba(255,255,255,0.2)" clipPath={`url(#clip-${piece.id})`} />
              {/* Bottom edge shadow */}
              <rect x={px} y={py + ph - 6} width={pw} height={6} fill="rgba(0,0,0,0.06)" clipPath={`url(#clip-${piece.id})`} />
              {/* Right edge shadow */}
              <rect x={px + pw - 4} y={py} width={4} height={ph} fill="rgba(0,0,0,0.04)" clipPath={`url(#clip-${piece.id})`} />

              <LogoText piece={piece} cx={cx} cy={cy} />
            </g>

            {/* Tooltip */}
            <AnimatePresence>
              {isHov && (
                <motion.g
                  initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 4 }}
                  transition={{ duration: 0.15 }} style={{ pointerEvents: "none" }}
                >
                  <rect x={cx - 52} y={py - 38} width={104} height={32} rx={8}
                    fill="white" style={{ filter: "drop-shadow(0 2px 8px hsl(260,30%,14%,0.14))" }} />
                  <text x={cx} y={py - 25} textAnchor="middle" fill="hsl(260,30%,14%)"
                    fontFamily="'Plus Jakarta Sans', sans-serif" fontWeight="700" fontSize="11"
                    style={{ pointerEvents: "none" }}>
                    {piece.name}
                  </text>
                  <text x={cx} y={py - 12} textAnchor="middle" fill="hsl(260,12%,48%)"
                    fontFamily="'Plus Jakarta Sans', sans-serif" fontWeight="500" fontSize="9"
                    style={{ pointerEvents: "none" }}>
                    {partnerDetails[piece.id]?.category}
                  </text>
                  <polygon points={`${cx - 5},${py - 6} ${cx + 5},${py - 6} ${cx},${py - 1}`} fill="white" />
                </motion.g>
              )}
            </AnimatePresence>
          </motion.g>
        );
      })}
    </svg>
  );
}
