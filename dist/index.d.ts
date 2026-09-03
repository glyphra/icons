import type React from 'react';

export interface GlyphraIconsProps extends React.HTMLAttributes<HTMLSpanElement> {
  icon: string;
  variant?: 'fill' | 'line';
  varient?: 'fill' | 'line';
  stroke?: number | string;
  strokeWidth?: number | string;
  color?: string;
  size?: number | string;
  title?: string;
}
export declare function GlyphraIcons(props: GlyphraIconsProps): React.ReactElement | null;
export declare const glyphraIcons: Record<string, unknown>;
export declare const iconIds: string[];
export declare const variants: readonly ['fill', 'line'];
export default GlyphraIcons;
