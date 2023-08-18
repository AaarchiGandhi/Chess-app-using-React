import { Piece, Position, TeamType, samePosition } from "../../constants";
import { tileIsEmptyOrOccupiedByOpponent, tileIsOccupied } from "./GeneralRles";

export const bishopMove = (initialPosition: Position, desiredPosition: Position, team: TeamType, boardState: Piece[]): boolean => {
    // MOVEMENT LOGIC & ATTACK LOGIC

       // Up right movemennt
       for(let i = 1 ; i < 8 ; i++ ){

           if(desiredPosition.x > initialPosition.x && desiredPosition.y > initialPosition.y){
               let passedPosition: Position = {x: initialPosition.x + i, y: initialPosition.y + i};
               // Check if file is destination tile
               if(samePosition(passedPosition, desiredPosition)){
                   // Dealing with destination tile
                   if(tileIsEmptyOrOccupiedByOpponent(passedPosition, boardState, team)){
                       return true;
                   }
               }else{
                   // Dealing with passing tile
                   if(tileIsOccupied(passedPosition , boardState)){
                       break;
                   }
               }
           }
       
       // Bottom right movement
           
       if(desiredPosition.x > initialPosition.x && desiredPosition.y < initialPosition.y){
           let passedPosition: Position = {x: initialPosition.x + i , y: initialPosition.y - i};
           if(samePosition(passedPosition, desiredPosition)){
               // Dealing with destination tile
               if(tileIsEmptyOrOccupiedByOpponent(passedPosition, boardState, team)){
                   return true;
               }
           }else{
               if(tileIsOccupied(passedPosition, boardState)){
                   break;
               }
           }
       }
           if(desiredPosition.x - initialPosition.x === i && desiredPosition.y - initialPosition.y === -i){
              return true;
           }

        // Bottom left movement
        if(desiredPosition.x < initialPosition.x && desiredPosition.y < initialPosition.y){
           let passedPosition: Position = {x: initialPosition.x - i , y: initialPosition.y - i};
           if(samePosition(passedPosition, desiredPosition)){
               // Dealing with destination tile
               if(tileIsEmptyOrOccupiedByOpponent(passedPosition, boardState, team)){
                   return true;
               }
           }else{
               if(tileIsOccupied(passedPosition, boardState)){
                   break;
               }
           }
       }
           
           if(desiredPosition.x - initialPosition.x === -i && desiredPosition.y - initialPosition.y === -i){
               return true;
           }     

       // Top left movement
           
       if(desiredPosition.x < initialPosition.x && desiredPosition.y > initialPosition.y){
           let passedPosition: Position = {x: initialPosition.x - i , y: initialPosition.y + i};
           if(samePosition(passedPosition, desiredPosition)){
               // Dealing with destination tile
               if(tileIsEmptyOrOccupiedByOpponent(passedPosition, boardState, team)){
                   return true;
               }
           }else{
               if(tileIsOccupied(passedPosition, boardState)){
                   break;
               }
           }
       }
           
       }
       return false;
}

export const getPossibleBishopMoves = (bishop : Piece, boardState: Piece[]) :Position[] =>{
    const possibleMoves : Position[] = [];

    // Upper Right Movement
    for(let i = 1 ; i < 8 ; i++ ){
        const destination: Position = {x: bishop.position.x + i, y: bishop.position.y + i};

        if(!tileIsOccupied(destination, boardState)){
            possibleMoves.push(destination);
        }else if(tileIsEmptyOrOccupiedByOpponent(destination, boardState, bishop.team)){
            possibleMoves.push(destination);
            break;
        }else{
            break;
        }
    }    

    // Upper Left Movement
    for(let i = 1 ; i < 8 ; i++ ){
        const destination: Position = {x: bishop.position.x - i, y: bishop.position.y + i};

        if(!tileIsOccupied(destination, boardState)){
            possibleMoves.push(destination);
        }else if(tileIsEmptyOrOccupiedByOpponent(destination, boardState, bishop.team)){
            possibleMoves.push(destination);
            break;
        }else{
            break;
        }
    }    

    // Bottom Left Movement
    for(let i = 1 ; i < 8 ; i++ ){
        const destination: Position = {x: bishop.position.x - i, y: bishop.position.y - i};

        if(!tileIsOccupied(destination, boardState)){
            possibleMoves.push(destination);
        }else if(tileIsEmptyOrOccupiedByOpponent(destination, boardState, bishop.team)){
            possibleMoves.push(destination);
            break;
        }else{
            break;
        }
    }  
    
    // Bottom Right Movement
    for(let i = 1 ; i < 8 ; i++ ){
        const destination: Position = {x: bishop.position.x + i, y: bishop.position.y - i};

        if(!tileIsOccupied(destination, boardState)){
            possibleMoves.push(destination);
        }else if(tileIsEmptyOrOccupiedByOpponent(destination, boardState, bishop.team)){
            possibleMoves.push(destination);
            break;
        }else{
            break;
        }
    }  


    return possibleMoves;
}