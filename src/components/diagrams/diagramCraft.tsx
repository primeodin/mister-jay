import type { ReactNode } from 'react';

/** Night-garage shop-manual palette */
export const C = {
  void: '#0a0908',
  floor: '#141210',
  grid: 'rgba(245, 197, 24, 0.04)',
  paint: '#4a5560',
  paintDark: '#323c46',
  paintLight: '#5a6570',
  glass: '#8ab0d0',
  steel: '#6a7078',
  rubber: '#1a1a1a',
  rim: '#9098a0',
  caution: '#f5c518',
  cautionDim: '#b8860b',
  danger: '#d42020',
  dangerGlow: '#ff4444',
  success: '#4a7c59',
  label: '#c8ccd0',
  labelDim: '#8a9098',
  porcelain: '#d8d4cc',
  chrome: '#a8adb4',
  mono: 'IBM Plex Mono, monospace',
  display: 'Bebas Neue, sans-serif',
};

/** Standard diagram canvas with safe margins (prevents fold clipping) */
export const CANVAS = { w: 400, h: 320, padX: 12, padY: 16 };
export const VIEW_BOX = `0 0 ${CANVAS.w} ${CANVAS.h}`;

export function DiagramDefs({ id }: { id: string }) {
  const gid = `dg-${id}`;
  return (
    <defs>
      <pattern id={`${gid}-grid`} width="20" height="20" patternUnits="userSpaceOnUse">
        <path d="M 20 0 L 0 0 0 20" fill="none" stroke={C.grid} strokeWidth="0.5" />
      </pattern>
      <linearGradient id={`${gid}-floor`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#1a1814" />
        <stop offset="100%" stopColor={C.void} />
      </linearGradient>
      <linearGradient id={`${gid}-paint`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor={C.paintLight} />
        <stop offset="100%" stopColor={C.paintDark} />
      </linearGradient>
      <linearGradient id={`${gid}-rubber`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#2a2a2a" />
        <stop offset="100%" stopColor={C.rubber} />
      </linearGradient>
      <linearGradient id={`${gid}-porcelain`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#e4e0d8" />
        <stop offset="100%" stopColor="#c8c4bc" />
      </linearGradient>
      <linearGradient id={`${gid}-panel`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#d4ccc0" />
        <stop offset="100%" stopColor="#b8b0a4" />
      </linearGradient>
      <linearGradient id={`${gid}-inner`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#2e2e2e" />
        <stop offset="100%" stopColor="#1a1a1a" />
      </linearGradient>
      <filter id={`${gid}-shadow`} x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#000" floodOpacity="0.45" />
      </filter>
    </defs>
  );
}

export function DiagramBg({
  id = 'main',
  w = CANVAS.w,
  h = CANVAS.h,
  children,
}: {
  id?: string;
  w?: number;
  h?: number;
  children: ReactNode;
}) {
  const gid = `dg-${id}`;
  return (
    <>
      <DiagramDefs id={id} />
      <rect width={w} height={h} fill={`url(#${gid}-floor)`} />
      <rect width={w} height={h} fill={`url(#${gid}-grid)`} />
      {children}
    </>
  );
}

export function ShopLabel({
  x,
  y,
  children,
  anchor = 'middle',
  size = 9,
  fill = C.labelDim,
}: {
  x: number;
  y: number;
  children: ReactNode;
  anchor?: 'start' | 'middle' | 'end';
  size?: number;
  fill?: string;
}) {
  return (
    <text
      x={x}
      y={y}
      textAnchor={anchor}
      fill={fill}
      fontSize={size}
      fontFamily={C.mono}
      letterSpacing="0.06em"
    >
      {children}
    </text>
  );
}

export function TitleStamp({
  x,
  y,
  children,
}: {
  x: number;
  y: number;
  children: ReactNode;
}) {
  return (
    <text
      x={x}
      y={y}
      textAnchor="middle"
      fill={C.caution}
      fontSize={11}
      fontFamily={C.display}
      letterSpacing="0.12em"
    >
      {children}
    </text>
  );
}

export function HazardMark({
  x,
  y,
  label,
  type = 'danger',
  compact = false,
}: {
  x: number;
  y: number;
  label: string;
  type?: 'danger' | 'caution';
  compact?: boolean;
}) {
  const fill = type === 'danger' ? C.danger : C.caution;
  const sz = compact ? 7 : 9;
  return (
    <g>
      <polygon
        points={`${x},${y - sz} ${x + sz},${y + sz * 0.7} ${x - sz},${y + sz * 0.7}`}
        fill={fill}
        opacity={0.92}
      />
      <text x={x} y={y + 1} textAnchor="middle" fill={C.void} fontSize={7} fontWeight="bold">
        !
      </text>
      <ShopLabel x={x} y={y + sz + 10} size={6} fill={fill}>
        {label}
      </ShopLabel>
    </g>
  );
}

/** Shared breaker panel enclosure art */
export function BreakerEnclosure({
  x,
  y,
  w,
  h,
  gid,
  showDirectory = true,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  gid: string;
  showDirectory?: boolean;
}) {
  return (
    <g filter={`url(#dg-${gid}-shadow)`}>
      <rect x={x} y={y} width={w} height={h} rx="3" fill={`url(#dg-${gid}-panel)`} stroke="#666" strokeWidth="2" />
      <rect x={x + 10} y={y + 10} width={w - 20} height={h - 20} rx="2" fill={`url(#dg-${gid}-inner)`} stroke="#444" strokeWidth="1" />
      {showDirectory && (
        <>
          <rect x={x + 20} y={y + h - 28} width={72} height={16} rx="1" fill="#f5f0e8" opacity="0.12" stroke="#888" strokeDasharray="2 2" />
          <ShopLabel x={x + 56} y={y + h - 16} size={6}>
            DIRECTORY
          </ShopLabel>
        </>
      )}
    </g>
  );
}

export function Leader({
  x1,
  y1,
  x2,
  y2,
  label,
  active = false,
  danger = false,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  label: string;
  active?: boolean;
  danger?: boolean;
}) {
  const stroke = danger ? C.danger : C.caution;
  return (
    <g className={active ? 'diagram-leader--active' : undefined} opacity={active ? 1 : 0.65}>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={stroke} strokeWidth="1" strokeDasharray={active ? undefined : '3 2'} />
      <circle cx={x1} cy={y1} r="2.5" fill={stroke} />
      <text
        x={x2}
        y={y2}
        textAnchor="middle"
        fill={stroke}
        fontSize={7}
        fontFamily={C.mono}
        letterSpacing="0.06em"
      >
        {label}
      </text>
    </g>
  );
}

export function BreakerToggle({
  x,
  y,
  label,
  tripped = false,
  gid: _gid,
}: {
  x: number;
  y: number;
  label: string;
  tripped?: boolean;
  gid: string;
}) {
  return (
    <g>
      <rect x={x} y={y} width="38" height="42" rx="2" fill="#333" stroke="#555" strokeWidth="1" />
      <rect
        x={x + 14}
        y={tripped ? y + 20 : y + 10}
        width="10"
        height="14"
        rx="1"
        fill={tripped ? C.caution : '#ccc'}
      />
      <ShopLabel x={x + 19} y={y + 52} size={7} fill={tripped ? C.caution : C.labelDim}>
        {label}
      </ShopLabel>
    </g>
  );
}
