import { useGame } from '@/context/GameContext';
import { LoginForm } from '@/components/LoginForm';
import { Dashboard } from '@/components/Dashboard';
import Footer from '@/components/Footer';

const Index = () => {
  const { currentPlayer } = useGame();

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1">
        {currentPlayer ? <Dashboard /> : <LoginForm />}
      </div>
      <Footer />
    </div>
  );
};

export default Index;
