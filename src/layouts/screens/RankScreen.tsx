import { useContext } from 'react';
import { UserContext } from 'src/context/UserContext';
import { calculateWeekTime, calculateTotalTime } from 'src/util/helpers';

export default function RankScreen() {
  const { users } = useContext(UserContext) ?? { users: [] };

  const MakeTotalTimeList = () =>
    // 전체시간이 많은대로 내림차순 정렬
    users
      ?.sort((a, b) => b.totalTime - a.totalTime)
      .map((user, index) => (
        <p key={user.id}>
          {index + 1}. {user.name} - {calculateTotalTime(user)}
        </p>
      ));

  const MakeWeekTimeList = () =>
    // 주간시간이 많은대로 내림차순 정렬
    users
      ?.sort((a, b) => b.timeThisWeek - a.timeThisWeek)
      .map((user, index) => (
        <p key={user.id}>
          {index + 1}. {user.name} - {calculateWeekTime(user)}
        </p>
      ));

  return (
    <div className="flex w-full flex-grow">
      <div className="flex h-full flex-1 flex-col justify-center gap-12">
        <div className="flex flex-col items-center text-white">
          <p className="text-6xl font-bold">Rank</p>
          <p className="text-4xl">( Total )</p>
        </div>
        <div className="flex flex-col items-center text-4xl text-white">
          <div className="flex flex-col items-start gap-4">
            {MakeTotalTimeList()}
          </div>
        </div>
      </div>
      <div className="h-full w-1 bg-white" />
      <div className="flex h-full flex-1 flex-col justify-center gap-12">
        <div className="flex flex-col items-center text-white">
          <p className="text-6xl font-bold">Rank</p>
          <p className="text-4xl">( Week )</p>
        </div>
        <div className="flex flex-col items-center gap-4 text-4xl text-white">
          <div className="flex flex-col items-start gap-4">
            {MakeWeekTimeList()}
          </div>
        </div>
      </div>
    </div>
  );
}
