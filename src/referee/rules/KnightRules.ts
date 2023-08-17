import { Piece, Position, TeamType } from "../../constants";
import { tileIsEmptyOrOccupiedByOpponent } from "./GeneralRles";

export const knightMove = (initialPosition: Position, desiredPosition: Position, team: TeamType, boardState: Piece[]): boolean =>{
    //MOVING LOGIC FOR KNIGHT
    for(let i = -1; i < 2; i+=2){
        for(let j = -1; j < 2; j+=2){
            // TOP & BOTTOM SIDE MOVEMENT
            if(desiredPosition.y - initialPosition.y === 2 * i){
                if(desiredPosition.x - initialPosition.x === j){
                    if(tileIsEmptyOrOccupiedByOpponent(desiredPosition, boardState, team)){
                       return true;
                    }
                }
            }    
            
            // RIGHT & LEFT SIDE MOVEMENT
            if(desiredPosition.x - initialPosition.x === 2 * i){
                if(desiredPosition.y - initialPosition.y === j){
                        if(tileIsEmptyOrOccupiedByOpponent(desiredPosition, boardState, team)){
                           return true;
                        }
                }
            }
        }
    }
    return false;
}