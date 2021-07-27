import { join } from "path";
import { BrowserWindow, app } from "electron";
import isDev from "electron-is-dev";
import prepareNext from "electron-next";
import { initMenu } from "./menu";

app.on("ready", async () => {
  initMenu();

  await prepareNext({
    development: join(__dirname, "../../src/renderer"),
    production: join(__dirname, "../renderer"),
  });

  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: false,
      preload: join(__dirname, "preload.js"),
    },
  });

  const url = isDev ? "http://localhost:8000/" : `file://${join(__dirname, "../renderer/out/index.html")}`;

  mainWindow.loadURL(url);
});

app.on("window-all-closed", app.quit);
