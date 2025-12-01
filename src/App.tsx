import { BrowserRouter, Routes, Route, useNavigate, useParams } from 'react-router-dom';
import { GameList } from './pages/gameList';
import { GamePage } from './pages/gamePage';

function GameListPage() {
  const navigate = useNavigate();
  
  const handleGameClick = (gameId: number) => {
    navigate(`/${gameId}`);
  };

  return <GameList onGameClick={handleGameClick} />;
}

function GameDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const gameId = id ? parseInt(id) : null;

  if (!gameId) {
    navigate('/');
    return null;
  }

  return <GamePage gameId={gameId} onBack={() => navigate('/')} />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<GameListPage />} />
        <Route path="/:id" element={<GameDetailPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
