import type { IpcRendererEvent } from "electron";
import { contextBridge, ipcRenderer } from "electron";

export interface IPC {
  sendHello: (message: string) => Promise<string>;
  onClickMenuItem: (callback: (event: IpcRendererEvent, message: string) => void) => void;
}

declare global {
  interface Window {
    ipc: IPC;
  }
}

const ipc: IPC = {
  sendHello: (message) => ipcRenderer.invoke("hello", message),
  onClickMenuItem: (callback) => ipcRenderer.on("menuItemClicked", callback),
};

contextBridge.exposeInMainWorld("ipc", ipc);
