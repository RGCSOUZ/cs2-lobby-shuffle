import { Match } from '@/types/game';
import { PlayerBadge } from './PlayerBadge';
import { Shield, Swords } from 'lucide-react';

interface TeamDisplayProps {
  match: Match;
}

export const TeamDisplay = ({ match }: TeamDisplayProps) => {
  const totalLevelA = match.teamA.reduce((sum, p) => sum + p.level, 0);
  const totalLevelB = match.teamB.reduce((sum, p) => sum + p.level, 0);

  return (
    <div className="grid md:grid-cols-2 gap-6 animate-slide-in">
      {/* Team A */}
      <div className="team-a-bg rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-team-a/20 flex items-center justify-center">
              <Shield className="w-5 h-5 text-team-a" />
            </div>
            <div>
              <h3 className="font-display text-lg font-bold text-team-a">TEAM A</h3>
              <p className="text-xs text-muted-foreground">Counter-Terrorists</p>
            </div>
          </div>
          <div className="text-right">
            <span className="font-display text-sm text-muted-foreground">Total Level</span>
            <p className="font-display text-xl font-bold text-team-a">{totalLevelA}</p>
          </div>
        </div>
        
        <div className="space-y-2">
          {match.teamA.map((player) => (
            <div 
              key={player.id}
              className="flex items-center justify-between p-3 rounded-lg bg-background/30"
            >
              <span className="font-medium">{player.nickname}</span>
              <span className="font-display text-sm text-muted-foreground">
                LVL {player.level}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Team B */}
      <div className="team-b-bg rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-team-b/20 flex items-center justify-center">
              <Swords className="w-5 h-5 text-team-b" />
            </div>
            <div>
              <h3 className="font-display text-lg font-bold text-team-b">TEAM B</h3>
              <p className="text-xs text-muted-foreground">Terrorists</p>
            </div>
          </div>
          <div className="text-right">
            <span className="font-display text-sm text-muted-foreground">Total Level</span>
            <p className="font-display text-xl font-bold text-team-b">{totalLevelB}</p>
          </div>
        </div>
        
        <div className="space-y-2">
          {match.teamB.map((player) => (
            <div 
              key={player.id}
              className="flex items-center justify-between p-3 rounded-lg bg-background/30"
            >
              <span className="font-medium">{player.nickname}</span>
              <span className="font-display text-sm text-muted-foreground">
                LVL {player.level}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
