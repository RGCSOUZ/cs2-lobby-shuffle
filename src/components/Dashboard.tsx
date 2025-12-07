import { useState } from 'react';
import { useGame } from '@/context/GameContext';
import { Button } from '@/components/ui/button';
import { LobbyCard } from './LobbyCard';
import { LobbyView } from './LobbyView';
import { CreateLobbyDialog } from './CreateLobbyDialog';
import { JoinPasswordDialog } from './JoinPasswordDialog';
import { PlayerBadge } from './PlayerBadge';
import { Plus, LogOut, Target, Gamepad2 } from 'lucide-react';

export const Dashboard = () => {
  const { currentPlayer, lobbies, currentLobby, logout, joinLobby } = useGame();
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [passwordDialogOpen, setPasswordDialogOpen] = useState(false);
  const [selectedLobby, setSelectedLobby] = useState<{ id: string; name: string } | null>(null);

  if (!currentPlayer) return null;

  const handleJoinLobby = (lobbyId: string) => {
    const lobby = lobbies.find(l => l.id === lobbyId);
    if (!lobby) return;

    if (lobby.password) {
      setSelectedLobby({ id: lobbyId, name: lobby.name });
      setPasswordDialogOpen(true);
    } else {
      joinLobby(lobbyId);
    }
  };

  const handlePasswordSubmit = (password: string) => {
    if (selectedLobby) {
      joinLobby(selectedLobby.id, password);
      setPasswordDialogOpen(false);
      setSelectedLobby(null);
    }
  };

  const availableLobbies = lobbies.filter(l => l.id !== currentLobby?.id);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Target className="w-8 h-8 text-primary" />
                <span className="font-display text-xl font-bold tracking-wider hidden sm:inline">
                  CS2 <span className="text-primary">LOBBIES</span>
                </span>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <PlayerBadge player={currentPlayer} isCurrentPlayer size="md" />
              <Button variant="ghost" size="icon" onClick={logout}>
                <LogOut className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {currentLobby ? (
          <LobbyView />
        ) : (
          <div className="animate-fade-in">
            {/* Welcome Section */}
            <div className="text-center mb-10">
              <h1 className="font-display text-3xl md:text-4xl font-bold mb-3">
                Welcome, <span className="text-primary glow-text">{currentPlayer.nickname}</span>
              </h1>
              <p className="text-muted-foreground">
                Join a lobby or create your own to start playing
              </p>
            </div>

            {/* Create Lobby Button */}
            <div className="flex justify-center mb-10">
              <Button 
                variant="gaming" 
                size="lg" 
                onClick={() => setCreateDialogOpen(true)}
                className="gap-2"
              >
                <Plus className="w-5 h-5" />
                Create Lobby
              </Button>
            </div>

            {/* Lobbies List */}
            <div>
              <h2 className="font-display text-xl font-semibold mb-6 flex items-center gap-2">
                <Gamepad2 className="w-5 h-5 text-primary" />
                Available Lobbies
                <span className="text-muted-foreground text-sm font-normal ml-2">
                  ({availableLobbies.length})
                </span>
              </h2>

              {availableLobbies.length > 0 ? (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {availableLobbies.map((lobby) => (
                    <LobbyCard 
                      key={lobby.id} 
                      lobby={lobby} 
                      onJoin={handleJoinLobby}
                    />
                  ))}
                </div>
              ) : (
                <div className="gaming-card p-12 text-center">
                  <Gamepad2 className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-display text-lg font-semibold mb-2">No lobbies available</h3>
                  <p className="text-muted-foreground mb-6">
                    Be the first to create a lobby and invite your friends!
                  </p>
                  <Button 
                    variant="outline" 
                    onClick={() => setCreateDialogOpen(true)}
                    className="gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Create First Lobby
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {/* Dialogs */}
      <CreateLobbyDialog 
        open={createDialogOpen} 
        onOpenChange={setCreateDialogOpen} 
      />
      
      {selectedLobby && (
        <JoinPasswordDialog
          open={passwordDialogOpen}
          onOpenChange={setPasswordDialogOpen}
          lobbyName={selectedLobby.name}
          onSubmit={handlePasswordSubmit}
        />
      )}
    </div>
  );
};
