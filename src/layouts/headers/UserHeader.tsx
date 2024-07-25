import { useContext } from 'react';
import { TimerContext } from 'src/context/TimeContext';
import { useLocation, useNavigate } from 'react-router-dom';
import IcRoundArrowBack from 'src/components/svgs/IcRoundArrowBack';

import type { LocationState } from 'src/types';

export default function UserHeader() {
  const navigate = useNavigate();
  const location = useLocation() as { state: LocationState };

  const { time } = useContext(TimerContext) ?? { time: '00:00' };

  const name = location.state?.name;

  return (
    <div className="relative flex h-64 w-full justify-center pt-10">
      {/* 여기서 뒤돌아가기 버튼 표시 */}
      <button
        type="button"
        aria-label="back"
        className="absolute left-10"
        onClick={() => {
          navigate('/');
        }}
      >
        <IcRoundArrowBack className="h-20 w-20 text-white" />
      </button>
      <div className="flex flex-col items-center gap-3">
        <p className="text-9xl text-white">{time}</p>
        {/* 여기서 이름 표시 */}
        <p className="text-5xl text-white underline underline-offset-8">
          {name}
        </p>
      </div>
    </div>
  );
}
