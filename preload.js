const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  runPlaywright: (...args) => ipcRenderer.invoke('run-playwright', ...args),
});