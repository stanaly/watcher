import { useContext } from 'react';
import HeaderButtonGroup from 'src/components/buttons/HeaderButtonGroup';
import { TimerContext } from 'src/context/TimeContext';
import type { MainHeaderProps } from 'src/types';

export default function MainHeader({ mode, handleMode }: MainHeaderProps) {
  const { time } = useContext(TimerContext) ?? { time: '00:00' };

  return (
    <div className="relative flex h-64 w-full flex-col items-center pt-10">
      <p className="text-9xl text-white">{time}</p>
      <HeaderButtonGroup mode={mode} handleMode={handleMode} />
    </div>
  );
}
