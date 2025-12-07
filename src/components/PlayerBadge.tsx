import { Player } from '@/types/game';
import { cn } from '@/lib/utils';
import { Crown, User } from 'lucide-react';

interface PlayerBadgeProps {
  player: Player;
  isHost?: boolean;
  isCurrentPlayer?: boolean;
  showLevel?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const PlayerBadge = ({ 
  player, 
  isHost = false, 
  isCurrentPlayer = false,
  showLevel = true,
  size = 'md' 
}: PlayerBadgeProps) => {
  const sizeClasses = {
    sm: 'text-xs px-2 py-1',
    md: 'text-sm px-3 py-1.5',
    lg: 'text-base px-4 py-2',
  };

  const iconSizes = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };

  return (
    <div 
      className={cn(
        'inline-flex items-center gap-2 rounded-lg border transition-all duration-200',
        sizeClasses[size],
        isCurrentPlayer 
          ? 'bg-primary/20 border-primary/50 text-primary' 
          : 'bg-secondary/50 border-border/50 text-foreground',
        isHost && 'ring-1 ring-primary/30'
      )}
    >
      {isHost ? (
        <Crown className={cn(iconSizes[size], 'text-primary')} />
      ) : (
        <User className={cn(iconSizes[size], 'text-muted-foreground')} />
      )}
      <span className="font-medium truncate max-w-[100px]">{player.nickname}</span>
      {showLevel && (
        <span className={cn(
          'font-display px-1.5 py-0.5 rounded text-xs',
          'bg-muted/50 text-muted-foreground'
        )}>
          LVL {player.level}
        </span>
      )}
    </div>
  );
};
