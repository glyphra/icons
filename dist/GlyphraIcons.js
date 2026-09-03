import React from 'react';
import icons from '../dist/icons-map.json' with { type: 'json' };

const DEFAULT_VARIANT = 'fill';

export function GlyphraIcons({
  icon,
  variant,
  varient,
  stroke,
  strokeWidth,
  color,
  size,
  className,
  title,
  ...props
}) {
  const selectedVariant = variant || varient || DEFAULT_VARIANT;
  const definition = icons.icons[icon]?.variants[selectedVariant];

  if (!definition) return null;

  let svg = definition.svg
    .replace(/<svg\b/, '<svg width="1em" height="1em"')
    .replace(/\s(width|height)="[^"]*"/g, '')
    .replace(/<svg width="1em" height="1em"/, '<svg width="1em" height="1em"');
  const resolvedStrokeWidth = stroke != null ? stroke : strokeWidth;
  if (resolvedStrokeWidth != null) {
    svg = svg.replace(/stroke-width="[^"]*"/g, `stroke-width="${escapeAttribute(resolvedStrokeWidth)}"`);
  }
  if (size != null) {
    const safeSize = escapeAttribute(size);
    svg = svg.replace('<svg width="1em" height="1em"', `<svg width="${safeSize}" height="${safeSize}"`);
  }

  const classes = ['glyphra-icon', `glyphra-icon-${icon}-${selectedVariant}`, className]
    .filter(Boolean)
    .join(' ');
  const style = color ? { ...props.style, color } : props.style;
  const labelledSvg = title
    ? svg.replace('</svg>', `<title>${escapeTitle(title)}</title></svg>`)
    : svg;

  return React.createElement('span', {
    ...props,
    className: classes,
    style,
    title,
    dangerouslySetInnerHTML: { __html: labelledSvg }
  });
}

function escapeTitle(value) {
  return escapeAttribute(value);
}

function escapeAttribute(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

export const glyphraIcons = icons;
export const iconIds = Object.keys(icons.icons);
export const variants = ['fill', 'line'];
export default GlyphraIcons;