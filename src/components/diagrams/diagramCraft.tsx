import type { ReactNode } from 'react';

/** Night-garage shop-manual palette */
export const C = {
  void: '#0a0908',
  floor: '#141210',
  grid: 'rgba(245, 197, 24, 0.04)',
  paint: '#4a5560',
  paintDark: '#323c46',
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
  mono: 'IBM Plex Mono, monospace',
  display: 'Bebas Neue, sans-serif',
};

export function DiagramBg({
  w = 400,
  h = 320,
  children,
}: {
  w?: number;
  h?: number;
  children: ReactNode;
}) {
  const id = `grid-${w}-${h}`;
  return (
    <>
      <defs>
        <pattern id={id} width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke={C.grid} strokeWidth="0.5" />
        </pattern>
        <linearGradient id="floor-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1a1814" />
          <stop offset="100%" stopColor={C.void} />
        </linearGradient>
      </defs>
      <rect width={w} height={h} fill="url(#floor-grad)" />
      <rect width={w} height={h} fill={`url(#${id})`} />
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

/** Dimension / callout leader line */
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
  const stroke = danger ? C.danger : active ? C.caution : C.labelDim;
  return (
    <g className={active ? 'diagram-leader diagram-leader--active' : 'diagram-leader'}>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={stroke} strokeWidth={active ? 1.5 : 1} />
      <circle cx={x1} cy={y1} r={active ? 4 : 2.5} fill={stroke} />
      <text
        x={x2}
        y={y2}
        fill={stroke}
        fontSize={8}
        fontFamily={C.mono}
        letterSpacing="0.05em"
      >
        {label}
      </text>
    </g>
  );
}

export function HazardMark({
  x,
  y,
  label,
  type = 'danger',
}: {
  x: number;
  y: number;
  label: string;
  type?: 'danger' | 'caution';
}) {
  const fill = type === 'danger' ? C.danger : C.caution;
  return (
    <g>
      <polygon
        points={`${x},${y - 10} ${x + 9},${y + 6} ${x - 9},${y + 6}`}
        fill={fill}
        opacity={0.9}
      />
      <text x={x} y={y + 2} textAnchor="middle" fill={C.void} fontSize={8} fontWeight="bold">
        !
      </text>
      <ShopLabel x={x} y={y + 18} size={7} fill={fill}>
        {label}
      </ShopLabel>
    </g>
  );
}
