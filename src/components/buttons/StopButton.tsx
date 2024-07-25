import type { StopButtonProps } from 'src/types';

export default function StopButton({ onClick }: StopButtonProps) {
  return (
    <button
      type="button"
      aria-label="start"
      className="flex h-16 w-44 items-center justify-center rounded-lg bg-enabled"
      onClick={onClick}
    >
      <p className="text-3xl text-white">종료</p>
    </button>
  );
}
