/* eslint-disable @typescript-eslint/no-unused-vars */
import { useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { startTimer, stopTimer } from 'src/store';

import type { LocationState, UserData } from 'src/types';
// eslint-disable-next-line import/no-extraneous-dependencies
import log from 'electron-log/renderer';
import { updateUser } from 'src/util/helpers';
import { UserContext } from 'src/context/UserContext';
import { TimerContext } from 'src/context/TimeContext';
import StartButton from './StartButton';
import StopButton from './StopButton';

export default function TimerButton() {
  const location = useLocation() as { state: LocationState };

  const { users, dispatch } = useContext(UserContext) ?? {
    users: [],
    dispatch: undefined,
  };
  const { time } = useContext(TimerContext) ?? { time: '00:00' };

  const user = users.find(u => u.name === location.state?.name);
  const name = location.state?.name;

  const handleUpdateUser = (updatedUser: UserData) => {
    if (!users) return;
    if (!dispatch) return;
    updateUser(users, updatedUser, dispatch);
  };

  const handleStartClick = async () => {
    if (!name) return;
    if (!user) return;

    handleUpdateUser({ ...user, status: 'start', startTime: time });
    await startTimer(name);
  };

  const handleStopClick = async () => {
    if (!name) return;
    if (!user) return;

    handleUpdateUser({ ...user, status: 'stop', stopTime: time });
    await stopTimer(name);
  };

  return (
    <div className="flex h-48 w-full items-center justify-center gap-24">
      {user?.status === 'start' ? (
        <StopButton onClick={handleStopClick} />
      ) : (
        <StartButton onClick={handleStartClick} />
      )}
    </div>
  );
}
