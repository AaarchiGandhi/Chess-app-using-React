import { Piece, Position, TeamType, samePosition } from "../../constants";
import { tileIsEmptyOrOccupiedByOpponent, tileIsOccupied } from "./GeneralRles";

export const queenMove = (initialPosition: Position, desiredPosition: Position, team: TeamType, boardState: Piece[]): boolean =>{
        
    for(let i = 1 ; i < 8 ; i++){        

        let multiplierx = (desiredPosition.x < initialPosition.x) ? -1 : (desiredPosition.x > initialPosition.x) ? 1 : 0;
        let multipliery = (desiredPosition.y < initialPosition.y) ? -1 : (desiredPosition.y > initialPosition.y) ? 1 : 0;
       
        if(desiredPosition.y < initialPosition.y){
            multipliery = -1;
        }else if(desiredPosition.y > initialPosition.y){
            multipliery = 1;
        }else{
            multipliery = 0;
        }

        let passedPosition: Position = {x: initialPosition.x + (i * multiplierx), y: initialPosition.y + (i * multipliery)};
        if(samePosition(passedPosition, desiredPosition)){
            if(tileIsEmptyOrOccupiedByOpponent(passedPosition, boardState, team)){
                return true;
            }
        }else{
            if(tileIsOccupied(passedPosition, boardState)){
                break;
            }
        }
    }
    return false;
}

export const getPossibleQueenMoves = (queen : Piece, boardState: Piece[]) : Position[] => {
    const possibleMoves : Position[] = [];

    // TOP MOVEMENT
    for(let i = 1 ; i < 8 ; i++ ){
        const destination: Position = {x: queen.position.x, y: queen.position.y + i };

        if(!tileIsOccupied(destination, boardState)){
            possibleMoves.push(destination);
        }else if(tileIsEmptyOrOccupiedByOpponent(destination, boardState, queen.team)){
            possibleMoves.push(destination);
            break;
        }else{
            break;
        }
    }

    // BOTTOM MOVEMENT
    for(let i = 1 ; i < 8 ; i++ ){
        const destination: Position = {x: queen.position.x, y: queen.position.y - i };

        if(!tileIsOccupied(destination, boardState)){
            possibleMoves.push(destination);
        }else if(tileIsEmptyOrOccupiedByOpponent(destination, boardState, queen.team)){
            possibleMoves.push(destination);
            break;
        }else{
            break;
        }
    }

    // RIGHT MOVEMENT
    for(let i = 1 ; i < 8 ; i++ ){
        const destination: Position = {x: queen.position.x + i, y: queen.position.y };

        if(!tileIsOccupied(destination, boardState)){
            possibleMoves.push(destination);
        }else if(tileIsEmptyOrOccupiedByOpponent(destination, boardState, queen.team)){
            possibleMoves.push(destination);
            break;
        }else{
            break;
        }
    }

    // LEFT MOVEMENT
    for(let i = 1 ; i < 8 ; i++ ){
        const destination: Position = {x: queen.position.x - i, y: queen.position.y };

        if(!tileIsOccupied(destination, boardState)){
            possibleMoves.push(destination);
        }else if(tileIsEmptyOrOccupiedByOpponent(destination, boardState, queen.team)){
            possibleMoves.push(destination);
            break;
        }else{
            break;
        }
    }

    // Upper Right Movement
    for(let i = 1 ; i < 8 ; i++ ){
        const destination: Position = {x: queen.position.x + i, y: queen.position.y + i};

        if(!tileIsOccupied(destination, boardState)){
            possibleMoves.push(destination);
        }else if(tileIsEmptyOrOccupiedByOpponent(destination, boardState, queen.team)){
            possibleMoves.push(destination);
            break;
        }else{
            break;
        }
    }    

    // Upper Left Movement
    for(let i = 1 ; i < 8 ; i++ ){
        const destination: Position = {x: queen.position.x - i, y: queen.position.y + i};

        if(!tileIsOccupied(destination, boardState)){
            possibleMoves.push(destination);
        }else if(tileIsEmptyOrOccupiedByOpponent(destination, boardState, queen.team)){
            possibleMoves.push(destination);
            break;
        }else{
            break;
        }
    }    

    // Bottom Left Movement
    for(let i = 1 ; i < 8 ; i++ ){
        const destination: Position = {x: queen.position.x - i, y: queen.position.y - i};

        if(!tileIsOccupied(destination, boardState)){
            possibleMoves.push(destination);
        }else if(tileIsEmptyOrOccupiedByOpponent(destination, boardState, queen.team)){
            possibleMoves.push(destination);
            break;
        }else{
            break;
        }
    }  
    
    // Bottom Right Movement
    for(let i = 1 ; i < 8 ; i++ ){
        const destination: Position = {x: queen.position.x + i, y: queen.position.y - i};

        if(!tileIsOccupied(destination, boardState)){
            possibleMoves.push(destination);
        }else if(tileIsEmptyOrOccupiedByOpponent(destination, boardState, queen.team)){
            possibleMoves.push(destination);
            break;
        }else{
            break;
        }
    }  

    return possibleMoves;
}