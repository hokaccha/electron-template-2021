import { app, Menu } from "electron";
import type { MenuItemConstructorOptions } from "electron";

const isMac = process.platform === "darwin";

const template: MenuItemConstructorOptions[] = [
  {
    label: "File",
    submenu: [isMac ? { role: "close" } : { role: "quit" }],
  },
  {
    label: "Edit",
    submenu: [
      { role: "undo" },
      { role: "redo" },
      { type: "separator" },
      { role: "cut" },
      { role: "copy" },
      { role: "paste" },
      { role: "delete" },
      { role: "selectAll" },
      { type: "separator" },
      {
        label: "Ipc Test",
        click(_item, focusedWindow): void {
          focusedWindow?.webContents.send("hello", { message: "electron" });
        },
      },
    ],
  },
  {
    label: "View",
    submenu: [
      { role: "reload" },
      { role: "forceReload" },
      { role: "toggleDevTools" },
      { type: "separator" },
      { role: "resetZoom" },
      { role: "zoomIn" },
      { role: "zoomOut" },
      { type: "separator" },
      { role: "togglefullscreen" },
    ],
  },
  {
    label: "Window",
    role: "window",
    submenu: [{ role: "minimize" }, { role: "zoom" }, { role: "close" }],
  },
];

if (isMac) {
  template.unshift({
    label: app.name,
    submenu: [
      { role: "about" },
      { type: "separator" },
      { role: "services" },
      { type: "separator" },
      { role: "hide" },
      { role: "hideOthers" },
      { role: "unhide" },
      { type: "separator" },
      { role: "quit" },
    ],
  });
}

export function initMenu() {
  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}
