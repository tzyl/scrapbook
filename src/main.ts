import { app, BrowserWindow, dialog } from "electron";
import * as fs from "fs";
import * as sizeOf from "image-size";
import * as path from "path";
import * as url from "url";
import { promisify } from "util";

import { IPhoto, IPhotoDimensions } from "./types/gallery";

const readdirAsync = promisify(fs.readdir);
const statAsync = promisify(fs.stat);
const sizeOfAsync = promisify(sizeOf) as any;

// Keep a global reference of the window object, if you don"t, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow: BrowserWindow;

const createWindow = () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 900,
    // Disable security to load images from local filesystem.
    webPreferences: {
      webSecurity: false,
    },
  });

  // and load the index.html of the app.
  if (process.env.NODE_ENV === "production") {
    mainWindow.loadURL(url.format({
      pathname: path.join(__dirname, "index.html"),
      protocol: "file:",
      slashes: true,
    }));
  } else {
    mainWindow.loadURL("http://localhost:3000");
  }

  // Open the DevTools.
  if (process.env.NODE_ENV !== "production") {
    mainWindow.webContents.openDevTools();
  }

  // Emitted when the window is closed.
  mainWindow.on("closed", () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

// Quit when all windows are closed.
app.on("window-all-closed", () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On OS X it"s common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

// Select directory and return paths and dimensions of all images inside.
(global as any).getPhotos = async (): Promise<IPhoto[]> => {
  try {
    const dirPath = dialog.showOpenDialog(mainWindow, {
      properties: ["openDirectory"],
    })[0];
    const files = await crawlFolder(dirPath);
    const imageFiles = files.filter((f) => {
      const ext = path.extname(f).toLowerCase();
      return ext === ".png" || ext === ".jpg" || ext === ".gif" || ext === ".jpeg";
    });
    const photos = await Promise.all(imageFiles.map(async (f) => {
      return {
        src: url.format({
          pathname: f,
          protocol: "file:",
          slashes: true,
        }),
        ...(await getDimensions(f)),
      };
    }));
    return photos.filter((photo) => photo !== null);
  } catch {
    return [];
  }
};

// Crawls a folder recursively and returns an array of all file paths.
const crawlFolder = async (dirPath: string, files: string[] = []): Promise<string[]> => {
  const results = (await readdirAsync(dirPath)).map((f) => path.join(dirPath, f));
  await Promise.all(results.map(async (res) => {
    if ((await statAsync(res)).isDirectory()) {
      return crawlFolder(res, files);
    } else {
      files.push(res);
    }
  }));
  return files;
};

// Tries to get the dimensions of a photo from src. Returns null if not a photo.
const getDimensions = async (photoPath: string): Promise<IPhotoDimensions> => {
  try {
    const dimensions = await sizeOfAsync(photoPath);
    return {
      width: dimensions.width,
      height: dimensions.height,
    };
  } catch {
    // Unsupported file type
    return null;
  }
};
