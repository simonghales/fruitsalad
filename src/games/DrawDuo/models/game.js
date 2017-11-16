interface USER {
  id: number,
  name: string,
  image: string,
}

interface SESSION {
  host: number,
  users: USER[],
  players: USER[],
  gameInPlay: string,
}