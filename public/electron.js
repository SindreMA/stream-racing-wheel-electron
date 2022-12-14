const path = require('path');

const { app, BrowserWindow } = require('electron');
const isDev = require('electron-is-dev');
const url = require('url');

const startUrl = process.env.ELECTRON_START_URL || url.format({
  pathname: path.join(__dirname, '../build/index.html'),
  protocol: 'file:',
  slashes: true,
});


function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 550,
    height: 800,
    frame: false,
    roundedCorners: true,
    transparent: true,

    
    alwaysOnTop: true,
    x: 235,
    y: 200,

    webPreferences: {
      nodeIntegration: true,
    },
  });
  win.setIgnoreMouseEvents(true,{forward: true});


  // and load the index.html of the app.
  // win.loadFile("index.html");
  win.loadURL(startUrl);
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
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