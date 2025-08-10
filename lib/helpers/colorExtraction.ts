export const adjust = (hex: string, amt: number) => {
  if (!hex) return hex;
  const h = hex.replace('#', '');
  const num = parseInt(
    h.length === 3
      ? h
          .split('')
          .map((c) => c + c)
          .join('')
      : h,
    16
  );
  let r = (num >> 16) + amt;
  let g = ((num >> 8) & 0x00ff) + amt;
  let b = (num & 0x0000ff) + amt;
  r = Math.max(0, Math.min(255, r));
  g = Math.max(0, Math.min(255, g));
  b = Math.max(0, Math.min(255, b));
  return `#${(b | (g << 8) | (r << 16)).toString(16).padStart(6, '0')}`;
};
