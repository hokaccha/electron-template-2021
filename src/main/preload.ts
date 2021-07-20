import type { IpcRenderer } from "electron";
import { ipcRenderer } from "electron";

declare global {
  interface Window {
    ipcRenderer: IpcRenderer;
  }
}

process.once("loaded", () => {
  window.ipcRenderer = ipcRenderer;
});
