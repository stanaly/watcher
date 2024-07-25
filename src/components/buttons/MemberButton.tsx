import { useNavigate } from 'react-router-dom';

export default function MemberButton(props: { name: string; status: string }) {
  const navigate = useNavigate();

  const { name, status } = props;

  return (
    <button
      key={name}
      type="button"
      aria-label={name}
      className={`flex h-16 w-44 items-center justify-center rounded-lg ${status === 'start' ? 'bg-enabled' : 'bg-disabled'}`}
      onClick={() => {
        navigate('/user', { state: { name } });
      }}
    >
      <p className="text-3xl text-white">{name}</p>
    </button>
  );
}
