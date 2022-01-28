import { join } from "path";
import { BrowserWindow, app } from "electron";
import isDev from "electron-is-dev";
import prepareNext from "electron-next";
import { initMenu } from "./menu";
import { initIpc } from "./ipc";

app.on("ready", async () => {
  initMenu();
  initIpc();

  const port = process.env.PORT ? parseInt(process.env.PORT) : 8000;

  await prepareNext(
    {
      development: join(__dirname, "../../src/renderer"),
      production: join(__dirname, "../renderer"),
    },
    port
  );

  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: { preload: join(__dirname, "preload.js") },
  });

  const url = isDev ? `http://localhost:${port}/` : `file://${join(__dirname, "../renderer/out/index.html")}`;

  mainWindow.loadURL(url);
});

app.on("window-all-closed", app.quit);
