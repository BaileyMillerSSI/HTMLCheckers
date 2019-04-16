import { GamePiece } from './game-piece';

export class GameBlock {

    public gamePiece: GamePiece = null;

    constructor(public x: number, public y: number, public width: number, public height: number,public teamColor: string, public blockId:number)
    {

    }

    public getCenterPointData(): any
    {

        return {
            center: {
                x:this.x + (this.width/2),
                y: this.y + (this.height/2)
            },
            radius: this.width/3
        };
    }
}
