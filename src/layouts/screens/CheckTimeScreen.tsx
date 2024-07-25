import { useContext } from 'react';
import { UserContext } from 'src/context/UserContext';
import { useLocation } from 'react-router-dom';
import { calculateTodayTime, calculateWeekTime } from 'src/util/helpers';

import type { LocationState } from 'src/types';

export default function CheckTimeScreen() {
  const location = useLocation() as { state: LocationState };

  const name = location.state?.name;

  const { users } = useContext(UserContext) ?? { users: [] };

  const selectedUser = users?.find(user => user.name === name);

  return selectedUser ? (
    <div className="flex w-full flex-grow">
      <div className="flex h-full flex-1 flex-col items-center justify-center gap-12">
        <div
          className={`flex h-96 w-96 flex-col items-center justify-center gap-10 rounded-full border-2 ${selectedUser.status === 'start' ? 'border-secondary text-white' : 'border-disabled text-disabled'}`}
        >
          <div className="flex flex-col items-center text-7xl font-bold">
            <p>이번주</p>
            <p>총시간</p>
          </div>
          <p className="text-5xl">{calculateWeekTime(selectedUser)}</p>
        </div>
      </div>
      <div className="flex h-full flex-1 flex-col items-center justify-center gap-12">
        <div
          className={`flex h-96 w-96 flex-col items-center justify-center gap-10 rounded-full border-2 ${selectedUser.status === 'start' ? 'border-tertiary text-white' : 'border-disabled text-disabled'}`}
        >
          <div className="flex flex-col items-center text-7xl font-bold">
            <p>오늘</p>
            <p>누적시간</p>
          </div>
          <p className="text-5xl">{calculateTodayTime(selectedUser)}</p>
        </div>
      </div>
    </div>
  ) : (
    <div className="flex w-full flex-grow justify-center">
      <p className="text-9xl text-white">사용자를 선택해주세요</p>
    </div>
  );
}
