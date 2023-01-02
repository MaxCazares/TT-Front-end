const { app, BrowserWindow } = require('electron')

const createWindow = () => {
    const win = new BrowserWindow({
        width: 1310,
        height: 600,
        minWidth: 1295,
        minHeight: 600,
        center: true,
        autoHideMenuBar: true,
        icon: './src/img/logo.ico'
    });

    win.loadFile('./src/html/index.html');
}

app.whenReady().then(() => {
    createWindow()
});