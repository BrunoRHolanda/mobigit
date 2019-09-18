const { app, BrowserWindow } = require('electron');

function createWindow () {
    // cria uma janela de navegação.
    let win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
        nodeIntegration: true
        }
    });
    
    // e carregar o index.html do aplicativo.
    win.loadFile('index.html');

    // Open the DevTools.
    win.webContents.openDevTools();

    // Emitido quando a janela é fechada.
    win.on('closed', () => {
        // Elimina a referência do objeto da janela, geralmente você iria armazenar as janelas
        // em um array, se seu app suporta várias janelas, este é o momento
        // quando você deve excluir o elemento correspondente.
        win = null
    });
}

app.on('ready', createWindow);

// Finaliza quando todas as janelas estiverem fechadas.
app.on('window-all-closed', () => {
    // No macOS é comum para aplicativos e sua barra de menu 
    // permaneçam ativo até que o usuário explicitamente encerre com Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
});

app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
        createWindow()
    }
});
