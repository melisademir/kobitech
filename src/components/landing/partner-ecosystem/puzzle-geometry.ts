// ─── Puzzle geometry constants & path generator ──────────────────────────────
export const CW = 90; // cell width px
export const CH = 75; // cell height px
export const T = 12;  // tab radius px
export const COLS = 5;
export const GAP = 3;
const R = 8; // corner radius for rounded corners

/**
 * Generate SVG path for one puzzle piece with rounded corners.
 */
export function puzzlePath(
  px: number, py: number,
  cs: number, rs: number,
  edges: { top: number[]; right: number[]; bottom: number[]; left: number[] }
): string {
  const pw = cs * CW;
  const ph = rs * CH;
  const cp = T * 1.55;

  const tl = { x: px, y: py };
  const tr = { x: px + pw, y: py };
  const br = { x: px + pw, y: py + ph };
  const bl = { x: px, y: py + ph };

  let d = `M ${tl.x + R} ${tl.y} `;

  // TOP edge
  for (let c = 0; c < cs; c++) {
    const sx = px + c * CW;
    const mx = sx + CW / 2;
    const tv = edges.top[c] ?? 0;
    if (tv === 0) {
      const endX = c === cs - 1 ? tr.x - R : sx + CW;
      d += `L ${endX} ${py} `;
    } else {
      d += `L ${mx - T} ${py} `;
      d += `C ${mx - T} ${py - tv * cp} ${mx + T} ${py - tv * cp} ${mx + T} ${py} `;
      const endX = c === cs - 1 ? tr.x - R : sx + CW;
      d += `L ${endX} ${py} `;
    }
  }

  // Top-right corner
  d += `Q ${tr.x} ${tr.y} ${tr.x} ${tr.y + R} `;

  // RIGHT edge
  for (let r = 0; r < rs; r++) {
    const sy = py + r * CH;
    const my = sy + CH / 2;
    const tv = edges.right[r] ?? 0;
    const rx = px + pw;
    if (tv === 0) {
      const endY = r === rs - 1 ? br.y - R : sy + CH;
      d += `L ${rx} ${endY} `;
    } else {
      d += `L ${rx} ${my - T} `;
      d += `C ${rx + tv * cp} ${my - T} ${rx + tv * cp} ${my + T} ${rx} ${my + T} `;
      const endY = r === rs - 1 ? br.y - R : sy + CH;
      d += `L ${rx} ${endY} `;
    }
  }

  // Bottom-right corner
  d += `Q ${br.x} ${br.y} ${br.x - R} ${br.y} `;

  // BOTTOM edge
  for (let c = cs - 1; c >= 0; c--) {
    const sx = px + c * CW;
    const mx = sx + CW / 2;
    const tv = edges.bottom[c] ?? 0;
    const by = py + ph;
    if (tv === 0) {
      const endX = c === 0 ? bl.x + R : sx;
      d += `L ${endX} ${by} `;
    } else {
      d += `L ${mx + T} ${by} `;
      d += `C ${mx + T} ${by + tv * cp} ${mx - T} ${by + tv * cp} ${mx - T} ${by} `;
      const endX = c === 0 ? bl.x + R : sx;
      d += `L ${endX} ${by} `;
    }
  }

  // Bottom-left corner
  d += `Q ${bl.x} ${bl.y} ${bl.x} ${bl.y - R} `;

  // LEFT edge
  for (let r = rs - 1; r >= 0; r--) {
    const sy = py + r * CH;
    const my = sy + CH / 2;
    const tv = edges.left[r] ?? 0;
    if (tv === 0) {
      const endY = r === 0 ? tl.y + R : sy;
      d += `L ${px} ${endY} `;
    } else {
      d += `L ${px} ${my + T} `;
      d += `C ${px - tv * cp} ${my + T} ${px - tv * cp} ${my - T} ${px} ${my - T} `;
      const endY = r === 0 ? tl.y + R : sy;
      d += `L ${px} ${endY} `;
    }
  }

  // Top-left corner
  d += `Q ${tl.x} ${tl.y} ${tl.x + R} ${tl.y} `;

  return d + "Z";
}
