import { ipcMain } from "./ipc";

export function initIpc(): void {
  ipcMain.handle("sendHello", async (_event, message) => {
    return `Hello ${message}`;
  });

  ipcMain.handle("hey", async () => {
    console.log("yay");
  });
}
