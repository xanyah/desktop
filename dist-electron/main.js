"use strict";
const path = require("path");
const require$$0 = require("electron");
var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
var dist = { exports: {} };
var hasRequiredDist;
function requireDist() {
  if (hasRequiredDist) return dist.exports;
  hasRequiredDist = 1;
  (function(module, exports) {
    !function(e, t) {
      module.exports = t();
    }(commonjsGlobal, () => (() => {
      var e = { d: (t2, r2) => {
        for (var n2 in r2) e.o(r2, n2) && !e.o(t2, n2) && Object.defineProperty(t2, n2, { enumerable: true, get: r2[n2] });
      }, o: (e2, t2) => Object.prototype.hasOwnProperty.call(e2, t2), r: (e2) => {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e2, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(e2, "__esModule", { value: true });
      } }, t = {};
      e.r(t), e.d(t, { PosPrinter: () => a });
      const r = require$$0, n = path;
      function i(e2, t2, n2) {
        return new Promise((i2, o2) => {
          r.ipcMain.once(`${e2}-reply`, (e3, t3) => {
            t3.status ? i2(t3) : o2(t3.error);
          }), t2.send(e2, n2);
        });
      }
      function o(e2) {
        return Math.ceil(264.5833 * e2);
      }
      var s = function(e2, t2, r2, n2) {
        return new (r2 || (r2 = Promise))(function(i2, o2) {
          function s2(e3) {
            try {
              c(n2.next(e3));
            } catch (e4) {
              o2(e4);
            }
          }
          function a2(e3) {
            try {
              c(n2.throw(e3));
            } catch (e4) {
              o2(e4);
            }
          }
          function c(e3) {
            var t3;
            e3.done ? i2(e3.value) : (t3 = e3.value, t3 instanceof r2 ? t3 : new r2(function(e4) {
              e4(t3);
            })).then(s2, a2);
          }
          c((n2 = n2.apply(e2, [])).next());
        });
      };
      if ("renderer" == process.type) throw new Error('electron-pos-printer: use remote.require("electron-pos-printer") in the render process');
      class a {
        static print(e2, t2) {
          return new Promise((c, l) => {
            t2.preview || t2.printerName || t2.silent || l(new Error("A printer name is required, if you don't want to specify a printer name, set silent to true").toString()), "object" == typeof t2.pageSize && (t2.pageSize.height && t2.pageSize.width || l(new Error("height and width properties are required for options.pageSize")));
            let p = false, d = null, u = t2.timeOutPerLine ? t2.timeOutPerLine * e2.length + 200 : 400 * e2.length + 200;
            t2.preview && t2.silent || setTimeout(() => {
              if (!p) {
                l(d || "[TimedOutError] Make sure your printer is connected"), p = true;
              }
            }, u);
            let g = new r.BrowserWindow(Object.assign(Object.assign({}, function(e3) {
              let t3 = 219, r2 = 1200;
              if ("string" == typeof e3) switch (e3) {
                case "44mm":
                  t3 = 166;
                  break;
                case "57mm":
                  t3 = 215;
                  break;
                case "58mm":
                  t3 = 219;
                  break;
                case "76mm":
                  t3 = 287;
                  break;
                case "78mm":
                  t3 = 295;
                  break;
                case "80mm":
                  t3 = 302;
              }
              else "object" == typeof e3 && (t3 = e3.width, r2 = e3.height);
              return { width: t3, height: r2 };
            }(t2.pageSize)), { show: !!t2.preview, webPreferences: { nodeIntegration: true, contextIsolation: false } }));
            g.on("closed", () => {
              g = null;
            }), g.loadFile(t2.pathTemplate || (0, n.join)(__dirname, "renderer/index.html")), g.webContents.on("did-finish-load", () => s(this, void 0, void 0, function* () {
              return yield i("body-init", g.webContents, t2), a.renderPrintDocument(g, e2).then(() => {
                let { width: r2, height: n2 } = function(e3) {
                  let t3 = 58e3, r3 = 1e4;
                  if ("string" == typeof e3) switch (e3) {
                    case "44mm":
                      t3 = Math.ceil(44e3);
                      break;
                    case "57mm":
                      t3 = Math.ceil(57e3);
                      break;
                    case "58mm":
                      t3 = Math.ceil(58e3);
                      break;
                    case "76mm":
                      t3 = Math.ceil(76e3);
                      break;
                    case "78mm":
                      t3 = Math.ceil(78e3);
                      break;
                    case "80mm":
                      t3 = Math.ceil(8e4);
                  }
                  else "object" == typeof e3 && (t3 = o(e3.width), r3 = o(e3.height));
                  return { width: t3, height: r3 };
                }(t2.pageSize);
                "string" == typeof t2.pageSize && (n2 = o(g.getContentSize()[1])), t2.preview ? c({ complete: true, data: e2, options: t2 }) : g.webContents.print(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({ silent: !!t2.silent, printBackground: !!t2.printBackground, deviceName: t2.printerName, copies: (null == t2 ? void 0 : t2.copies) || 1, pageSize: { width: r2, height: n2 } }, t2.header && { color: t2.header }), t2.footer && { color: t2.footer }), t2.color && { color: t2.color }), t2.printBackground && { printBackground: t2.printBackground }), t2.margins && { margins: t2.margins }), t2.landscape && { landscape: t2.landscape }), t2.scaleFactor && { scaleFactor: t2.scaleFactor }), t2.pagesPerSheet && { pagesPerSheet: t2.pagesPerSheet }), t2.collate && { collate: t2.collate }), t2.pageRanges && { pageRanges: t2.pageRanges }), t2.duplexMode && { duplexMode: t2.duplexMode }), t2.dpi && { dpi: t2.dpi }), (e3, r3) => {
                  r3 && (d = r3, l(r3)), p || (c({ complete: e3, options: t2 }), p = true), g.close();
                });
              }).catch((e3) => l(e3));
            }));
          });
        }
        static renderPrintDocument(e2, t2) {
          return new Promise((r2, n2) => s(this, void 0, void 0, function* () {
            for (const [r3, o2] of t2.entries()) {
              if ("image" === o2.type && !o2.path && !o2.url) {
                e2.close(), n2(new Error("An Image url/path is required for type image").toString());
                break;
              }
              if (o2.css) {
                e2.close(), n2(new Error("`options.css` in {css: " + o2.css.toString() + "} is no longer supported. Please use `options.style` instead. Example: {style: {fontSize: 12}}"));
                break;
              }
              if (o2.style && "object" != typeof o2.style) {
                e2.close(), n2(new Error('`options.styles` at "' + o2.style + '" should be an object. Example: {style: {fontSize: 12}}'));
                break;
              }
              yield i("render-line", e2.webContents, { line: o2, lineIndex: r3 }).then((t3) => {
                if (!t3.status) return e2.close(), void n2(t3.error);
              }).catch((e3) => {
                n2(e3);
              });
            }
            r2({ message: "page-rendered" });
          }));
        }
      }
      return t;
    })());
  })(dist);
  return dist.exports;
}
var distExports = requireDist();
process.env["ELECTRON_DISABLE_SECURITY_WARNINGS"] = "true";
process.env.DIST = path.join(__dirname, "../dist");
process.env.VITE_PUBLIC = require$$0.app.isPackaged ? process.env.DIST : path.join(process.env.DIST, "../public");
if (!require$$0.app.requestSingleInstanceLock()) {
  require$$0.app.quit();
  process.exit(0);
}
let win;
function createWindow() {
  win = new require$$0.BrowserWindow({
    icon: path.join(process.env.VITE_PUBLIC, "logo.svg"),
    webPreferences: {
      preload: path.join(__dirname, "./preload.js"),
      contextIsolation: true,
      enableRemoteModule: false
    }
  });
  win.webContents.on("did-finish-load", () => {
    win == null ? void 0 : win.webContents.send("main-process-message", (/* @__PURE__ */ new Date()).toLocaleString());
  });
  if (process.env.VITE_DEV_SERVER_URL) {
    win.loadURL(process.env.VITE_DEV_SERVER_URL);
    win.webContents.openDevTools();
  } else {
    win.loadFile(path.join(process.env.DIST, "index.html"));
  }
}
require$$0.ipcMain.handle("get-printers", async () => {
  if (!win) throw new Error("win not available");
  return win.webContents.getPrintersAsync();
});
require$$0.ipcMain.handle("print", async (event, data, options) => {
  try {
    await distExports.PosPrinter.print(data, options);
    return "Impression réussie";
  } catch (error) {
    throw new Error(`Erreur lors de l'impression: ${error.message}`);
  }
});
require$$0.app.on("window-all-closed", () => {
  require$$0.app.quit();
  win = null;
});
require$$0.app.whenReady().then(createWindow);
