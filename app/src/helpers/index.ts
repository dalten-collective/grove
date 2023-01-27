import { unixToDa, decToUd } from '@urbit/api'
import * as T from '@/types'

export const sigShip = (ship: string | T.Ship): T.Ship => {
  if (!ship) {
    return '~'
  }
  if (ship[0] === "~") {
    return ship as T.Ship;
  }
  return `~${ship}`;
}

export const trimShip = (ship: string) => {
  const len = ship.length
  if (len > 11) {
    return `${ ship.substring(0, 14) }...${ ship.substring(len - 13, len) }`
  }
  return ship
}

export const shipInSpat = (spat: T.Spat): T.Ship => {
  return spat.split('/')[0]
}

export const spaceInSpat = (spat: T.Spat): T.Space => {
  return spat.split('/')[1]
}

export const nowToUd = (): string => {
  return decToUd(unixToDa(Date.now()).toString())
}

export const secondsToUd = (sects: number): string => {
  return decToUd(unixToDa(sects).toString())
}
