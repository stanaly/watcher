import { useContext } from 'react';
import { UserContext } from 'src/context/UserContext';
import { calculateLastWeekPenalty, calculatePenalty } from 'src/util/helpers';

export default function PenaltyScreen() {
  const { users } = useContext(UserContext) ?? { users: [] };

  const MakeLastWeekPenaltyTimeList = () =>
    // 주간시간이 많은대로 내림차순 정렬
    users
      ?.sort((a, b) => b.lastWeekPenalty - a.lastWeekPenalty)
      .map((user, index) => (
        <div className="flex gap-2">
          <p key={user.id} className="text-white">
            {index + 1}. {user.name} - {calculateLastWeekPenalty(user)} -
          </p>
          {calculatePenalty(user) === '0' ? (
            <p className="text-pass">PASS</p>
          ) : (
            <p className="text-penalty">{calculatePenalty(user)}</p>
          )}
          {/* 0원 이하일 경우 PASS */}
        </div>
      ));

  return (
    <div className="flex w-full flex-grow justify-center">
      <div className="flex h-full flex-col justify-center gap-12">
        <div className="flex flex-col items-center text-penalty">
          <p className="text-6xl font-bold">벌금</p>
          <p className="text-4xl font-bold">( Week )</p>
        </div>
        <div className="flex flex-col items-start gap-4 text-4xl text-white">
          {MakeLastWeekPenaltyTimeList()}
        </div>
      </div>
    </div>
  );
}
