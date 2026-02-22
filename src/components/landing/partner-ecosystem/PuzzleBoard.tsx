import { useState } from "react";
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
    const padding = isSmall ? Math.min(pieceW, pieceH) * 0.10 : Math.min(pieceW, pieceH) * 0.18;
    return (
      <g clipPath={`url(#clip-${piece.id})`} style={{ pointerEvents: "none" }}>
        <rect x={px} y={py} width={pieceW} height={pieceH} fill="#FFFFFF" />
        <image
          href={piece.logo}
          x={px + padding} y={py + padding}
          width={pieceW - padding * 2} height={pieceH - padding * 2}
          preserveAspectRatio="xMidYMid meet"
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
  const SVG_H = 4 * CH + (4 - 1) * GAP;
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <svg
      viewBox={`0 0 ${SVG_W} ${SVG_H}`}
      width="100%"
      style={{ display: "block", overflow: "visible" }}
      aria-label="Partner ekosistemi puzzle"
    >
      <defs>
        {pieces.map((p) => {
          const gx = p.col * CW;
          const gy = p.row * CH;
          const gw = p.cs * CW;
          const gh = p.rs * CH;
          return (
            <linearGradient key={`grad-${p.id}`} id={`bevel-${p.id}`}
              x1={gx} y1={gy} x2={gx + gw} y2={gy + gh} gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="rgba(255,255,255,0.22)" />
              <stop offset="45%" stopColor="rgba(255,255,255,0.04)" />
              <stop offset="100%" stopColor="rgba(0,0,0,0.12)" />
            </linearGradient>
          );
        })}
        <filter id="shadow-selected" x="-10%" y="-10%" width="120%" height="130%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="hsl(268,72%,26%,0.25)" />
        </filter>
      </defs>

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
            initial={{ opacity: 0 }}
            animate={visible ? {
              opacity: 1,
              filter: isSel
                ? "drop-shadow(0 4px 12px hsl(268,72%,26%,0.32)) drop-shadow(0 1px 3px hsl(268,72%,38%,0.18))"
                : isHov
                  ? "drop-shadow(0 3px 8px hsl(268,72%,26%,0.18)) drop-shadow(0 1px 2px hsl(260,30%,14%,0.06))"
                  : "drop-shadow(0 1px 3px hsl(260,30%,14%,0.08))"
            } : { opacity: 0 }}
            transition={{
              opacity: { duration: 0.4, delay: 0.04 + i * 0.035 },
              filter: { duration: 0.25, ease: "easeOut" }
            }}
            style={{ cursor: "pointer", transformOrigin: `${cx}px ${cy}px` }}
            onClick={() => onSelect(piece.id)}
            onMouseEnter={() => setHovered(piece.id)}
            onMouseLeave={() => setHovered(null)}
          >
            <g>
              {/* Base fill — selected gets a faint purple tint */}
              <path d={pathD} fill={isSel ? "hsl(268,60%,98%)" : "#FFFFFF"} />
              <path d={pathD} fill={`url(#bevel-${piece.id})`} />

              {/* Border — transitions between states */}
              <path
                d={pathD}
                fill="none"
                stroke={
                  isSel ? "hsl(268,72%,38%)"
                    : isHov ? "hsl(268,72%,38%,0.45)"
                    : "hsl(260,30%,14%,0.18)"
                }
                strokeWidth={isSel ? 2.5 : isHov ? 2 : 1.5}
              />

              {/* Inner glow for selected state */}
              {isSel && (
                <path
                  d={pathD}
                  fill="hsl(268,72%,38%,0.04)"
                />
              )}

              <clipPath id={`clip-${piece.id}`}>
                <path d={pathD} />
              </clipPath>

              {/* Top/left bevel highlights */}
              <rect x={px} y={py} width={pw} height={6} fill="rgba(255,255,255,0.18)" clipPath={`url(#clip-${piece.id})`} />
              <rect x={px} y={py} width={6} height={ph} fill="rgba(255,255,255,0.12)" clipPath={`url(#clip-${piece.id})`} />

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
