# @glyphra/icons

## React and Next.js

```jsx
import { GlyphraIcons } from '@glyphra/icons';

<GlyphraIcons icon="heart" variant="line" stroke={2} color="#e5484d" size={32} />
```

`varient` is also accepted for compatibility with the original API. `stroke` controls line width, while `color` controls the SVG color. `strokeWidth` remains available as an alias. Size and color can also be controlled with normal CSS:

```css
.glyphra-icon { font-size: 24px; color: #e5484d; }
```

## Plain HTML

```html
<script src="https://cdn.example.com/@glyphra/icons/import.js"></script>
<i class="glyphra-icon" data-icon="heart" data-varient="line" data-stroke="2" data-size="32px" style="color: #e5484d"></i>
```

The loader fetches the matching SVG from the same package URL. Set `data-icon` and `data-varient` (or `data-variant`) to select an icon. Set `data-stroke` (or the legacy `data-stroke-width`) to change line width and `data-size` to set dimensions; CSS `color` controls SVG color through `currentColor`. The older `glyphra-icon-{icon}-{variant}` class form remains supported.

## Browse the icon library

Open `browse.html` from the package on any CDN. It loads `./dist/icons-map.json` relative to its own URL, so the same file works with npm CDNs such as unpkg and jsDelivr:

```text
https://unpkg.com/@glyphra/icons@0.1.0/browse.html
https://cdn.jsdelivr.net/npm/@glyphra/icons@0.1.0/browse.html
```

The browser supports searching, category filtering, fill/line variants, color, size, stroke width, and copying SVG markup.

## Build

Run `npm run build` from this directory before publishing. The package includes `svg/`, `dist/`, and `import.js`.