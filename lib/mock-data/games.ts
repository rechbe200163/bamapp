export const games = [
  {
    id: 1,
    title: 'Chess',
    description: 'Classic strategy board game played on an 8x8 grid.',
    mode: 'multiplayer',
    minPlayers: 2,
    maxPlayers: 2,
    rules:
      "Players take turns moving pieces. The goal is to checkmate the opponent's king.",
    scoreSystem: 'No score; win by checkmate.',
    imagePath: 'chess.jpg',
    gameTheme: '#8B5C2A',
  },
  {
    id: 2,
    title: 'Hit 8',
    description:
      'Ping pong ball bouncing game. Players try to bounce the ball across the table as many times as possible per round.',
    mode: 'multiplayer',
    minPlayers: 2,
    maxPlayers: 4,
    imagePath: 'hit-8.jpg',
    gameTheme: '#0074D9', // Changed to blue
    variants: [
      {
        id: 2.1,
        title: 'Bounce Blitz: 10-Round Challenge',
        rules:
          'Players take turns. In each round, the required number of bounces increases (round 1: 1 bounce, round 2: 2 bounces, etc.). If a player fails to reach the required bounces, the round ends for them. Play 10 rounds per player. Sum the successful bounces.',
        scoreSystem:
          'Total successful bounces over 10 rounds. Highest sum wins.',
      },
      {
        id: 2.2,
        title: 'Bounce Royale: Ultimate Single-Try Showdown',
        rules:
          'Players take turns. Each player has one try per turn to bounce the ball as many times as possible. The turn passes to the next player after each try.',
        scoreSystem: 'Highest number of bounces in a round try wins.',
      },
    ],
  },
  {
    id: 3,
    title: 'Beer Pong',
    description: 'Party game where players throw ping pong balls into cups.',
    mode: 'multiplayer',
    minPlayers: 2,
    maxPlayers: 4,
    rules:
      'Teams take turns throwing balls into cups. Remove cups when scored.',
    scoreSystem: 'Score by number of cups hit.',
    imagePath: 'beer-pong.jpg',
    gameTheme: '#FF0000',
  },
  {
    id: 4,
    title: 'Mensch ärgere dich nicht',
    description: 'German board game similar to Ludo.',
    mode: 'multiplayer',
    minPlayers: 2,
    maxPlayers: 4,
    rules:
      'Players race to move all pieces to the home area. Pieces can be sent back by opponents.',
    scoreSystem: 'Win by moving all pieces home.',
    imagePath: 'mensch-aergere-dich-nicht.jpg',
    gameTheme: '#008000', // Changed to dark green
  },
];
