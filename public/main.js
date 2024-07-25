/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-var-requires */

const { app, BrowserWindow, ipcMain, Notification } = require('electron');
const path = require('path');
const url = require('url');
const os = require('os');
const fs = require('fs');
const log = require('electron-log');

// const DATA_PATH = path.join(__dirname, 'data.json');
const DATA_PATH = path.join(os.homedir(), 'data.json');

log.initialize();

function readDataFromFile() {
  try {
    const rawData = fs.readFileSync(DATA_PATH, 'utf8');
    return JSON.parse(rawData);
  } catch (error) {
    return {};
  }
}

function writeDataToFile(data) {
  fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2));
}

function getCurrentTime() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  return `${hours}:${minutes}`;
}

function createWindow() {
  /*
   * 넓이 1920에 높이 1080의 FHD 풀스크린 앱을 실행시킵니다.
   * */
  const win = new BrowserWindow({
    width: 1920,
    height: 1080,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
    icon: path.join(__dirname, 'icon.png'),
  });

  /*
   * ELECTRON_START_URL을 직접 제공할경우 해당 URL을 로드합니다.
   * 만일 URL을 따로 지정하지 않을경우 (프로덕션빌드) React 앱이
   * 빌드되는 build 폴더의 index.html 파일을 로드합니다.
   * */
  const startUrl =
    process.env.ELECTRON_START_URL ||
    url.format({
      pathname: path.join(__dirname, '/../build/index.html'),
      protocol: 'file:',
      slashes: true,
    });

  /*
   * startUrl에 배정되는 url을 맨 위에서 생성한 BrowserWindow에서 실행시킵니다.
   * */
  win.loadURL(startUrl);
}

app.whenReady().then(() => {
  ipcMain.handle('startTimer', async (event, name) => {
    new Notification({
      title: '연구실 출석 알림',
      body: `${name}님 환영합니다.`,
      icon: path.join(__dirname, 'start.png'),
    }).show();
    const data = readDataFromFile();
    data[name].startTime = getCurrentTime();
    data[name].status = 'start';
    writeDataToFile(data);
    return data[name].startTime;
  });

  ipcMain.handle('stopTimer', async (event, name) => {
    new Notification({
      title: '연구실 퇴실 알림',
      body: `${name}님 수고하셨습니다.`,
      icon: path.join(__dirname, 'stop.png'),
    }).show();
    const data = readDataFromFile();
    data[name].stopTime = getCurrentTime();
    data[name].status = 'stop';
    writeDataToFile(data);
    return data[name].stopTime;
  });

  ipcMain.handle('fetchData', async () => readDataFromFile());

  ipcMain.handle('realtimeUpdate', async (event, names) => {
    const data = readDataFromFile();
    names.forEach(name => {
      if (data[name].status === 'start') {
        data[name].totalTime += 1;
        data[name].timeThisWeek += 1;
        data[name].timeToday += 1;
      }
    });
    writeDataToFile(data);
    return names;
  });

  ipcMain.handle('nextWeek', async () => {
    const data = readDataFromFile();
    Object.keys(data).forEach(name => {
      data[name].lastWeekPenalty = Math.max(0, 1440 - data[name].timeThisWeek);
      data[name].timeThisWeek = 0;
      data[name].timeToday = 0;
    });
    writeDataToFile(data);
    return data;
  });

  createWindow();
});
