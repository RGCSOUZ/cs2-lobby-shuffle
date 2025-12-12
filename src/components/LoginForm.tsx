import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useGame } from '@/context/GameContext';
import { Gamepad2, Swords, Target } from 'lucide-react';

export const LoginForm = () => {
  const { login } = useGame();
  const [nickname, setNickname] = useState('');
  const [level, setLevel] = useState(1);
  const [errors, setErrors] = useState<{ nickname?: string; level?: string }>({});

  const validate = () => {
    const newErrors: { nickname?: string; level?: string } = {};
    const trimmedNickname = nickname.trim();
    
    if (!trimmedNickname) {
      newErrors.nickname = 'Nickname é obrigatório';
    } else if (trimmedNickname.length < 2) {
      newErrors.nickname = 'Nickname deve ter pelo menos 2 caracteres';
    } else if (trimmedNickname.length > 20) {
      newErrors.nickname = 'Nickname deve ter menos de 20 caracteres';
    }

    if (isNaN(level) || level < 1 || level > 20) {
      newErrors.level = 'Level deve estar entre 1 e 20';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedNickname = nickname.trim();
    
    // Se não tiver nickname, usa um nome aleatório para facilitar teste
    if (!trimmedNickname) {
      const randomName = `Player${Math.floor(Math.random() * 9999)}`;
      login(randomName, level);
      return;
    }
    
    if (validate()) {
      login(trimmedNickname, level);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-secondary/20" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      
      <div className="relative z-10 w-full max-w-md">
        {/* Logo section */}
        <div className="text-center mb-8 animate-slide-in">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-primary/10 border border-primary/30 mb-6 animate-pulse-glow">
            <Target className="w-10 h-10 text-primary" />
          </div>
          <h1 className="font-display text-4xl font-bold tracking-wider mb-2 glow-text">
            CS2 <span className="text-primary">LOBBIES</span>
          </h1>
          <p className="text-muted-foreground">Encontre seu time. Domine o jogo.</p>
        </div>

        {/* Login card */}
        <div className="gaming-card p-8 animate-slide-in" style={{ animationDelay: '0.1s' }}>
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="nickname" className="font-display text-sm tracking-wide">
                APELIDO
              </Label>
              <div className="relative">
                <Gamepad2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="nickname"
                  type="text"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSubmit(e)}
                  placeholder="Digite seu apelido"
                  className="pl-11 h-12 bg-secondary/50 border-border/50 focus:border-primary focus:ring-primary/20"
                  maxLength={20}
                />
              </div>
              {errors.nickname && (
                <p className="text-destructive text-sm">{errors.nickname}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="level" className="font-display text-sm tracking-wide">
                NÍVEL (1-20)
              </Label>
              <div className="relative">
                <Swords className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="level"
                  type="number"
                  min={1}
                  max={20}
                  value={level}
                  onChange={(e) => setLevel(parseInt(e.target.value) || 1)}
                  className="pl-11 h-12 bg-secondary/50 border-border/50 focus:border-primary focus:ring-primary/20"
                />
              </div>
              {errors.level && (
                <p className="text-destructive text-sm">{errors.level}</p>
              )}
              {/* Level indicator */}
              <div className="flex items-center gap-2 mt-3">
                <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-primary/60 to-primary transition-all duration-300"
                    style={{ width: `${(level / 20) * 100}%` }}
                  />
                </div>
                <span className="text-sm font-display text-primary">{level}</span>
              </div>
            </div>

            <Button 
              type="button" 
              variant="gaming" 
              className="w-full h-12"
              onClick={handleSubmit}
            >
              Entrar na Arena
            </Button>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-muted-foreground text-sm mt-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          Sem necessidade de conta. Escolha um nome e jogue.
        </p>
      </div>
    </div>
  );
};
