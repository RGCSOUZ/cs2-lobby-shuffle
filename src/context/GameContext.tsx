import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Player, Lobby, Match, GameContextType } from '@/types/game';
import { toast } from 'sonner';

const GameContext = createContext<GameContextType | undefined>(undefined);

const generateId = () => Math.random().toString(36).substring(2, 15);

const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export const GameProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(() => {
    const saved = localStorage.getItem('cs2_player');
    return saved ? JSON.parse(saved) : null;
  });

  const [lobbies, setLobbies] = useState<Lobby[]>(() => {
    const saved = localStorage.getItem('cs2_lobbies');
    return saved ? JSON.parse(saved) : [];
  });

  const [currentLobby, setCurrentLobby] = useState<Lobby | null>(null);
  const [currentMatch, setCurrentMatch] = useState<Match | null>(null);

  useEffect(() => {
    if (currentPlayer) {
      localStorage.setItem('cs2_player', JSON.stringify(currentPlayer));
    } else {
      localStorage.removeItem('cs2_player');
    }
  }, [currentPlayer]);

  useEffect(() => {
    localStorage.setItem('cs2_lobbies', JSON.stringify(lobbies));
  }, [lobbies]);

  useEffect(() => {
    if (currentPlayer && currentLobby) {
      const updatedLobby = lobbies.find(l => l.id === currentLobby.id);
      if (updatedLobby) {
        setCurrentLobby(updatedLobby);
      } else {
        setCurrentLobby(null);
        setCurrentMatch(null);
      }
    }
  }, [lobbies, currentPlayer, currentLobby?.id]);

  const login = (nickname: string, level: number) => {
    const player: Player = {
      id: generateId(),
      nickname,
      level,
      createdAt: new Date(),
    };
    setCurrentPlayer(player);
    toast.success(`Welcome, ${nickname}!`);
  };

  const logout = () => {
    if (currentLobby) {
      leaveLobby();
    }
    setCurrentPlayer(null);
    toast.info('You have been logged out');
  };

  const createLobby = (name: string, description?: string, password?: string) => {
    if (!currentPlayer) return;

    const newLobby: Lobby = {
      id: generateId(),
      name,
      description,
      password,
      hostPlayerId: currentPlayer.id,
      players: [currentPlayer],
      createdAt: new Date(),
    };

    setLobbies(prev => [...prev, newLobby]);
    setCurrentLobby(newLobby);
    setCurrentMatch(null);
    toast.success(`Lobby "${name}" created!`);
  };

  const joinLobby = (lobbyId: string, password?: string): boolean => {
    if (!currentPlayer) return false;

    const lobby = lobbies.find(l => l.id === lobbyId);
    if (!lobby) {
      toast.error('Lobby not found');
      return false;
    }

    if (lobby.players.length >= 10) {
      toast.error('Lobby is full');
      return false;
    }

    if (lobby.players.some(p => p.id === currentPlayer.id)) {
      toast.error('You are already in this lobby');
      return false;
    }

    if (lobby.password && lobby.password !== password) {
      toast.error('Incorrect password');
      return false;
    }

    if (currentLobby) {
      leaveLobby();
    }

    setLobbies(prev =>
      prev.map(l =>
        l.id === lobbyId
          ? { ...l, players: [...l.players, currentPlayer] }
          : l
      )
    );

    const updatedLobby = { ...lobby, players: [...lobby.players, currentPlayer] };
    setCurrentLobby(updatedLobby);
    setCurrentMatch(null);
    toast.success(`Joined "${lobby.name}"!`);
    return true;
  };

  const leaveLobby = () => {
    if (!currentPlayer || !currentLobby) return;

    const isHost = currentLobby.hostPlayerId === currentPlayer.id;
    const remainingPlayers = currentLobby.players.filter(p => p.id !== currentPlayer.id);

    if (remainingPlayers.length === 0) {
      setLobbies(prev => prev.filter(l => l.id !== currentLobby.id));
    } else {
      const newHostId = isHost ? remainingPlayers[0].id : currentLobby.hostPlayerId;
      setLobbies(prev =>
        prev.map(l =>
          l.id === currentLobby.id
            ? { ...l, players: remainingPlayers, hostPlayerId: newHostId }
            : l
        )
      );
    }

    setCurrentLobby(null);
    setCurrentMatch(null);
    toast.info('Left the lobby');
  };

  const kickPlayer = (playerId: string) => {
    if (!currentPlayer || !currentLobby) return;
    if (currentLobby.hostPlayerId !== currentPlayer.id) {
      toast.error('Only the host can kick players');
      return;
    }

    if (playerId === currentPlayer.id) {
      toast.error('You cannot kick yourself');
      return;
    }

    const kickedPlayer = currentLobby.players.find(p => p.id === playerId);
    setLobbies(prev =>
      prev.map(l =>
        l.id === currentLobby.id
          ? { ...l, players: l.players.filter(p => p.id !== playerId) }
          : l
      )
    );

    if (kickedPlayer) {
      toast.success(`${kickedPlayer.nickname} has been kicked`);
    }
  };

  const deleteLobby = () => {
    if (!currentPlayer || !currentLobby) return;
    if (currentLobby.hostPlayerId !== currentPlayer.id) {
      toast.error('Only the host can delete the lobby');
      return;
    }

    setLobbies(prev => prev.filter(l => l.id !== currentLobby.id));
    setCurrentLobby(null);
    setCurrentMatch(null);
    toast.success('Lobby deleted');
  };

  const shuffleTeams = () => {
    if (!currentPlayer || !currentLobby) return;
    if (currentLobby.hostPlayerId !== currentPlayer.id) {
      toast.error('Only the host can shuffle teams');
      return;
    }

    if (currentLobby.players.length !== 10) {
      toast.error('Need exactly 10 players to shuffle teams');
      return;
    }

    const shuffled = shuffleArray(currentLobby.players);
    const match: Match = {
      id: generateId(),
      lobbyId: currentLobby.id,
      teamA: shuffled.slice(0, 5),
      teamB: shuffled.slice(5, 10),
      createdAt: new Date(),
    };

    setCurrentMatch(match);
    toast.success('Teams have been shuffled!');
  };

  const reshuffleTeams = () => {
    shuffleTeams();
  };

  return (
    <GameContext.Provider
      value={{
        currentPlayer,
        lobbies,
        currentLobby,
        currentMatch,
        login,
        logout,
        createLobby,
        joinLobby,
        leaveLobby,
        kickPlayer,
        deleteLobby,
        shuffleTeams,
        reshuffleTeams,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};
