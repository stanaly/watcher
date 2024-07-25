import UserHeader from 'src/layouts/headers/UserHeader';
import CheckTimeScreen from 'src/layouts/screens/CheckTimeScreen';
import TimerButton from 'src/components/buttons/TimerButton';

export default function User() {
  return (
    <div className="flex h-screen w-screen flex-col bg-black">
      <UserHeader />
      <CheckTimeScreen />
      <TimerButton />
    </div>
  );
}
