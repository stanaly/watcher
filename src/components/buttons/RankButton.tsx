import type { RankButtonProps } from 'src/types';

export default function RankButton({ mode, onClick }: RankButtonProps) {
  return (
    <button
      type="button"
      aria-label="total"
      className={`flex h-full w-full items-center justify-center rounded-lg ${mode === 'Rank' ? 'bg-secondary' : 'bg-disabled'}`}
      onClick={() => onClick('Rank')}
    >
      <p className="text-xl text-white lg:text-3xl">랭킹</p>
    </button>
  );
}
