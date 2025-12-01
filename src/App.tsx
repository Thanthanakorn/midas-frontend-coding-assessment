import { useState } from 'react';
import { GameList } from './pages/GameList';
import { GamePage } from './pages/GamePage';

function App() {
  const [selectedGameId, setSelectedGameId] = useState<number | null>(null);

  if (selectedGameId !== null) {
    return (
      <GamePage 
        gameId={selectedGameId} 
        onBack={() => setSelectedGameId(null)} 
      />
    );
  }

  return <GameList onGameClick={setSelectedGameId} />;
}

export default App;
