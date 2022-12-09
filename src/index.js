const { app, BrowserWindow } = require('electron')

const createWindow = () => {
    const win = new BrowserWindow({
        width: 1260,
        height: 550,
        minWidth: 1260,
        minHeight: 550,
        center: true,
        autoHideMenuBar: true,
        icon: __dirname + './src/img/logo.ico'
    });

    win.loadFile('./src/html/index.html');
}

app.whenReady().then(() => {
    createWindow()
});