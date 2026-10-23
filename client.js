window.__ModuleLoader__.load({
  id: '@local/page-studio',
  factory(require) {
    const React = require('react');
    const h = React.createElement;

    const NS = 'page-studio';
    const STORAGE_KEY = 'dsh.page-studio.v1';
    const THEME_SOURCE = '@local/page-studio';
    const ZOOM_STEPS = [50, 67, 75, 80, 90, 100, 110, 125, 150, 175, 200];
    const DEFAULT_CUSTOM = '#d7ead9';
    const PRESETS = [
      { id: 'eye-green', color: '#cfe6d3', key: 'preset.eyeGreen' },
      { id: 'mint', color: '#d5e9e2', key: 'preset.mint' },
      { id: 'paper', color: '#f1e7d3', key: 'preset.paper' },
      { id: 'apricot', color: '#f5e2ce', key: 'preset.apricot' },
      { id: 'mist', color: '#e4e8e4', key: 'preset.mist' },
      { id: 'sky', color: '#dbe7f0', key: 'preset.sky' },
      { id: 'rose', color: '#f0e0e0', key: 'preset.rose' },
      { id: 'lavender', color: '#e9e2f0', key: 'preset.lavender' },
    ];

    const DICT = {
      en: {
        'section.label': 'Page & Wallpaper',
        'page.title': 'Page zoom & eye-care wallpaper',
        'page.subtitle': 'Make the interface easier to read and long sessions more comfortable.',
        'page.persist': 'Settings are saved in this browser and persist after a refresh.',
        'zoom.title': 'Page zoom',
        'zoom.desc': 'Magnify the entire workspace like a browser page.',
        'zoom.slider': 'Page zoom level',
        'zoom.out': 'Zoom out',
        'zoom.in': 'Zoom in',
        'zoom.reset': 'Reset to 100%',
        'zoom.hint': 'Hold Ctrl (⌘ on macOS) and scroll the mouse wheel to zoom the whole page.',
        'wallpaper.title': 'Eye-care wallpaper',
        'wallpaper.desc': 'Choose a soothing preset or mix your own color.',
        'wallpaper.group': 'Wallpaper color',
        'wallpaper.none': 'Follow theme',
        'wallpaper.custom': 'Custom',
        'wallpaper.customColor': 'Custom color',
        'wallpaper.picker': 'Custom wallpaper color',
        'wallpaper.hex': 'Wallpaper hex color',
        'wallpaper.reset': 'Reset',
        'wallpaper.hint': 'Fills the workspace with your chosen color. The shade is adjusted for the active theme and text contrast adapts automatically.',
        'preset.eyeGreen': 'Eye-care green',
        'preset.mint': 'Mint',
        'preset.paper': 'Warm paper',
        'preset.apricot': 'Apricot',
        'preset.mist': 'Mist grey',
        'preset.sky': 'Mist blue',
        'preset.rose': 'Dusty rose',
        'preset.lavender': 'Lavender',
      },
      zh: {
        'section.label': '页面与壁纸',
        'page.title': '页面缩放与护眼壁纸',
        'page.subtitle': '让界面更易读，也让长时间工作更舒适。',
        'page.persist': '设置保存在当前浏览器中，刷新后依然生效。',
        'zoom.title': '页面缩放',
        'zoom.desc': '像浏览器一样放大或缩小整个工作界面。',
        'zoom.slider': '页面缩放比例',
        'zoom.out': '缩小页面',
        'zoom.in': '放大页面',
        'zoom.reset': '恢复 100%',
        'zoom.hint': '按住 Ctrl（macOS 为 ⌘）并滚动鼠标滚轮，即可缩放整个页面。',
        'wallpaper.title': '护眼壁纸',
        'wallpaper.desc': '选择一款护眼色，或调出自己喜欢的颜色。',
        'wallpaper.group': '壁纸颜色',
        'wallpaper.none': '跟随主题',
        'wallpaper.custom': '自定义',
        'wallpaper.customColor': '自定义颜色',
        'wallpaper.picker': '自定义壁纸颜色',
        'wallpaper.hex': '壁纸颜色十六进制值',
        'wallpaper.reset': '恢复默认',
        'wallpaper.hint': '壁纸会铺满整个工作界面，明度会自动适配当前主题与文字对比度。',
        'preset.eyeGreen': '护眼绿',
        'preset.mint': '薄荷青',
        'preset.paper': '暖米纸',
        'preset.apricot': '杏子黄',
        'preset.mist': '雾灰',
        'preset.sky': '雾蓝',
        'preset.rose': '豆沙粉',
        'preset.lavender': '香芋紫',
      },
    };

    const CSS = `
      .dsh-ps-page {
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        gap: 16px;
        width: 100%;
        max-width: 760px;
        padding: 4px 0 32px;
        color: var(--dsw-alias-label-primary);
        font-family: inherit;
      }
      .dsh-ps-header {
        display: flex;
        align-items: flex-start;
        gap: 14px;
        padding: 0 0 4px;
      }
      .dsh-ps-mark {
        width: 44px;
        height: 44px;
        flex: none;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 0.5px solid var(--dsw-alias-border-l1);
        border-radius: 12px;
        background: var(--dsw-alias-bg-layer-1);
        overflow: hidden;
      }
      .dsh-ps-title {
        margin: 0;
        font-size: 18px;
        line-height: 26px;
        font-weight: 600;
        letter-spacing: -0.01em;
      }
      .dsh-ps-subtitle {
        max-width: 620px;
        margin: 4px 0 0;
        color: var(--dsw-alias-label-secondary);
        font-size: 13px;
        line-height: 20px;
      }
      .dsh-ps-card {
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        gap: 14px;
        padding: 18px;
        border: 0.5px solid var(--dsw-alias-border-l1);
        border-radius: 14px;
        background: var(--dsw-alias-bg-layer-1);
      }
      .dsh-ps-card-head {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: 16px;
      }
      .dsh-ps-card-title {
        margin: 0;
        font-size: 14px;
        line-height: 22px;
        font-weight: 600;
      }
      .dsh-ps-card-desc {
        margin: 2px 0 0;
        color: var(--dsw-alias-label-secondary);
        font-size: 13px;
        line-height: 20px;
      }
      .dsh-ps-zoom-value {
        flex: none;
        color: var(--dsw-alias-label-primary);
        font-size: 28px;
        line-height: 32px;
        font-weight: 600;
        font-variant-numeric: tabular-nums;
        letter-spacing: -0.04em;
      }
      .dsh-ps-zoom-controls {
        display: flex;
        align-items: center;
        gap: 10px;
      }
      .dsh-ps-round {
        width: 32px;
        height: 32px;
        flex: none;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0;
        border: 0.5px solid var(--dsw-alias-border-l2);
        border-radius: 50%;
        background: var(--dsw-alias-bg-layer-2);
        color: var(--dsw-alias-label-primary);
        font: inherit;
        font-size: 18px;
        line-height: 1;
        cursor: pointer;
      }
      .dsh-ps-round:hover:not(:disabled) {
        background: var(--dsw-alias-bg-overlay);
      }
      .dsh-ps-round:disabled {
        opacity: 0.38;
        cursor: default;
      }
      .dsh-ps-range {
        flex: 1;
        min-width: 72px;
        height: 20px;
        margin: 0;
        accent-color: var(--dsw-alias-brand-primary);
        cursor: pointer;
      }
      .dsh-ps-ghost {
        flex: none;
        padding: 6px 10px;
        border: 0.5px solid var(--dsw-alias-border-l1);
        border-radius: 8px;
        background: transparent;
        color: var(--dsw-alias-label-secondary);
        font-family: inherit;
        font-size: 12px;
        line-height: 18px;
        white-space: nowrap;
        cursor: pointer;
      }
      .dsh-ps-ghost:hover:not(:disabled) {
        background: var(--dsw-alias-bg-layer-2);
        color: var(--dsw-alias-label-primary);
      }
      .dsh-ps-ghost:disabled {
        opacity: 0.4;
        cursor: default;
      }
      .dsh-ps-scale {
        display: flex;
        justify-content: space-between;
        margin: -6px 42px 0;
        color: var(--dsw-alias-label-secondary);
        font-size: 11px;
        line-height: 16px;
        opacity: 0.82;
      }
      .dsh-ps-hint {
        margin: 0;
        color: var(--dsw-alias-label-secondary);
        font-size: 12px;
        line-height: 18px;
      }
      .dsh-ps-swatches {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(86px, 1fr));
        gap: 8px;
      }
      .dsh-ps-swatch {
        display: flex;
        flex-direction: column;
        gap: 7px;
        min-width: 0;
        padding: 5px;
        border: 1px solid transparent;
        border-radius: 11px;
        background: transparent;
        color: var(--dsw-alias-label-primary);
        font-family: inherit;
        text-align: center;
        cursor: pointer;
      }
      .dsh-ps-swatch:hover {
        background: var(--dsw-alias-bg-layer-2);
      }
      .dsh-ps-swatch.is-selected {
        border-color: var(--dsw-alias-brand-primary);
        background: var(--dsw-alias-bg-layer-2);
      }
      .dsh-ps-swatch-tile {
        position: relative;
        display: block;
        height: 52px;
        border: 0.5px solid var(--dsw-alias-border-l2);
        border-radius: 8px;
        overflow: hidden;
      }
      .dsh-ps-swatch-tile--none {
        display: flex;
        align-items: center;
        justify-content: center;
        background: linear-gradient(
          135deg,
          var(--dsw-alias-bg-layer-2) 0 50%,
          var(--dsw-alias-bg-overlay) 50% 100%
        );
      }
      .dsh-ps-swatch-none-mark {
        color: var(--dsw-alias-label-secondary);
        font-size: 15px;
        line-height: 1;
        font-weight: 600;
      }
      .dsh-ps-swatch-check {
        position: absolute;
        right: 6px;
        bottom: 6px;
        width: 18px;
        height: 18px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        background: var(--dsw-alias-bg-overlay);
        color: var(--dsw-alias-label-primary);
        box-shadow: 0 0 0 1px var(--dsw-alias-border-l2);
      }
      .dsh-ps-swatch-label {
        overflow: hidden;
        color: var(--dsw-alias-label-secondary);
        font-size: 12px;
        line-height: 17px;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .dsh-ps-swatch.is-selected .dsh-ps-swatch-label {
        color: var(--dsw-alias-label-primary);
      }
      .dsh-ps-custom-row {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        gap: 10px;
        padding-top: 2px;
      }
      .dsh-ps-custom-label {
        color: var(--dsw-alias-label-secondary);
        font-size: 12px;
        line-height: 18px;
      }
      .dsh-ps-color-input {
        width: 34px;
        height: 34px;
        flex: none;
        padding: 0;
        border: 0;
        border-radius: 9px;
        background: transparent;
        overflow: hidden;
        cursor: pointer;
      }
      .dsh-ps-color-input::-webkit-color-swatch-wrapper {
        padding: 0;
      }
      .dsh-ps-color-input::-webkit-color-swatch {
        border: 0.5px solid var(--dsw-alias-border-l2);
        border-radius: 9px;
      }
      .dsh-ps-color-input::-moz-color-swatch {
        border: 0.5px solid var(--dsw-alias-border-l2);
        border-radius: 9px;
      }
      .dsh-ps-hex {
        box-sizing: border-box;
        width: 108px;
        padding: 8px 10px;
        border: 0.5px solid var(--dsw-alias-border-l2);
        border-radius: 8px;
        background: var(--dsw-alias-bg-layer-2);
        color: var(--dsw-alias-label-primary);
        font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
        font-size: 12px;
        line-height: 18px;
      }
      .dsh-ps-footer {
        color: var(--dsw-alias-label-secondary);
        font-size: 11px;
        line-height: 16px;
        opacity: 0.86;
      }
      .dsh-ps-page button:focus-visible,
      .dsh-ps-page input:focus-visible {
        outline: 2px solid var(--dsw-alias-brand-primary);
        outline-offset: 2px;
      }
      @media (max-width: 560px) {
        .dsh-ps-card {
          padding: 14px;
        }
        .dsh-ps-zoom-value {
          font-size: 22px;
          line-height: 26px;
        }
        .dsh-ps-scale {
          margin-left: 42px;
          margin-right: 42px;
        }
        .dsh-ps-swatches {
          grid-template-columns: repeat(3, minmax(0, 1fr));
        }
      }
    `;

    function clamp(value, min, max) {
      return Math.min(max, Math.max(min, value));
    }

    function normalizeHex(input) {
      if (typeof input !== 'string') return null;
      let value = input.trim().toLowerCase();
      if (value.startsWith('#')) value = value.slice(1);
      if (value.length === 3) {
        value = value
          .split('')
          .map((part) => part + part)
          .join('');
      }
      return /^[0-9a-f]{6}$/.test(value) ? '#' + value : null;
    }

    function hexToRgb(hex) {
      const normalized = normalizeHex(hex) || '#000000';
      return {
        r: parseInt(normalized.slice(1, 3), 16),
        g: parseInt(normalized.slice(3, 5), 16),
        b: parseInt(normalized.slice(5, 7), 16),
      };
    }

    function channelHex(value) {
      return Math.round(clamp(value, 0, 255))
        .toString(16)
        .padStart(2, '0');
    }

    function rgbToHex(rgb) {
      return '#' + channelHex(rgb.r) + channelHex(rgb.g) + channelHex(rgb.b);
    }

    function mix(from, to, amount) {
      const a = hexToRgb(from);
      const b = hexToRgb(to);
      const t = clamp(amount, 0, 1);
      return rgbToHex({
        r: a.r + (b.r - a.r) * t,
        g: a.g + (b.g - a.g) * t,
        b: a.b + (b.b - a.b) * t,
      });
    }

    function relativeLuminance(hex) {
      const { r, g, b } = hexToRgb(hex);
      const linear = (channel) => {
        const value = channel / 255;
        return value <= 0.04045 ? value / 12.92 : Math.pow((value + 0.055) / 1.055, 2.4);
      };
      return 0.2126 * linear(r) + 0.7152 * linear(g) + 0.0722 * linear(b);
    }

    function ensureLight(color) {
      let base = color;
      let guard = 0;
      while (relativeLuminance(base) < 0.62 && guard < 24) {
        base = mix(base, '#ffffff', 0.12);
        guard += 1;
      }
      return base;
    }

    function modePalette(color, mode) {
      if (mode === 'dark') {
        const base = mix(color, '#0b0f0d', 0.82);
        const text = '#f2f6f3';
        return {
          '--dsw-alias-bg-base': base,
          '--dsw-alias-bg-layer-1': mix(base, '#ffffff', 0.055),
          '--dsw-alias-bg-layer-2': mix(base, '#ffffff', 0.095),
          '--dsw-alias-bg-overlay': mix(base, '#ffffff', 0.14),
          '--dsw-specific-sidebar-fill': mix(base, '#000000', 0.16),
          '--dsw-alias-border-l1': mix(base, text, 0.16),
          '--dsw-alias-border-l2': mix(base, text, 0.28),
          '--dsw-alias-label-primary': text,
          '--dsw-alias-label-secondary': mix(text, base, 0.16),
        };
      }
      const base = ensureLight(color);
      const text = '#17211b';
      return {
        '--dsw-alias-bg-base': base,
        '--dsw-alias-bg-layer-1': mix(base, '#ffffff', 0.52),
        '--dsw-alias-bg-layer-2': mix(base, '#ffffff', 0.36),
        '--dsw-alias-bg-overlay': mix(base, '#ffffff', 0.84),
        '--dsw-specific-sidebar-fill': mix(base, '#000000', 0.05),
        '--dsw-alias-border-l1': mix(base, text, 0.16),
        '--dsw-alias-border-l2': mix(base, text, 0.28),
        '--dsw-alias-label-primary': text,
        '--dsw-alias-label-secondary': mix(text, base, 0.28),
      };
    }

    function buildThemeOverrides(color) {
      const light = modePalette(color, 'light');
      const dark = modePalette(color, 'dark');
      const tokens = {};
      for (const name of Object.keys(light)) {
        tokens[name] = { light: light[name], dark: dark[name] };
      }
      return tokens;
    }

    function nearestZoomIndex(percent) {
      let best = 0;
      let bestDistance = Infinity;
      ZOOM_STEPS.forEach((value, index) => {
        const distance = Math.abs(value - percent);
        if (distance < bestDistance) {
          best = index;
          bestDistance = distance;
        }
      });
      return best;
    }

    function normalizeZoom(value) {
      const numeric = Number(value);
      if (!Number.isFinite(numeric)) return 100;
      return ZOOM_STEPS[nearestZoomIndex(clamp(numeric, 50, 200))];
    }

    function normalizeWallpaper(value) {
      if (value === 'none' || value === 'custom') return value;
      return PRESETS.some((preset) => preset.id === value) ? value : 'none';
    }

    function colorForWallpaper(wallpaper, custom) {
      if (wallpaper === 'custom') return normalizeHex(custom) || DEFAULT_CUSTOM;
      const preset = PRESETS.find((item) => item.id === wallpaper);
      return preset ? preset.color : null;
    }

    function loadState() {
      let saved = null;
      try {
        const raw = window.localStorage.getItem(STORAGE_KEY);
        if (raw) saved = JSON.parse(raw);
      } catch (error) {
        saved = null;
      }
      const source = saved && typeof saved === 'object' ? saved : {};
      return {
        zoom: normalizeZoom(source.zoom),
        wallpaper: normalizeWallpaper(source.wallpaper),
        custom: normalizeHex(source.custom) || DEFAULT_CUSTOM,
      };
    }

    function CheckIcon() {
      return h(
        'svg',
        {
          viewBox: '0 0 12 12',
          width: 11,
          height: 11,
          'aria-hidden': true,
          focusable: 'false',
        },
        h('path', {
          d: 'M2.2 6.3 4.7 8.8 9.8 3.4',
          fill: 'none',
          stroke: 'currentColor',
          strokeWidth: 1.8,
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
        }),
      );
    }

    function MarkIcon() {
      return h(
        'svg',
        {
          viewBox: '0 0 28 28',
          width: 28,
          height: 28,
          'aria-hidden': true,
          focusable: 'false',
        },
        h('rect', {
          x: 2,
          y: 3,
          width: 24,
          height: 22,
          rx: 6,
          fill: '#d6e9d7',
        }),
        h('path', {
          d: 'M2 18.5 9 11l5.5 5 4.5-4 7 6.5V25H2Z',
          fill: '#a9c9ad',
        }),
        h('circle', {
          cx: 12.5,
          cy: 12,
          r: 5.4,
          fill: '#ffffff',
          stroke: '#245e42',
          strokeWidth: 2,
        }),
        h('path', {
          d: 'M16.6 16.1 21 20.5',
          fill: 'none',
          stroke: '#245e42',
          strokeWidth: 2.1,
          strokeLinecap: 'round',
        }),
        h('path', {
          d: 'M10 12h5M12.5 9.5v5',
          fill: 'none',
          stroke: '#245e42',
          strokeWidth: 1.5,
          strokeLinecap: 'round',
        }),
      );
    }

    function Swatch({ label, color, none, selected, onSelect }) {
      const tileClass = 'dsh-ps-swatch-tile' + (none ? ' dsh-ps-swatch-tile--none' : '');
      return h(
        'button',
        {
          type: 'button',
          className: 'dsh-ps-swatch' + (selected ? ' is-selected' : ''),
          'aria-pressed': selected,
          title: color ? label + ' · ' + color : label,
          onClick: onSelect,
        },
        h(
          'span',
          { className: tileClass, style: color ? { backgroundColor: color } : undefined },
          none ? h('span', { className: 'dsh-ps-swatch-none-mark', 'aria-hidden': true }, 'Aa') : null,
          selected ? h('span', { className: 'dsh-ps-swatch-check' }, h(CheckIcon)) : null,
        ),
        h('span', { className: 'dsh-ps-swatch-label' }, label),
      );
    }

    return {
      inject: ['slots', 'locale', 'theme'],
      apply(ctx) {
        let state = loadState();
        let themeDisposer = null;
        let wheelAccumulator = 0;
        let lastWheelAt = 0;
        const listeners = new Set();

        ctx.effect(() => {
          const disposers = Object.keys(DICT).map((locale) =>
            ctx.locale.register(NS, locale, DICT[locale]),
          );
          return () => {
            for (const dispose of disposers) dispose();
          };
        }, 'page-studio/locale');

        const t = ctx.locale.bind(NS);
        const rootElement = typeof document === 'undefined' ? null : document.documentElement;
        const previousZoom = rootElement ? rootElement.style.getPropertyValue('zoom') : '';
        const previousZoomPriority = rootElement
          ? rootElement.style.getPropertyPriority('zoom')
          : '';

        function save() {
          try {
            window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
          } catch (error) {
            /* A browser with storage disabled still gets working in-memory settings. */
          }
        }

        function emit() {
          for (const listener of listeners) listener();
        }

        function subscribe(listener) {
          listeners.add(listener);
          return () => {
            listeners.delete(listener);
          };
        }

        let zoomFactor = 1;

        function applyZoom() {
          if (!rootElement) return;
          if (state.zoom === 100) {
            rootElement.style.removeProperty('zoom');
            zoomFactor = 1;
          } else {
            rootElement.style.setProperty('zoom', String(state.zoom / 100));
            zoomFactor = state.zoom / 100;
          }
          // DSH positions its floating layers (account menu, tooltips, hovercards,
          // notice stacks) from getBoundingClientRect()/getClientRects() and
          // re-measures on window resize/scroll. CSS `zoom` on the root neither
          // fires those naturally nor changes the panel's layout box, so an
          // already-open overlay keeps its stale position. Synthesize both events
          // so every open overlay re-measures against the new zoom factor.
          if (typeof window !== 'undefined') {
            window.dispatchEvent(new Event('resize'));
            window.dispatchEvent(new Event('scroll'));
          }
        }

        /*
         * CSS `zoom` compatibility layer.
         *
         * Root-level CSS `zoom` scales the paint of the whole document: rect APIs
         * (getBoundingClientRect / getClientRects) then report *visual* pixels
         * (×zoom), while `position: fixed` left/top offsets, offsetWidth/
         * offsetHeight, window.innerWidth/innerHeight and fixed-element layout stay
         * in *layout* pixels. DSH positions its floating layers with code that
         * mixes those spaces (rect → px), so under zoom they land offset by the
         * zoom factor. Wrapping the rect APIs to always report layout pixels makes
         * every consumer consistent — equivalent to native browser zoom.
         */
        const rectCompat = {
          elementRect: null,
          elementRects: null,
          rangeRect: null,
          rangeRects: null,
        };
        let rectCompatInstalled = false;

        function unzoomRect(rect) {
          if (!rect || zoomFactor === 1) return rect;
          return new DOMRect(
            rect.x / zoomFactor,
            rect.y / zoomFactor,
            rect.width / zoomFactor,
            rect.height / zoomFactor,
          );
        }

        function unzoomRectList(list) {
          if (zoomFactor === 1) return list;
          const items = Array.from(list, unzoomRect);
          items.item = (index) => items[index] ?? null;
          return items;
        }

        function installRectCompat() {
          if (rectCompatInstalled || typeof Element === 'undefined') return;
          rectCompat.elementRect = Element.prototype.getBoundingClientRect;
          rectCompat.elementRects = Element.prototype.getClientRects;
          Element.prototype.getBoundingClientRect = function getBoundingClientRectCompat() {
            return unzoomRect(rectCompat.elementRect.call(this));
          };
          Element.prototype.getClientRects = function getClientRectsCompat() {
            return unzoomRectList(rectCompat.elementRects.call(this));
          };
          if (typeof Range !== 'undefined') {
            rectCompat.rangeRect = Range.prototype.getBoundingClientRect;
            rectCompat.rangeRects = Range.prototype.getClientRects;
            Range.prototype.getBoundingClientRect = function getBoundingClientRectCompat() {
              return unzoomRect(rectCompat.rangeRect.call(this));
            };
            Range.prototype.getClientRects = function getClientRectsCompat() {
              return unzoomRectList(rectCompat.rangeRects.call(this));
            };
          }
          rectCompatInstalled = true;
        }

        function restoreRectCompat() {
          if (!rectCompatInstalled || typeof Element === 'undefined') return;
          if (rectCompat.elementRect) {
            Element.prototype.getBoundingClientRect = rectCompat.elementRect;
          }
          if (rectCompat.elementRects) {
            Element.prototype.getClientRects = rectCompat.elementRects;
          }
          if (typeof Range !== 'undefined') {
            if (rectCompat.rangeRect) {
              Range.prototype.getBoundingClientRect = rectCompat.rangeRect;
            }
            if (rectCompat.rangeRects) {
              Range.prototype.getClientRects = rectCompat.rangeRects;
            }
          }
          rectCompatInstalled = false;
        }

        /*
         * Viewport-read compatibility.
         *
         * Root-level CSS `zoom` keeps the layout viewport at its full size, so
         * window.innerWidth/innerHeight (and clientWidth/clientHeight) still
         * report layout pixels. Code that anchors floating widgets to the
         * *visible* edges (e.g. corner mascots that compute `right = vp.w - w`
         * and re-position on resize) then lands off-screen when zoomed in —
         * under native browser zoom those APIs report the *visible* size
         * (innerWidth == layoutWidth / zoom). Expose the same semantics here:
         * viewport reads divide by the zoom factor while zoom != 1, so
         * resize-driven re-positioning (the whale's settle(), DSH menu clamps)
         * keeps everything inside the visible area, like native zoom.
         */
        const viewportNative = {
          innerWidth: null,
          innerHeight: null,
          clientWidth: null,
          clientHeight: null,
        };
        let viewportPatched = false;

        function viewportRead(getter, receiver) {
          const value = getter.call(receiver);
          return zoomFactor === 1 ? value : value / zoomFactor;
        }

        function installViewportPatch() {
          if (viewportPatched || typeof window === 'undefined' || !rootElement) return;
          const windowDesc = (key) =>
            Object.getOwnPropertyDescriptor(window, key) ||
            Object.getOwnPropertyDescriptor(Window.prototype, key);
          const elementDesc = (key) => Object.getOwnPropertyDescriptor(Element.prototype, key);

          try {
            const iw = windowDesc('innerWidth');
            if (iw && typeof iw.get === 'function') {
              viewportNative.innerWidth = iw.get;
              Object.defineProperty(window, 'innerWidth', {
                configurable: true,
                get() {
                  return viewportRead(viewportNative.innerWidth, window);
                },
              });
            }
            const ih = windowDesc('innerHeight');
            if (ih && typeof ih.get === 'function') {
              viewportNative.innerHeight = ih.get;
              Object.defineProperty(window, 'innerHeight', {
                configurable: true,
                get() {
                  return viewportRead(viewportNative.innerHeight, window);
                },
              });
            }
            const cw = elementDesc('clientWidth');
            if (cw && typeof cw.get === 'function') {
              viewportNative.clientWidth = cw.get;
              Object.defineProperty(rootElement, 'clientWidth', {
                configurable: true,
                get() {
                  return viewportRead(viewportNative.clientWidth, rootElement);
                },
              });
            }
            const ch = elementDesc('clientHeight');
            if (ch && typeof ch.get === 'function') {
              viewportNative.clientHeight = ch.get;
              Object.defineProperty(rootElement, 'clientHeight', {
                configurable: true,
                get() {
                  return viewportRead(viewportNative.clientHeight, rootElement);
                },
              });
            }
          } catch (error) {
            /* Some hosts lock these properties; degrade gracefully. */
          }
          viewportPatched = true;
        }

        function restoreViewportPatch() {
          if (!viewportPatched) return;
          /*
           * Restore with defineProperty, not delete. In real Blink, innerWidth/
           * innerHeight are OWN properties of the window object (not on
           * Window.prototype), so `delete window.innerWidth` permanently removes
           * the property and leaves it undefined. Reinstalling the saved native
           * getter always restores the original accessor regardless of whether
           * it lived on the instance or a prototype.
           */
          if (typeof window !== 'undefined') {
            if (viewportNative.innerWidth) {
              Object.defineProperty(window, 'innerWidth', {
                configurable: true,
                get: viewportNative.innerWidth,
              });
            }
            if (viewportNative.innerHeight) {
              Object.defineProperty(window, 'innerHeight', {
                configurable: true,
                get: viewportNative.innerHeight,
              });
            }
          }
          if (rootElement) {
            if (viewportNative.clientWidth) {
              Object.defineProperty(rootElement, 'clientWidth', {
                configurable: true,
                get: viewportNative.clientWidth,
              });
            }
            if (viewportNative.clientHeight) {
              Object.defineProperty(rootElement, 'clientHeight', {
                configurable: true,
                get: viewportNative.clientHeight,
              });
            }
          }
          viewportPatched = false;
        }

        /*
         * Event-coordinate compatibility.
         *
         * Under root CSS zoom, real-browser measurement (headless Chrome, CDP
         * Input.dispatchMouseEvent) shows pointer coordinates are *visual*:
         * clicking the visual center of an element reports clientX == the
         * element's visual rect.left + w/2, and document.elementFromPoint()
         * resolves against the same visual paint. The rect patch above makes
         * getBoundingClientRect() report *layout* pixels, so widgets that do
         * hit-testing with `clientX - rect.left` (the whale widget's
         * isWhaleHit, usage bars, drag math) mix the two spaces and land in the
         * wrong place. Patch event coordinates to layout pixels as well so
         * `event - rect` math stays consistent.
         *
         * document.elementFromPoint(x, y) is the reverse case: callers pass the
         * (now-layout) coordinates, but the native API resolves them against the
         * visual paint, so the patch translates layout -> visual for it.
         *
         * NOTE: the saved native getters must be kept in DISTINCT slots (mouseX/
         * mouseY vs touchX/touchY). MouseEvent and Touch both own a native
         * clientX getter that requires its own instance type as `this`; storing
         * both under the same key made mouse events read the Touch getter and
         * return undefined, disabling every pointer interaction globally.
         */
        const eventNative = {
          mouseX: null,
          mouseY: null,
          touchX: null,
          touchY: null,
          elementFromPoint: null,
        };
        let eventPatched = false;

        function eventCoordRead(getter, receiver) {
          const value = getter.call(receiver);
          return zoomFactor === 1 ? value : value / zoomFactor;
        }

        /*
         * Patch one event-coordinate getter onto a prototype. `slot` is the key
         * in `eventNative` that stores the ORIGINAL getter — it must be distinct
         * per (prototype, property) pair: MouseEvent and Touch both expose
         * clientX, and their native getters require their own instance type as
         * `this`, so mixing the saved getters would make reads return undefined
         * for one of the two event kinds.
         */
        function patchEventGetter(proto, key, slot) {
          const desc = Object.getOwnPropertyDescriptor(proto, key);
          if (!desc || typeof desc.get !== 'function') return;
          eventNative[slot] = desc.get;
          Object.defineProperty(proto, key, {
            configurable: true,
            get() {
              return eventCoordRead(eventNative[slot], this);
            },
          });
        }

        function restoreEventGetter(proto, key, slot) {
          if (!eventNative[slot]) return;
          Object.defineProperty(proto, key, {
            configurable: true,
            get: eventNative[slot],
          });
        }

        function installEventPatch() {
          if (eventPatched || typeof window === 'undefined') return;
          try {
            if (typeof MouseEvent !== 'undefined' && MouseEvent.prototype) {
              patchEventGetter(MouseEvent.prototype, 'clientX', 'mouseX');
              patchEventGetter(MouseEvent.prototype, 'clientY', 'mouseY');
            }
            if (typeof Touch !== 'undefined' && Touch.prototype) {
              patchEventGetter(Touch.prototype, 'clientX', 'touchX');
              patchEventGetter(Touch.prototype, 'clientY', 'touchY');
            }
            if (
              typeof Document !== 'undefined' &&
              Document.prototype &&
              typeof Document.prototype.elementFromPoint === 'function'
            ) {
              eventNative.elementFromPoint = Document.prototype.elementFromPoint;
              Document.prototype.elementFromPoint = function elementFromPointCompat(x, y) {
                if (zoomFactor === 1) {
                  return eventNative.elementFromPoint.call(this, x, y);
                }
                return eventNative.elementFromPoint.call(this, x * zoomFactor, y * zoomFactor);
              };
            }
          } catch (error) {
            /* Some hosts lock these properties; degrade gracefully. */
          }
          eventPatched = true;
        }

        function restoreEventPatch() {
          if (!eventPatched) return;
          if (typeof MouseEvent !== 'undefined' && MouseEvent.prototype) {
            restoreEventGetter(MouseEvent.prototype, 'clientX', 'mouseX');
            restoreEventGetter(MouseEvent.prototype, 'clientY', 'mouseY');
          }
          if (typeof Touch !== 'undefined' && Touch.prototype) {
            restoreEventGetter(Touch.prototype, 'clientX', 'touchX');
            restoreEventGetter(Touch.prototype, 'clientY', 'touchY');
          }
          if (eventNative.elementFromPoint && typeof Document !== 'undefined') {
            Document.prototype.elementFromPoint = eventNative.elementFromPoint;
          }
          eventPatched = false;
        }

        function applyWallpaper() {
          if (themeDisposer) {
            themeDisposer();
            themeDisposer = null;
          }
          const color = colorForWallpaper(state.wallpaper, state.custom);
          if (!color) return;
          try {
            themeDisposer = ctx.theme.overrideTokens(THEME_SOURCE, buildThemeOverrides(color));
          } catch (error) {
            console.error('[page-studio] Could not apply the wallpaper palette.', error);
          }
        }

        function updateState(patch, apply) {
          state = Object.assign({}, state, patch);
          save();
          apply();
          emit();
        }

        function setZoom(value) {
          const next = normalizeZoom(value);
          if (next === state.zoom) return;
          updateState({ zoom: next }, applyZoom);
        }

        function stepZoom(direction) {
          const currentIndex = nearestZoomIndex(state.zoom);
          const nextIndex = clamp(currentIndex + direction, 0, ZOOM_STEPS.length - 1);
          setZoom(ZOOM_STEPS[nextIndex]);
        }

        function setWallpaper(wallpaper) {
          const next = normalizeWallpaper(wallpaper);
          if (next === state.wallpaper) return;
          updateState({ wallpaper: next }, applyWallpaper);
        }

        function setCustomColor(value) {
          const next = normalizeHex(value);
          if (!next) return;
          if (state.custom === next && state.wallpaper === 'custom') return;
          updateState({ custom: next, wallpaper: 'custom' }, applyWallpaper);
        }

        function handleWheel(event) {
          if (!(event.ctrlKey || event.metaKey) || event.altKey) return;
          const delta = -event.deltaY;
          if (!delta) return;
          event.preventDefault();
          event.stopPropagation();

          const now = Date.now();
          if (now - lastWheelAt > 260) wheelAccumulator = 0;
          lastWheelAt = now;

          const unit = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? 100 : 1;
          wheelAccumulator += delta * unit;
          if (Math.abs(wheelAccumulator) < 36) return;

          stepZoom(wheelAccumulator > 0 ? 1 : -1);
          wheelAccumulator = 0;
        }

        function useStudioState() {
          const [, setRevision] = React.useState(0);
          React.useEffect(() => {
            const offStore = subscribe(() => setRevision((value) => value + 1));
            const offLocale = ctx.locale.subscribe(() => setRevision((value) => value + 1));
            return () => {
              offStore();
              offLocale();
            };
          }, []);
          return state;
        }

        function CustomColorField() {
          const [draft, setDraft] = React.useState(state.custom);

          React.useEffect(() => {
            setDraft(state.custom);
          }, [state.custom]);

          function commit() {
            const next = normalizeHex(draft);
            if (next) {
              setCustomColor(next);
              setDraft(next);
            } else {
              setDraft(state.custom);
            }
          }

          return h(
            'div',
            { className: 'dsh-ps-custom-row' },
            h('span', { className: 'dsh-ps-custom-label' }, t('wallpaper.customColor')),
            h('input', {
              type: 'color',
              className: 'dsh-ps-color-input',
              value: state.custom,
              'aria-label': t('wallpaper.picker'),
              onChange: (event) => setCustomColor(event.target.value),
            }),
            h('input', {
              type: 'text',
              className: 'dsh-ps-hex',
              value: draft,
              maxLength: 7,
              spellCheck: false,
              'aria-label': t('wallpaper.hex'),
              onChange: (event) => setDraft(event.target.value),
              onBlur: commit,
              onKeyDown: (event) => {
                if (event.key === 'Enter') {
                  event.preventDefault();
                  commit();
                } else if (event.key === 'Escape') {
                  setDraft(state.custom);
                  event.currentTarget.blur();
                }
              },
            }),
          );
        }

        function StudioPage() {
          const current = useStudioState();
          const zoomIndex = nearestZoomIndex(current.zoom);
          const zoomMin = zoomIndex <= 0;
          const zoomMax = zoomIndex >= ZOOM_STEPS.length - 1;

          return h(
            'div',
            { className: 'dsh-ps-page' },
            h('style', null, CSS),
            h(
              'header',
              { className: 'dsh-ps-header' },
              h('div', { className: 'dsh-ps-mark' }, h(MarkIcon)),
              h(
                'div',
                null,
                h('h1', { className: 'dsh-ps-title' }, t('page.title')),
                h('p', { className: 'dsh-ps-subtitle' }, t('page.subtitle')),
              ),
            ),
            h(
              'section',
              { className: 'dsh-ps-card', 'aria-labelledby': 'dsh-ps-zoom-title' },
              h(
                'div',
                { className: 'dsh-ps-card-head' },
                h(
                  'div',
                  null,
                  h(
                    'h2',
                    { id: 'dsh-ps-zoom-title', className: 'dsh-ps-card-title' },
                    t('zoom.title'),
                  ),
                  h('p', { className: 'dsh-ps-card-desc' }, t('zoom.desc')),
                ),
                h(
                  'div',
                  { className: 'dsh-ps-zoom-value', 'aria-live': 'polite' },
                  current.zoom + '%',
                ),
              ),
              h(
                'div',
                { className: 'dsh-ps-zoom-controls' },
                h(
                  'button',
                  {
                    type: 'button',
                    className: 'dsh-ps-round',
                    'aria-label': t('zoom.out'),
                    title: t('zoom.out'),
                    disabled: zoomMin,
                    onClick: () => stepZoom(-1),
                  },
                  '−',
                ),
                h('input', {
                  type: 'range',
                  className: 'dsh-ps-range',
                  min: 0,
                  max: ZOOM_STEPS.length - 1,
                  step: 1,
                  value: zoomIndex,
                  'aria-label': t('zoom.slider'),
                  'aria-valuetext': current.zoom + '%',
                  onChange: (event) => setZoom(ZOOM_STEPS[Number(event.target.value)]),
                }),
                h(
                  'button',
                  {
                    type: 'button',
                    className: 'dsh-ps-round',
                    'aria-label': t('zoom.in'),
                    title: t('zoom.in'),
                    disabled: zoomMax,
                    onClick: () => stepZoom(1),
                  },
                  '+',
                ),
                h(
                  'button',
                  {
                    type: 'button',
                    className: 'dsh-ps-ghost',
                    disabled: current.zoom === 100,
                    onClick: () => setZoom(100),
                  },
                  t('zoom.reset'),
                ),
              ),
              h(
                'div',
                { className: 'dsh-ps-scale', 'aria-hidden': true },
                h('span', null, '50%'),
                h('span', null, '100%'),
                h('span', null, '200%'),
              ),
              h('p', { className: 'dsh-ps-hint' }, t('zoom.hint')),
            ),
            h(
              'section',
              { className: 'dsh-ps-card', 'aria-labelledby': 'dsh-ps-wallpaper-title' },
              h(
                'div',
                { className: 'dsh-ps-card-head' },
                h(
                  'div',
                  null,
                  h(
                    'h2',
                    { id: 'dsh-ps-wallpaper-title', className: 'dsh-ps-card-title' },
                    t('wallpaper.title'),
                  ),
                  h('p', { className: 'dsh-ps-card-desc' }, t('wallpaper.desc')),
                ),
                h(
                  'button',
                  {
                    type: 'button',
                    className: 'dsh-ps-ghost',
                    disabled: current.wallpaper === 'none',
                    onClick: () => setWallpaper('none'),
                  },
                  t('wallpaper.reset'),
                ),
              ),
              h(
                'div',
                {
                  className: 'dsh-ps-swatches',
                  role: 'group',
                  'aria-label': t('wallpaper.group'),
                },
                h(Swatch, {
                  key: 'none',
                  label: t('wallpaper.none'),
                  none: true,
                  selected: current.wallpaper === 'none',
                  onSelect: () => setWallpaper('none'),
                }),
                PRESETS.map((preset) =>
                  h(Swatch, {
                    key: preset.id,
                    label: t(preset.key),
                    color: preset.color,
                    selected: current.wallpaper === preset.id,
                    onSelect: () => setWallpaper(preset.id),
                  }),
                ),
                h(Swatch, {
                  key: 'custom',
                  label: t('wallpaper.custom'),
                  color: current.custom,
                  selected: current.wallpaper === 'custom',
                  onSelect: () => setCustomColor(current.custom),
                }),
              ),
              h(CustomColorField, null),
              h('p', { className: 'dsh-ps-hint' }, t('wallpaper.hint')),
            ),
            h('div', { className: 'dsh-ps-footer' }, t('page.persist')),
          );
        }

        ctx.effect(() => {
          installRectCompat();
          installViewportPatch();
          installEventPatch();
          applyZoom();
          return () => {
            restoreRectCompat();
            restoreViewportPatch();
            restoreEventPatch();
            if (!rootElement) return;
            if (previousZoom) {
              rootElement.style.setProperty('zoom', previousZoom, previousZoomPriority);
            } else {
              rootElement.style.removeProperty('zoom');
            }
          };
        }, 'page-studio/zoom');

        ctx.effect(() => {
          applyWallpaper();
          return () => {
            if (themeDisposer) {
              themeDisposer();
              themeDisposer = null;
            }
          };
        }, 'page-studio/wallpaper');

        ctx.effect(() => {
          window.addEventListener('wheel', handleWheel, { capture: true, passive: false });
          return () => {
            window.removeEventListener('wheel', handleWheel, true);
          };
        }, 'page-studio/wheel-zoom');

        ctx.slots.inject('settings.section', () =>
          ctx.slots.register(
            {
              name: 'settings.section',
              id: 'page-studio',
              order: 5,
              label: () => t('section.label'),
            },
            StudioPage,
          ),
        );
      },
    };
  },
});
