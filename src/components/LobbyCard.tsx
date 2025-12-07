import { Lobby } from '@/types/game';
import { useGame } from '@/context/GameContext';
import { Button } from '@/components/ui/button';
import { Lock, Users, User } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LobbyCardProps {
  lobby: Lobby;
  onJoin: (lobbyId: string) => void;
}

export const LobbyCard = ({ lobby, onJoin }: LobbyCardProps) => {
  const { currentPlayer, currentLobby } = useGame();
  
  const isFull = lobby.players.length >= 10;
  const isInLobby = currentLobby?.id === lobby.id;
  const hostPlayer = lobby.players.find(p => p.id === lobby.hostPlayerId);

  return (
    <div className={cn(
      'gaming-card p-5 transition-all duration-300 hover:border-primary/30',
      isInLobby && 'border-primary/50 glow-border'
    )}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-display text-lg font-semibold truncate">{lobby.name}</h3>
            {lobby.password && (
              <Lock className="w-4 h-4 text-muted-foreground shrink-0" />
            )}
          </div>
          {lobby.description && (
            <p className="text-sm text-muted-foreground line-clamp-2">{lobby.description}</p>
          )}
        </div>
      </div>

      {/* Host info */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
        <User className="w-4 h-4" />
        <span>Host: <span className="text-foreground">{hostPlayer?.nickname || 'Unknown'}</span></span>
      </div>

      {/* Player count */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5 text-muted-foreground" />
          <div className="flex items-center gap-1">
            <span className={cn(
              'font-display text-lg font-bold',
              isFull ? 'text-primary' : 'text-foreground'
            )}>
              {lobby.players.length}
            </span>
            <span className="text-muted-foreground">/10</span>
          </div>
          {/* Player count bar */}
          <div className="w-24 h-2 bg-secondary rounded-full overflow-hidden ml-2">
            <div 
              className={cn(
                'h-full transition-all duration-300',
                isFull 
                  ? 'bg-primary' 
                  : 'bg-gradient-to-r from-primary/60 to-primary'
              )}
              style={{ width: `${(lobby.players.length / 10) * 100}%` }}
            />
          </div>
        </div>

        {!isInLobby && (
          <Button
            onClick={() => onJoin(lobby.id)}
            disabled={isFull}
            variant={isFull ? 'secondary' : 'outline'}
            size="sm"
          >
            {isFull ? 'Full' : 'Join'}
          </Button>
        )}

        {isInLobby && (
          <span className="text-sm font-display text-primary">In Lobby</span>
        )}
      </div>
    </div>
  );
};
