import {
  createContext,
  useEffect,
  ReactNode,
  useMemo,
  useReducer,
  useRef,
  useContext,
  useCallback,
} from 'react';
import { TimerContext } from 'src/context/TimeContext';
import { nextWeek, realtimeUpdate } from 'src/store';

import type { UserContextProps, UserData, UserAction } from 'src/types';

const UserContext = createContext<UserContextProps | undefined>(undefined);

function UserProvider({ children }: { children: ReactNode }) {
  const userReducer = (state: UserData[], action: UserAction) => {
    switch (action.type) {
      case 'UPDATE':
        return action.payload;
      default:
        throw new Error('Unhandled action type');
    }
  };
  const { reset, setReset } = useContext(TimerContext) ?? { reset: false };
  const [users, dispatch] = useReducer(userReducer, []);
  const contextValue = useMemo(() => ({ users, dispatch }), [users, dispatch]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const usersRef = useRef<UserData[]>(users);

  // ElectronAPI를 이용해 데이터를 가져옴
  useEffect(() => {
    const fetchData = async () => {
      const RawData = await window.electronAPI.fetchData();
      const fetchedUsers = Object.values(RawData);
      dispatch({ type: 'UPDATE', payload: fetchedUsers });
    };
    // eslint-disable-next-line no-void
    void fetchData();
  }, []);

  // usersRef에 users를 할당
  useEffect(() => {
    usersRef.current = users;
  }, [users]);

  // updateUsers 함수 정의
  const updateUsers = useCallback(async () => {
    if (reset) {
      const updatedUsers = usersRef.current.map(user => ({
        ...user,
        lastWeekPenalty: Math.max(0, 1440 - user.timeThisWeek),
        timeThisWeek: 0,
        timeToday: 0,
      }));
      dispatch({ type: 'UPDATE', payload: updatedUsers });
      await nextWeek();
      setReset(false);
    } else {
      const updatedUsers = usersRef.current.map(user => {
        if (user.status === 'start') {
          return {
            ...user,
            totalTime: user.totalTime + 1,
            timeThisWeek: user.timeThisWeek + 1,
            timeToday: user.timeToday + 1,
          };
        }
        return user;
      });
      const updatedUserNames = updatedUsers
        .filter(user => user.status === 'start')
        .map(user => user.name);

      dispatch({ type: 'UPDATE', payload: updatedUsers });
      await realtimeUpdate(updatedUserNames);
    }
  }, [reset, dispatch, nextWeek, realtimeUpdate, setReset]);

  // 주기적으로 updateUsers 호출
  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(() => {
      // eslint-disable-next-line no-void
      void updateUsers();
    }, 60000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [updateUsers]);

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
}

export { UserContext, UserProvider };
