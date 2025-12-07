export interface Player {
  id: string;
  nickname: string;
  level: number;
  createdAt: Date;
}

export interface Lobby {
  id: string;
  name: string;
  description?: string;
  password?: string;
  hostPlayerId: string;
  players: Player[];
  createdAt: Date;
}

export interface Match {
  id: string;
  lobbyId: string;
  teamA: Player[];
  teamB: Player[];
  createdAt: Date;
}

export interface GameContextType {
  currentPlayer: Player | null;
  lobbies: Lobby[];
  currentLobby: Lobby | null;
  currentMatch: Match | null;
  login: (nickname: string, level: number) => void;
  logout: () => void;
  createLobby: (name: string, description?: string, password?: string) => void;
  joinLobby: (lobbyId: string, password?: string) => boolean;
  leaveLobby: () => void;
  kickPlayer: (playerId: string) => void;
  deleteLobby: () => void;
  shuffleTeams: () => void;
  reshuffleTeams: () => void;
}
