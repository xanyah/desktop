"use strict";
const path = require("path");
const electron = require("electron");
process.env["ELECTRON_DISABLE_SECURITY_WARNINGS"] = "true";
process.env.DIST = path.join(__dirname, "../dist");
process.env.VITE_PUBLIC = electron.app.isPackaged ? process.env.DIST : path.join(process.env.DIST, "../public");
if (!electron.app.requestSingleInstanceLock()) {
  electron.app.quit();
  process.exit(0);
}
let win;
function createWindow() {
  win = new electron.BrowserWindow({
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
electron.ipcMain.handle("get-printers", async () => {
  if (!win) throw new Error("win not available");
  return win.webContents.getPrintersAsync();
});
electron.ipcMain.handle("print", async () => {
  const options = {
    preview: true,
    margin: "0 0 0 0",
    copies: 1,
    printerName: "EPSON TM-T88IV ReceiptE4",
    timeOutPerLine: 400,
    silent: true,
    pageSize: "80mm"
    // page size
  };
  const data = [
    {
      type: "text",
      // 'text' | 'barCode' | 'qrCode' | 'image' | 'table
      value: "SAMPLE HEADING",
      style: { fontWeight: "700", textAlign: "center", fontSize: "24px" }
    },
    {
      type: "text",
      // 'text' | 'barCode' | 'qrCode' | 'image' | 'table'
      value: "Secondary text",
      style: { textDecoration: "underline", fontSize: "10px", textAlign: "center", color: "red" }
    },
    {
      type: "barCode",
      value: "023456789010",
      height: 40,
      // height of barcode, applicable only to bar and QR codes
      width: 2,
      // width of barcode, applicable only to bar and QR codes
      displayValue: true,
      // Display value below barcode
      fontsize: 12
    }
  ];
  PosPrinter.print(data, options).then(console.log).catch((error) => {
    console.error(error);
  });
});
electron.app.on("window-all-closed", () => {
  electron.app.quit();
  win = null;
});
electron.app.whenReady().then(createWindow);
