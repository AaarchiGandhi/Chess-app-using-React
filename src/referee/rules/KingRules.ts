import { Piece, Position, TeamType, samePosition } from "../../constants";
import { tileIsEmptyOrOccupiedByOpponent, tileIsOccupied } from "./GeneralRles";

export const kingMove = (initialPosition: Position, desiredPosition: Position, team: TeamType, boardState: Piece[]): boolean => {
    for(let i = 1 ; i < 2 ; i++){        

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