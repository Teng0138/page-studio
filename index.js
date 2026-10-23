/** Host half of Page Studio; the Client module owns zoom, wallpaper, and the settings page. */
export function apply() {}

/**
 * NOTE (investigated 2026-10-23): a host plugin CANNOT reach Electron main
 * process APIs in DSH. `import('electron')` resolves but the module is an
 * empty shell (keys: ["default","module.exports"]; no BrowserWindow, webContents,
 * ipcMain, app) even though the process is real Electron 44.7.0. DSH therefore
 * blocks native zoom (`webContents.setZoomFactor`) from plugins, which is why
 * Page Studio uses a renderer-side CSS `zoom` compatibility layer instead, and
 * why DSH's isolated WebContentsView surfaces (usage / recharge pages) cannot
 * be zoomed from the plugin side — see client.js isPlatformOverlayViewport.
 */