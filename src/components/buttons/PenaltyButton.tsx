import type { PenaltyButtonProps } from 'src/types';

export default function PenaltyButton({ mode, onClick }: PenaltyButtonProps) {
  return (
    <button
      type="button"
      aria-label="penalty"
      className={`flex h-full w-full items-center justify-center rounded-lg ${mode === 'Penalty' ? 'bg-tertiary' : 'bg-disabled'}`}
      onClick={() => onClick('Penalty')}
    >
      <p className="text-xl text-white lg:text-3xl">집계</p>
    </button>
  );
}
