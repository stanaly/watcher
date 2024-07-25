import type { HeaderButtonGroupProps } from 'src/types';
import PenaltyButton from './PenaltyButton';
import RankButton from './RankButton';

export default function HeaderButtonGroup({
  mode,
  handleMode,
}: HeaderButtonGroupProps) {
  return (
    <div className="absolute right-20 mt-6 flex h-1/5 w-1/6 gap-10 lg:h-1/4">
      <PenaltyButton onClick={handleMode} mode={mode} />
      <RankButton onClick={handleMode} mode={mode} />
    </div>
  );
}
