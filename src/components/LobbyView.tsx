import { useGame } from '@/context/GameContext';
import { Button } from '@/components/ui/button';
import { PlayerBadge } from './PlayerBadge';
import { TeamDisplay } from './TeamDisplay';
import { 
  ArrowLeft, 
  Crown, 
  Shuffle, 
  Trash2, 
  UserMinus, 
  Users,
  Lock,
  RefreshCw
} from 'lucide-react';
import { cn } from '@/lib/utils';

export const LobbyView = () => {
  const { 
    currentPlayer, 
    currentLobby, 
    currentMatch,
    leaveLobby, 
    kickPlayer, 
    deleteLobby,
    shuffleTeams,
    reshuffleTeams
  } = useGame();

  if (!currentLobby || !currentPlayer) return null;

  const isHost = currentLobby.hostPlayerId === currentPlayer.id;
  const canShuffle = currentLobby.players.length === 10;
  const hostPlayer = currentLobby.players.find(p => p.id === currentLobby.hostPlayerId);

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <Button variant="ghost" onClick={leaveLobby} className="gap-2">
          <ArrowLeft className="w-4 h-4" />
          Leave Lobby
        </Button>

        {isHost && (
          <Button variant="destructive" onClick={deleteLobby} size="sm" className="gap-2">
            <Trash2 className="w-4 h-4" />
            Delete Lobby
          </Button>
        )}
      </div>

      {/* Lobby Info */}
      <div className="gaming-card p-6 mb-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h2 className="font-display text-2xl font-bold">{currentLobby.name}</h2>
              {currentLobby.password && (
                <Lock className="w-4 h-4 text-muted-foreground" />
              )}
            </div>
            {currentLobby.description && (
              <p className="text-muted-foreground">{currentLobby.description}</p>
            )}
          </div>
          <div className="flex items-center gap-2 text-lg">
            <Users className="w-5 h-5 text-muted-foreground" />
            <span className={cn(
              'font-display font-bold',
              canShuffle ? 'text-primary' : 'text-foreground'
            )}>
              {currentLobby.players.length}
            </span>
            <span className="text-muted-foreground">/10</span>
          </div>
        </div>

        {/* Host info */}
        <div className="flex items-center gap-2 text-sm">
          <Crown className="w-4 h-4 text-primary" />
          <span className="text-muted-foreground">Host:</span>
          <span className="font-medium">{hostPlayer?.nickname}</span>
          {isHost && <span className="text-primary">(You)</span>}
        </div>
      </div>

      {/* Players List */}
      <div className="gaming-card p-6 mb-6">
        <h3 className="font-display text-lg font-semibold mb-4 flex items-center gap-2">
          <Users className="w-5 h-5 text-primary" />
          Players
        </h3>
        
        <div className="grid gap-3 sm:grid-cols-2">
          {currentLobby.players.map((player) => (
            <div 
              key={player.id}
              className={cn(
                'flex items-center justify-between p-3 rounded-lg border transition-all',
                player.id === currentPlayer.id 
                  ? 'bg-primary/10 border-primary/30' 
                  : 'bg-secondary/30 border-border/50'
              )}
            >
              <div className="flex items-center gap-3">
                {player.id === currentLobby.hostPlayerId ? (
                  <Crown className="w-5 h-5 text-primary" />
                ) : (
                  <div className="w-5 h-5 rounded-full bg-muted flex items-center justify-center text-xs font-bold">
                    {currentLobby.players.indexOf(player) + 1}
                  </div>
                )}
                <div>
                  <span className="font-medium">{player.nickname}</span>
                  {player.id === currentPlayer.id && (
                    <span className="text-primary text-sm ml-2">(You)</span>
                  )}
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="font-display text-sm bg-muted/50 px-2 py-1 rounded">
                  LVL {player.level}
                </span>
                {isHost && player.id !== currentPlayer.id && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => kickPlayer(player.id)}
                    className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                  >
                    <UserMinus className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </div>
          ))}

          {/* Empty slots */}
          {Array.from({ length: 10 - currentLobby.players.length }).map((_, i) => (
            <div 
              key={`empty-${i}`}
              className="flex items-center justify-center p-3 rounded-lg border border-dashed border-border/30 text-muted-foreground"
            >
              Waiting for player...
            </div>
          ))}
        </div>
      </div>

      {/* Shuffle Section */}
      {isHost && (
        <div className="gaming-card p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-display text-lg font-semibold mb-1">Team Shuffle</h3>
              <p className="text-sm text-muted-foreground">
                {canShuffle 
                  ? 'Ready to shuffle! Click to randomly divide players into two teams.'
                  : `Waiting for ${10 - currentLobby.players.length} more player(s)...`
                }
              </p>
            </div>
            {currentMatch ? (
              <Button 
                variant="outline" 
                onClick={reshuffleTeams}
                className="gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                Reshuffle
              </Button>
            ) : (
              <Button 
                variant="gaming" 
                onClick={shuffleTeams}
                disabled={!canShuffle}
                className="gap-2"
              >
                <Shuffle className="w-4 h-4" />
                Shuffle Teams
              </Button>
            )}
          </div>
        </div>
      )}

      {/* Match Result */}
      {currentMatch && (
        <div className="gaming-card p-6">
          <h3 className="font-display text-xl font-bold mb-6 text-center glow-text">
            MATCH READY
          </h3>
          <TeamDisplay match={currentMatch} />
        </div>
      )}
    </div>
  );
};
