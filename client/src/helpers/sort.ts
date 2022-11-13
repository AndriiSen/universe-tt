import { IPlayer } from "../constants"

const sortDescending = (arr: IPlayer[]) => {
  return arr.sort((a: IPlayer, b: IPlayer) => b.score - a.score)
}

const sortAscending = (arr: IPlayer[]) => {
  return arr.sort((a: IPlayer, b: IPlayer) => a.score - b.score)
}

export const sortByScore = (isAscendingOrder: any, players: IPlayer[]) => {
  return isAscendingOrder ? sortAscending(players) : sortDescending(players)
}