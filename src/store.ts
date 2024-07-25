// eslint-disable-next-line import/no-extraneous-dependencies
import log from 'electron-log/renderer';

export async function startTimer(name: string) {
  const startTime = await window.electronAPI.startTimer(name);
  log.info(`${name}이 ${startTime}에 출근했습니다.`);
}

export async function stopTimer(name: string) {
  const stopTime = await window.electronAPI.stopTimer(name);
  log.info(`${name}이 ${stopTime}에 퇴근했습니다.`);
}

export async function fetchData() {
  const users = await window.electronAPI.fetchData();
  return users;
}

export async function realtimeUpdate(names: string[]) {
  if (names.length !== 0) {
    const updatedUserNames = await window.electronAPI.realtimeUpdate(names);
    log.info(`${updatedUserNames.join(', ')}의 출석시간이 1분 증가했습니다.`);
  }
}

export async function nextWeek() {
  // timeThisWeek, timeToday를 0으로 초기화 후 lastWeekPenalty 설정
  const result = await window.electronAPI.nextWeek();
  log.info('========================================');
  Object.keys(result).forEach(name => {
    log.info(`${name}의 벌금: ${result[name].lastWeekPenalty * 164}`);
  });
  log.info('========================================');
}
