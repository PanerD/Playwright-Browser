const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      enableRemoteModule: false,
      nodeIntegration: false
    },
  });

  mainWindow.loadFile('index.html');
}

app.whenReady().then(createWindow);

ipcMain.handle('run-playwright', async (event, ...args) => {
  const { runPlaywright } = require('./playwrightScript');
  return await runPlaywright(...args);
});

app.on('window-all-closed', () => {
  app.quit();
});