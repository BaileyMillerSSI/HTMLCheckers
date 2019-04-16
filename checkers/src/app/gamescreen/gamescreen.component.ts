import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { GameBlock } from '../models/game-block';
import { GamePiece } from '../models/game-piece';

@Component({
  selector: 'app-gamescreen',
  templateUrl: './gamescreen.component.html',
  styleUrls: ['./gamescreen.component.scss']
})
export class GamescreenComponent implements AfterViewInit {

  @ViewChild('board') board : ElementRef;
  private context: CanvasRenderingContext2D;


  private getWidth():number
  {
    return (<HTMLCanvasElement>this.board.nativeElement).width;
  }

  private getHeight():number
  {
    return (<HTMLCanvasElement>this.board.nativeElement).height;
  }

  private getPieceSize(totalSize: number, gridSize: number): number
  {
    return totalSize/gridSize;
  }

  private primaryColor = "white";
  private secondaryColor = "black";
  private gridSize = 8;
  private pieceCount = 12;

  private spaces: GameBlock[] = [
      
  ];

  constructor() 
  { }

  ngAfterViewInit() {
    this.context = (<HTMLCanvasElement>this.board.nativeElement).getContext('2d');

    this.draw(true);
  }

  private Test()
  {
    this.draw(false);
  }

  private draw(init: boolean):void
  {
    
    this.drawOutline();

    this.drawBlocks();

    this.drawPlayers(init);
  }

  private drawPlayers(init: boolean)
  {
    if (init) {
      let selectorRange = (this.pieceCount * 2);
      // First x Pieces
      let primaryBlock = this.spaces.slice(0, selectorRange).filter(x => x.teamColor === this.secondaryColor);
      for (let i = 0; i < 12; i++) {
        this.context.fillStyle = this.primaryColor;
        let block = primaryBlock[i];
        let data = block.getCenterPointData();
        this.context.beginPath();
        this.context.arc(data.center.x, data.center.y, data.radius, 0, 2 * Math.PI);
        this.context.fill();
        block.gamePiece = new GamePiece(data.center.x, data.center.y, data.radius, data.radius);

        this.updateBlock(block);
      }


      // Last x Pieces
      let secondaryBlocks = this.spaces.slice(this.spaces.length - 1 - selectorRange, this.spaces.length - 1).filter(x => x.teamColor === this.secondaryColor);
      for (let i = 0; i < 12; i++) {
        this.context.fillStyle = "gray";
        const block = secondaryBlocks[i];
        let data = block.getCenterPointData();
        this.context.beginPath();
        this.context.arc(data.center.x, data.center.y, data.radius, 0, 2 * Math.PI);
        this.context.fill();
        block.gamePiece = new GamePiece(data.center.x, data.center.y, data.radius, data.radius);
        this.updateBlock(block);
      }
    }else
    {
      for (let i = 0; i < this.spaces.length; i++) {
        const block = this.spaces[i];
        if(block.gamePiece != null)
        {
          this.context.fillStyle = block.teamColor;
          this.context.beginPath();
          this.context.arc(block.gamePiece.x, block.gamePiece.y, block.gamePiece.width, 0, 2 * Math.PI);
          this.context.fill();
        }
      }
    }
  }

  private updateBlock(block: GameBlock) : void
  {
    let index = this.spaces.findIndex(v=>v.blockId === block.blockId);

    this.spaces = [
      ...this.spaces.slice(0, index),
      block,
      ...this.spaces.slice(index + 1),
    ];
  }

  private drawBlocks()
  {
    let teamId = 0;

    let width = this.getWidth();
    let height = this.getHeight();

    let pSizeW = this.getPieceSize(width, this.gridSize);
    let pSizeH = this.getPieceSize(height, this.gridSize);

    let blockNum = 1;
    for (let w = 0; w < this.gridSize; w++) {
      for (let h = 0; h < this.gridSize; h++) {
        
        this.spaces.push(new GameBlock(pSizeW*h, pSizeH*w, pSizeW, pSizeH, teamId % 2 === 0? this.primaryColor : this.secondaryColor, blockNum));

        teamId+=1;
      }
      teamId += 1;
    }

    for (let blocks = 0; blocks < this.spaces.length; blocks++) {
      const block = this.spaces[blocks];
      this.context.fillStyle = block.teamColor;
      this.context.fillRect(block.x, block.y, block.width, block.height);
    }
  }

  private drawOutline()
  {
    this.context.strokeStyle = this.secondaryColor;

    let width = this.getWidth();
    let height = this.getHeight();

    let pSizeW = this.getPieceSize(width, this.gridSize);
    let pSizeH = this.getPieceSize(height, this.gridSize);

    for (let i = 0; i < this.gridSize; i++) 
    {
      for (let j = 0; j < this.gridSize; j++) 
      {
        this.context.moveTo(0, pSizeW*j);
        this.context.lineTo(width, pSizeW*j);
        this.context.stroke();

        this.context.moveTo(pSizeH*i,0);
        this.context.lineTo(pSizeH*i,height);
        this.context.stroke();
      }
    }
  }

}
