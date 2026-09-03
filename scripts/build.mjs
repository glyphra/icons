import { mkdir, cp, readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const packageRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dist = resolve(packageRoot, 'dist');
const sourceMap = resolve(packageRoot, 'icons-map.json');
const iconMap = JSON.parse(await readFile(sourceMap, 'utf8'));

await mkdir(dist, { recursive: true });
await cp(resolve(packageRoot, 'src', 'GlyphraIcons.js'), resolve(dist, 'GlyphraIcons.js'));
await cp(resolve(packageRoot, 'src', 'index.js'), resolve(dist, 'index.js'));
await cp(sourceMap, resolve(dist, 'icons-map.json'));
await writeFile(resolve(dist, 'index.d.ts'), `import type React from 'react';

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
`);
console.log(`Built ${iconMap.counts.icons} icons and ${iconMap.counts.variants} variants.`);