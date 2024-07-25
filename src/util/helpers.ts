import type { UserAction, UserData } from '../types';

export function calculateTotalTime(user: UserData) {
  // minutes to hh:mm
  const hours = Math.floor(user.totalTime / 60);
  const minutes = user.totalTime % 60;
  if (minutes < 10) return `${hours}:0${minutes}`;
  return `${hours}:${minutes}`;
}

export function calculateWeekTime(user: UserData) {
  // minutes to hh:mm
  const hours = Math.floor(user.timeThisWeek / 60);
  const minutes = user.timeThisWeek % 60;
  if (minutes < 10) return `${hours}:0${minutes}`;
  return `${hours}:${minutes}`;
}

export function calculateTodayTime(user: UserData) {
  // minutes to hh:mm
  const hours = Math.floor(user.timeToday / 60);
  const minutes = user.timeToday % 60;
  if (minutes < 10) return `${hours}:0${minutes}`;
  return `${hours}:${minutes}`;
}

export function calculateLastWeekPenalty(user: UserData) {
  const hours = Math.floor(user.lastWeekPenalty / 60);
  const minutes = user.lastWeekPenalty % 60;
  if (minutes < 10) return `${hours}:0${minutes}`;
  return `${hours}:${minutes}`;
}

export function calculatePenalty(user: UserData) {
  const lastWeekPenalty = 164 * user.lastWeekPenalty;
  return lastWeekPenalty.toLocaleString();
}

export function updateUser(
  users: UserData[],
  updatedUser: UserData,
  dispatch: React.Dispatch<UserAction>,
) {
  const updatedUsers = users.map(user => {
    if (user.id === updatedUser.id) {
      return updatedUser;
    }
    return user;
  });
  dispatch({ type: 'UPDATE', payload: updatedUsers });
}
