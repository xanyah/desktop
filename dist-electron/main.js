"use strict";
const path = require("path");
const electron = require("electron");
const { PosPrinter } = require("electron-pos-printer");
process.env["ELECTRON_DISABLE_SECURITY_WARNINGS"] = "true";
process.env.DIST = path.join(__dirname, "../dist");
process.env.VITE_PUBLIC = electron.app.isPackaged ? process.env.DIST : path.join(process.env.DIST, "../public");
if (!electron.app.requestSingleInstanceLock()) {
  electron.app.quit();
  process.exit(0);
}
let win;
function createWindow() {
  const mainScreen = electron.screen.getPrimaryDisplay();
  const { width, height } = mainScreen.workAreaSize;
  win = new electron.BrowserWindow({
    icon: path.join(process.env.VITE_PUBLIC || "", "logo.svg"),
    width,
    height,
    x: 0,
    y: 0,
    webPreferences: {
      preload: path.join(__dirname, "./preload.js"),
      contextIsolation: true
    }
  });
  win.webContents.on("did-finish-load", () => {
    win == null ? void 0 : win.webContents.send("main-process-message", (/* @__PURE__ */ new Date()).toLocaleString());
  });
  if (process.env.VITE_DEV_SERVER_URL) {
    win.loadURL(process.env.VITE_DEV_SERVER_URL);
    win.webContents.openDevTools();
  } else {
    win.loadFile(path.join(process.env.DIST || "", "index.html"));
  }
}
electron.ipcMain.handle("get-printers", async () => {
  if (!win) throw new Error("win not available");
  return win.webContents.getPrintersAsync();
});
electron.ipcMain.handle("print", async (event, printData) => {
  const { data, printerName } = printData;
  const options = {
    preview: true,
    margin: "0 0 0 0",
    copies: 1,
    printerName,
    timeOutPerLine: 400,
    pageSize: "80mm"
  };
  console.log(printerName);
  console.log(data);
  try {
    await PosPrinter.print(data, options);
    console.log("Printing successful");
  } catch (error) {
    console.error("Error during print:", error);
    throw error;
  }
});
electron.app.on("window-all-closed", () => {
  electron.app.quit();
  win = null;
});
electron.app.whenReady().then(createWindow);
