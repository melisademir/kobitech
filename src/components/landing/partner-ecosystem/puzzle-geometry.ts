// ─── Puzzle geometry constants & path generator ──────────────────────────────
export const CW = 90; // cell width px
export const CH = 75; // cell height px
export const T = 12;  // tab radius px
export const COLS = 5;
export const GAP = 3;

/**
 * Generate SVG path for one puzzle piece.
 */
export function puzzlePath(
  px: number, py: number,
  cs: number, rs: number,
  edges: { top: number[]; right: number[]; bottom: number[]; left: number[] }
): string {
  const pw = cs * CW;
  const ph = rs * CH;
  const cp = T * 1.55;

  let d = `M ${px} ${py} `;

  // TOP edge
  for (let c = 0; c < cs; c++) {
    const sx = px + c * CW;
    const mx = sx + CW / 2;
    const tv = edges.top[c] ?? 0;
    if (tv === 0) {
      d += `L ${sx + CW} ${py} `;
    } else {
      d += `L ${mx - T} ${py} `;
      d += `C ${mx - T} ${py - tv * cp} ${mx + T} ${py - tv * cp} ${mx + T} ${py} `;
      d += `L ${sx + CW} ${py} `;
    }
  }

  // RIGHT edge
  const rx = px + pw;
  for (let r = 0; r < rs; r++) {
    const sy = py + r * CH;
    const my = sy + CH / 2;
    const tv = edges.right[r] ?? 0;
    if (tv === 0) {
      d += `L ${rx} ${sy + CH} `;
    } else {
      d += `L ${rx} ${my - T} `;
      d += `C ${rx + tv * cp} ${my - T} ${rx + tv * cp} ${my + T} ${rx} ${my + T} `;
      d += `L ${rx} ${sy + CH} `;
    }
  }

  // BOTTOM edge
  for (let c = cs - 1; c >= 0; c--) {
    const sx = px + c * CW;
    const mx = sx + CW / 2;
    const tv = edges.bottom[c] ?? 0;
    const by = py + ph;
    if (tv === 0) {
      d += `L ${sx} ${by} `;
    } else {
      d += `L ${mx + T} ${by} `;
      d += `C ${mx + T} ${by + tv * cp} ${mx - T} ${by + tv * cp} ${mx - T} ${by} `;
      d += `L ${sx} ${by} `;
    }
  }

  // LEFT edge
  for (let r = rs - 1; r >= 0; r--) {
    const sy = py + r * CH;
    const my = sy + CH / 2;
    const tv = edges.left[r] ?? 0;
    if (tv === 0) {
      d += `L ${px} ${sy} `;
    } else {
      d += `L ${px} ${my + T} `;
      d += `C ${px - tv * cp} ${my + T} ${px - tv * cp} ${my - T} ${px} ${my - T} `;
      d += `L ${px} ${sy} `;
    }
  }

  return d + "Z";
}
