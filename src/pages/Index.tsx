import { useGame } from '@/context/GameContext';
import { LoginForm } from '@/components/LoginForm';
import { Dashboard } from '@/components/Dashboard';

const Index = () => {
  const { currentPlayer } = useGame();

  return currentPlayer ? <Dashboard /> : <LoginForm />;
};

export default Index;
