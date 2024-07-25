import { useContext } from 'react';
import { UserContext } from 'src/context/UserContext';
import MemberButton from './MemberButton';

export default function MemberButtonGroup() {
  const { users } = useContext(UserContext) ?? { users: [] };

  const sortedUsers = [...users].sort((a, b) => a.id - b.id);
  return (
    <div className="flex h-48 w-full items-center justify-center gap-24">
      {sortedUsers.map(user => (
        <MemberButton key={user.id} name={user.name} status={user.status} />
      ))}
    </div>
  );
}
