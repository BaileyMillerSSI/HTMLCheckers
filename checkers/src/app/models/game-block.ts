import { GamePiece } from './game-piece';

export class GameBlock {

    public gamePiece: GamePiece = null;

    constructor(public x: number, public y: number, public width: number, public height: number,public teamColor: string)
    {

    }
}
