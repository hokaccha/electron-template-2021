import { contextBridge } from "electron";
import { ipc } from "./ipc";

contextBridge.exposeInMainWorld("ipc", ipc);
