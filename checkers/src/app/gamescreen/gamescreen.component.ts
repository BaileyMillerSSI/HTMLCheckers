import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { GameBlock } from '../models/game-block';

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

    this.draw();
  }


  private draw():void
  {
    
    this.drawOutline();

    this.drawSpaces();

    this.drawPlayers();
  }

  private drawPlayers()
  {

    let selectorRange = (this.pieceCount*2);
    // First x Pieces
    let primaryPieces = this.spaces.slice(0, selectorRange).filter(x=>x.teamColor === this.primaryColor);

    let rowNum = 1;

    // Draw primary pieces
    this.context.fillStyle = this.primaryColor;
    for (let w = 0; w < selectorRange/this.gridSize; w++) {
      
      for (let h = 0; h < selectorRange; h++) {
        let baseLine = primaryPieces[0].x + (primaryPieces[0].width/2);


        if(w % 2 === 0)
        {
          for (let numInRow = 0; numInRow < 4; numInRow++) {
            this.context.beginPath();
            this.context.arc(baseLine + (baseLine * (this.pieceCount - (4 * numInRow))) +primaryPieces[0].width,baseLine*rowNum ,primaryPieces[0].width/3,0, 2 * Math.PI);
            
            this.context.fill();
          }
        }else
        {
          for (let numInRow = 0; numInRow < 4; numInRow++) {
            this.context.beginPath();
            this.context.arc(baseLine*3 + (baseLine * (this.pieceCount - (4 * numInRow)))-primaryPieces[0].width ,baseLine*rowNum ,primaryPieces[0].width/3,0, 2 * Math.PI);
            
            this.context.fill();
          }
        }
      }

      rowNum+=2;
    }

    // Last x Pieces
    let secondaryPieces = this.spaces.slice(this.spaces.length-1-selectorRange, this.spaces.length-1).filter(x=>x.teamColor === this.secondaryColor);

    // Draw primary pieces
    rowNum = 1;
    this.context.fillStyle = this.primaryColor;
    for (let w = 0; w < selectorRange/this.gridSize; w++) {
      
      for (let h = 0; h < selectorRange; h++) {
        let baseLine = secondaryPieces[0].x + (secondaryPieces[0].width/2);

        if(w % 2 === 0)
        {
          if (w == 2) {
            let xAdjustment = 0
            for (let numInRow = 0; numInRow < 4; numInRow++) {
              this.context.beginPath();
              this.context.arc(baseLine - (secondaryPieces[0].width * xAdjustment) - secondaryPieces[0].width, baseLine - secondaryPieces[0].width*2, secondaryPieces[0].width/3, 0, 2 * Math.PI);

              this.context.fill();

              xAdjustment += 2;
            }
          } else {
            let xAdjustment = 0
            for (let numInRow = 0; numInRow < 4; numInRow++) {
              this.context.beginPath();
              this.context.arc(baseLine - (secondaryPieces[0].width * xAdjustment) - secondaryPieces[0].width, baseLine, secondaryPieces[0].width/3, 0, 2 * Math.PI);

              this.context.fill();

              xAdjustment += 2;
            }
          }
        }else
        {
          let xAdjustment = 0
          for (let numInRow = 0; numInRow < 4; numInRow++) {
            this.context.beginPath();
            this.context.arc(baseLine - (secondaryPieces[0].width * xAdjustment), baseLine-secondaryPieces[0].height, 23.3, 0, 2 * Math.PI);

            this.context.fill();

            xAdjustment += 2;
          }
        }
      }

      rowNum+=2;
    }
  }

  private drawSpaces()
  {
    let teamId = 0;

    let width = this.getWidth();
    let height = this.getHeight();

    let pSizeW = this.getPieceSize(width, this.gridSize);
    let pSizeH = this.getPieceSize(height, this.gridSize);

    
    for (let w = 0; w < this.gridSize; w++) {
      for (let h = 0; h < this.gridSize; h++) {
        
        this.spaces.push(new GameBlock(pSizeW*h, pSizeH*w, pSizeW, pSizeH, teamId % 2 === 0? this.primaryColor : this.secondaryColor));

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
