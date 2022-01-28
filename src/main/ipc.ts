import { ipcMain } from "electron";

export function initIpc(): void {
  ipcMain.handle("hello", async (_event, query) => {
    return `Hello ${query}`;
  });
}
