import type { IpcFromMainHandler } from "./ipc-lib";
import { createIpc } from "./ipc-lib";

export type IpcFromRenderer = {
  sendHello: (message: string) => Promise<string>;
  hey: () => Promise<void>;
};

export type IpcFromMain = {
  showAlert: IpcFromMainHandler<[text: string, now: Date]>;
  showConfirm: IpcFromMainHandler<[text: string]>;
};

export type IPC = {
  invoke: IpcFromRenderer;
  on: IpcFromMain;
};

export const { ipcRenderer, ipcMain } = createIpc<IpcFromRenderer, IpcFromMain>();

export const ipc: IPC = {
  invoke: {
    sendHello: (message) => ipcRenderer.invoke("sendHello", message),
    hey: () => ipcRenderer.invoke("hey"),
  },

  on: {
    showAlert: (listener) => ipcRenderer.on("showAlert", listener),
    showConfirm: (listener) => ipcRenderer.on("showConfirm", listener),
  },
};
