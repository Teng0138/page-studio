# Page Studio

A client plugin for the **DeepSeek Harness Web UI** that adds:

- **Page zoom** — zoom the entire interface like a browser page: hold `Ctrl` (or `⌘` on macOS) and scroll the mouse wheel, or use the slider / ＋／－／reset buttons in Settings. The zoom level persists across refreshes.
- **Eye-care wallpaper** — pick a soothing preset (eye-care green, mint, paper, …) or mix your own color with the color picker / hex input. Shades adapt to the active theme and text contrast is adjusted automatically. Choose **Follow theme** to restore the default background.

All UI text is bilingual (English / 简体中文).

![Page Studio](icon.svg)

## Features

### Zoom
| | |
|---|---|
| Shortcut | Hold `Ctrl` (`⌘` on macOS) + mouse wheel |
| Controls | Slider, zoom in / zoom out / reset buttons |
| Levels | 50% – 200% (50, 67, 75, 80, 90, 100, 110, 125, 150, 175, 200) |
| Persistence | Stored in `localStorage`, survives refresh |
| Cleanup | Restores the previous `zoom` when disabled |

It works by applying the CSS `zoom` property to the document root — same feel as native browser zoom, layout reflows, and the whole workspace (including sidebars) scales.

### Wallpaper
- 8 presets: eye-care green, mint, warm paper, apricot, mist grey, mist blue, dusty rose, lavender.
- Custom color via native color picker or hex input.
- Luminance is auto-adapted to the current theme (dark/light) and text contrast is preserved.
- "Follow theme" disables the wallpaper.

## Why floating panels don't drift under zoom

A notorious pitfall with root-level CSS `zoom` is that **floating layers (account menu, tooltips, hovercards, notice stacks) get mispositioned**. The cause is a split in coordinate spaces (verified against Chromium):

- `getBoundingClientRect()` / `getClientRects()` report **visual** pixels (already scaled by the zoom factor).
- `position: fixed` `left/top`, `offsetWidth/offsetHeight` and `window.innerWidth/innerHeight` remain in **layout** pixels.

Harness positions its floating layers by reading the anchor's rect and then writing `left/top` in pixels — mixing the two spaces, so under zoom every popup lands offset by ×zoom.

Page Studio (≥ v1.1.0) fixes this at the source:

1. **Rect compatibility layer** — wraps `Element.prototype.getBoundingClientRect` / `getClientRects` and `Range.prototype.getBoundingClientRect` / `getClientRects` to always report layout pixels (a no-op fast path at 100 % zoom). Every consumer — including Harness's own menu positioning — then works in one consistent space, exactly like native browser zoom.
2. **Re-measure on zoom change** — after the zoom factor changes, synthetic `resize` / `scroll` events are dispatched on `window` so already-open overlays reposition immediately.
3. **Clean restore** — the original prototypes are restored when the plugin is disabled or unloaded.

See `client.js` (`rectCompat` / `installRectCompat` / `restoreRectCompat`) for the implementation.

## Installation

This is a local dev-style plugin bundle for a Harness profile. The profile is a package with a `dsh.profile.bundles` list:

1. Clone this repository anywhere, e.g.

   ```sh
   git clone https://github.com/<your-name>/page-studio.git
   ```

2. In your Harness profile (e.g. `~/.dsh/profiles/<profile>/package.json`), add a `link:` dependency and register the bundle:

   ```jsonc
   {
     "dependencies": {
       // ...
       "@local/page-studio": "link:C:/path/to/page-studio"
     },
     "dsh": {
       "profile": {
         "bundles": [
           // ...
           "@local/page-studio"
         ]
       }
     }
   }
   ```

3. Install the profile dependencies (`pnpm install`), then (re)start Harness.

> The package keeps the `@local/` scope because Harness links it into the profile's `node_modules`; it is not published to npm.

## Usage

1. Open **Settings → Page & Wallpaper** (页面与壁纸).
2. **Zoom** — drag the slider, press the in/out buttons, or hold `Ctrl`/`⌘` and scroll anywhere.
3. **Wallpaper** — pick a preset color, or switch to **Custom** and choose a color (native picker or hex). Select **Follow theme** to disable.

Settings are stored under the `dsh.page-studio.v1` key in `localStorage`.

## Development

```
page-studio/
├── client.js            # client half: zoom + wallpaper + settings page + zoom compat layer
├── index.js             # host half (no-op placeholder)
├── cordis.patch.yml     # bundle registration (- id: page-studio)
├── package.json         # @local/page-studio manifest (dsh.bundle + dsh.client)
├── icon.svg             # plugin icon
└── locale/
    ├── en.json
    └── zh.json
```

- `dsh.bundle.patch` points at `cordis.patch.yml` and registers the bundle.
- `dsh.client.platform: "web"`, `immediately: true` — the client module loads as soon as the UI boots; `inject` declares the client APIs it uses (`dsh-client-ui-settings`, `dsh-client-locale`, `dsh-client-ui-theme`).

## Compatibility

- Requires a Chromium-based renderer (Harness Web UI). CSS `zoom` is standardized in Chromium 128+.
- Tested on Windows (Electron renderer + web frontend).
- The macOS translucent menu *backing* layer (CSS anchor positioning) is left untouched; the layout fix targets the JS-positioned floating layers that the coordinate-space bug affects.

## License

[MIT](LICENSE)