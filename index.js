const electron = require("electron");
const url = require("url");
const path = require("path")

const {app, BrowserWindow, Menu, ipcMain} = electron;

let loginWindow;

//Listen for app to ready
app.on("ready", function(){
    //Create login window
    loginWindow = CreateWindow("public/login.html",{
        width: 400,
        height: 500,
        title: "Login"
    })

    //Quit app  when closed
    loginWindow.on("closed", function(){
        app.quit();
    })

    // build menu from template
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);

    //Insert menu
    Menu.setApplicationMenu(mainMenu);
})

const CreateWindow = function(path_template,options){
    let w
    //Create new window
    w = new BrowserWindow(options);
    // Load html into window
    w.loadURL(url.format({
        pathname: path.join(__dirname, path_template),
        protocol: "file",
        slashes: true
    }));
    return w
}

// Menu template
const mainMenuTemplate = [
    {
        label:"File"
    }
]


// Add developer tools item if not in prod
if(process.env.NODE_ENV !== "production"){
    mainMenuTemplate.push({
        label: "Developer tools",
        submenu:[
            {
                label: "Toggle DevTools",
                accelerator: process.platform == "darwin"? "Command+I":
                "Ctrl+I",
                click(item, focusedWindow){
                    focusedWindow.toggleDevTools();
                }
            },
            {
                role:"reload"
            }
        ]
    });
}