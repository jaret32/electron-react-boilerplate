const isDev = require('electron-is-dev');
const { app, BrowserWindow } = require('electron');

const path = require('path');
const url = require('url');

const { default: installExtension, REACT_DEVELOPER_TOOLS } = require('electron-devtools-installer');

let mainWindow

function createWindow () {

  mainWindow = new BrowserWindow({
    width: 1024,
    height: 768,
    resizable: false,
    show: false,
    title: '',
    webPreferences: {
      nodeIntegration: true
    }
  });

  // and load the index.html of the app.
  mainWindow.loadURL(isDev ? 'http://localhost:8080' : `file://${path.join(__dirname, '/build/index.html')}`);

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
    if (isDev) {
      installExtension(REACT_DEVELOPER_TOOLS)
        .catch(err => console.log('Error loading React DevTools: ', err));
      mainWindow.webContents.openDevTools();
    }
  });

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.