import { useState } from 'react';
import MainHeader from 'src/layouts/headers/MainHeader';
import MainScreen from 'src/layouts/screens/MainScreen';
import MemberButtonGroup from 'src/components/buttons/MemberButtonGroup';

import type { Mode } from 'src/types';

export default function Main() {
  const [mode, setMode] = useState<Mode>('Rank');

  const handleMode = (m: Mode) => {
    if (m === 'Rank') {
      setMode('Rank');
    } else {
      setMode('Penalty');
    }
  };

  return (
    <div className="flex h-screen w-screen flex-col bg-black">
      <MainHeader mode={mode} handleMode={handleMode} />
      <MainScreen mode={mode} />
      <MemberButtonGroup />
    </div>
  );
}
