// eslint-disable-next-line import/no-unresolved, @typescript-eslint/no-var-requires
const { contextBridge, ipcRenderer } = require('electron/renderer');

contextBridge.exposeInMainWorld('electronAPI', {
  startTimer: name => ipcRenderer.invoke('startTimer', name),
  stopTimer: name => ipcRenderer.invoke('stopTimer', name),
  fetchData: () => ipcRenderer.invoke('fetchData'),
  realtimeUpdate: names => ipcRenderer.invoke('realtimeUpdate', names),
  nextWeek: () => ipcRenderer.invoke('nextWeek'),
});
