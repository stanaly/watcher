import { createContext, useEffect, useState, ReactNode, useMemo } from 'react';

import type { TimerContextProps } from 'src/types';

const TimerContext = createContext<TimerContextProps | undefined>(undefined);

function TimerProvider({ children }: { children: ReactNode }) {
  const [time, setTime] = useState<string>('00:00');
  const [reset, setReset] = useState<boolean>(false);

  const contextValue = useMemo(
    () => ({ time, reset, setReset }),
    [time, reset, setReset],
  );

  useEffect(() => {
    const interval = setInterval(() => {
      const locale = new Date().toLocaleString('en-US', {
        timeZone: 'Asia/Seoul',
      });
      const now = new Date(locale);
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');
      const dayOfWeek = now.getDay();

      // 일요일 자정
      if (
        dayOfWeek === 1 &&
        hours === '00' &&
        minutes === '00' &&
        seconds === '00'
      ) {
        setReset(true);
      }

      setTime(`${hours}:${minutes}`);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <TimerContext.Provider value={contextValue}>
      {children}
    </TimerContext.Provider>
  );
}

export { TimerContext, TimerProvider };
