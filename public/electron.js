const path = require('path');

const { app, BrowserWindow, Notification,ipcMain } = require('electron');
const isDev = require('electron-is-dev');

let win

function createWindow() {
  // Create the browser window.
   win = new BrowserWindow({
    width: 800,
    height: 400,
    frame:false,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation:true,
      enableRemoteModule:false,
    //   preload: path.join(__dirname, "./preload.js")
    },
    // icon:__dirname +'/icon.ico',
    transparent: true,
  });
  win.once('focus', () => win.flashFrame(false))
  win.flashFrame(true)
  // and load the index.html of the app.
  // win.loadFile("index.html");
  win.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, '../build/index.html')}`
  );
  // Open the DevTools.
  if (isDev) {
    win.webContents.openDevTools({ mode: 'detach' });
  }
}

app.whenReady()
.then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

