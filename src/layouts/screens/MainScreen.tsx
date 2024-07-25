import type { MainScreenProps } from 'src/types';

import RankScreen from './RankScreen';
import PenaltyScreen from './PenaltyScreen';

export default function MainScreen({ mode }: MainScreenProps) {
  // if (mode === 'Draw') {
  //   return <Draw />;
  // }
  if (mode === 'Penalty') {
    return <PenaltyScreen />;
  }
  return <RankScreen />;
}
