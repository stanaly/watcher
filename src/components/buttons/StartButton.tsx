import type { StartButtonProps } from 'src/types';

export default function StartButton({ onClick }: StartButtonProps) {
  return (
    <button
      type="button"
      aria-label="start"
      className="flex h-16 w-44 items-center justify-center rounded-lg bg-disabled"
      onClick={onClick}
    >
      <p className="text-3xl text-white">시작</p>
    </button>
  );
}
