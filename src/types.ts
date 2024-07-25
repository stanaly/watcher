import { Dispatch } from 'react';

declare global {
  interface Window {
    electronAPI: {
      startTimer(name: string): Promise<string>;
      stopTimer(name: string): Promise<string>;
      fetchData(): Promise<RawData>;
      realtimeUpdate(names: string[]): Promise<string[]>;
      nextWeek(): Promise<RawData>;
    };
  }
}

export type Mode = 'Rank' | 'Penalty';
export interface HeaderButtonGroupProps {
  mode: Mode;
  handleMode: (m: Mode) => void;
}
export interface MainHeaderProps {
  mode: Mode;
  handleMode: (m: Mode) => void;
}

export interface MainScreenProps {
  mode: Mode;
}

export interface LocationState {
  name: string;
}

export interface StartButtonProps {
  onClick: () => void;
}

export interface StopButtonProps {
  onClick: () => void;
}

export interface DrawButtonProps {
  mode: Mode;
  onClick: (m: Mode) => void;
}

export interface RankButtonProps {
  mode: Mode;
  onClick: (m: Mode) => void;
}

export interface PenaltyButtonProps {
  mode: Mode;
  onClick: (m: Mode) => void;
}

export interface UserData {
  id: number; // 아이디
  name: string; // 이름
  startTime: string; // 출근시간
  stopTime: string; // 퇴근시간
  status: 'start' | 'stop'; // 출근상태
  totalTime: number; // 총 출석시간
  timeThisWeek: number; // 이번주 출석시간
  timeToday: number; // 오늘 출석시간
  lastWeekPenalty: number; // 지난주 벌금
}

export interface UserAction {
  type: 'UPDATE';
  payload: UserData[];
}

export interface TimerContextProps {
  time: string;
  reset: boolean;
  setReset: Dispatch<React.SetStateAction<boolean>>;
}

export interface UserContextProps {
  users: UserData[];
  dispatch: Dispatch<UserAction>;
}

export type RawData = Record<string, UserData>;
