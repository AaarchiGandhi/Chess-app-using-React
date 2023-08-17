import { useRef, useState } from 'react';
import Tile from '../Tile/Tile';
import './Chessboard.css';
import { HORIZONTAL_AXIS, VERTICAL_AXIS,GRID_SIZE, Piece, TeamType, PieceType, initialBoardState , Position, samePosition} from '../../constants';
import Referee from '../../referee/Referee';

export default function Chessboard(){
    const [activePiece, setActivePiece] = useState<HTMLElement | null>(null);
    const [promotionPawn, setPromotionPawn] = useState<Piece>();
    const[grabPosition, setGrabPosition] = useState<Position>({ x:-1, y:-1 });
    const [pieces, setPieces] = useState<Piece[]>(initialBoardState);
    const chessboardRef = useRef<HTMLDivElement>(null);
    const modalRef = useRef<HTMLDivElement>(null); 
    const referee = new Referee();
   

function grabPiece(e: React.MouseEvent){
    const element = e.target as HTMLElement;
    const chessboard = chessboardRef.current;
    if(element.classList.contains("chess-piece") && chessboard){
        const grabx= Math.floor((e.clientX - chessboard.offsetLeft) / GRID_SIZE);
        const graby= Math.abs(Math.ceil((e.clientY - chessboard.offsetTop - 800) / GRID_SIZE));
        setGrabPosition({x: grabx, y: graby}); 
        
        const x = e.clientX - GRID_SIZE / 2;
        const y = e.clientY - GRID_SIZE / 2;
        element.style.position = "absolute"; 
        element.style.left = `${x}px`;
        element.style.top = `${y}px`;

        setActivePiece(element);
    }
}

function movepiece(e: React.MouseEvent){
    const chessboard = chessboardRef.current;
    if(activePiece && chessboard){
        const minX = chessboard.offsetLeft - 25;
        const minY = chessboard.offsetTop - 25;
        const maxX = chessboard.offsetLeft + chessboard.clientWidth - 75;
        const maxY = chessboard.offsetTop + chessboard.clientHeight - 75;
        const x = e.clientX - 50;
        const y = e.clientY - 50;
        activePiece.style.position = "absolute"; 
        
        // If x smaller than minimum amount
        if(x < minX){
            activePiece.style.left = `${minX}px`;
        } 
        // If x is bigger than maximum amount
        else if(x > maxX){
            activePiece.style.left = `${maxX}px`;
        }
        // if x is in the constraints
        else{
            activePiece.style.left = `${x}px`;
        }

        // If y smaller than minimum amount
        if(y < minY){
            activePiece.style.top = `${minY}px`;
        }
        // If y is bigger than maximum amount
        else if(y > maxY){
            activePiece.style.top = `${maxY}px`;
        }
         // if y is in the constraints
        else{
            activePiece.style.top = `${y}px`;
        }

        activePiece.style.left = x < minX ?  `${minX}px` : `${x}px`;
        activePiece.style.top = y < minY ? `${minY}px` : `${y}px`;

    }
}

function dropPiece(e : React.MouseEvent){
    const chessboard = chessboardRef.current;
    if(activePiece && chessboard){
        const x = Math.floor((e.clientX - chessboard.offsetLeft) / GRID_SIZE);
        const y = Math.abs(Math.ceil((e.clientY - chessboard.offsetTop - 800) / GRID_SIZE));

        const currentPiece = pieces.find((p) => samePosition(p.position, grabPosition));

        if(currentPiece){
            const validMove = referee.isValidMove(grabPosition,{ x, y } , currentPiece.type, currentPiece.team ,pieces);
            
            const isEnPassantMove = referee.isEnPassantMove(grabPosition,{ x, y }, currentPiece.type, currentPiece.team, pieces);
            const pawnDirection = currentPiece.team === TeamType.OUR ? 1 : -1;

            if(isEnPassantMove){
                const updatesPieces = pieces.reduce((results , piece) =>{
                    if(samePosition(piece.position, grabPosition)){
                        piece.enPassant = false;
                        piece.position.x = x;
                        piece.position.y = y;

                        let promotionRow = (piece.team === TeamType.OUR) ? 7 : 0;

                        if(y === promotionRow){
                            modalRef.current?.classList.remove("hidden");
                            setPromotionPawn(piece);
                        }

                        results.push(piece);
                    }else if(
                        !samePosition(piece.position, {x, y: y- pawnDirection })
                    ) {
                        if(piece.type === PieceType.PAWN){
                            piece.enPassant = false;
                        }
                        results.push(piece)
                    }

                    return results;
                },[] as Piece[])

                setPieces(updatesPieces);
            }else if(validMove){
                // UPDATES THE PIECE POSITION   
                // AND IF PIECE IS ATTACKED REMOVES IT  
                
                const updatesPieces = pieces.reduce((results, piece) => {
                    if(samePosition(piece.position, grabPosition)){
                        //SPECIAL MOVE
                        piece.enPassant = 
                            Math.abs(grabPosition.y - y) === 2 && 
                            piece.type === PieceType.PAWN;
                        
                        piece.position.x = x;
                        piece.position.y =y;

                        let promotionRow = (piece.team === TeamType.OUR) ? 7 : 0;

                        if(y === promotionRow && piece.type === PieceType.PAWN ){
                            modalRef.current?.classList.remove("hidden");
                            setPromotionPawn(piece);
                        }

                        results.push(piece);
                    }else if(!(samePosition(piece.position, {x, y}))){
                        if(piece.type === PieceType.PAWN){
                            piece.enPassant = false;
                        }
                        results.push(piece)
                    }
                    

                    return results;
                }, [] as Piece[]);

            setPieces(updatesPieces);

        }else{
            // RESETS THE PIECE POSITION
            activePiece.style.position = 'relative';
            activePiece.style.removeProperty("top");
            activePiece.style.removeProperty("left");
        }
    }
        setActivePiece(null);
    }
}

    function promotePawn(pieceType : PieceType){
        if(promotionPawn === undefined){
            return;
        }
        const updatedPieces = pieces.reduce((results , piece) => {
            if(samePosition(piece.position, promotionPawn.position)){
                piece.type = pieceType;
                const teamType = (piece.team === TeamType.OUR) ? "w" : "b";
                let image = "";
                switch(pieceType){
                    case PieceType.ROOK : {
                        image = "rook";
                        break;
                    }
                    case PieceType.BISHOP : {
                        image = "bishop";
                        break;
                    }
                    case PieceType.QUEEN : {
                        image = "queen";
                        break;
                    }
                    case PieceType.KNIGHT : {
                        image = "knight";
                        break;
                    }
                }
                piece.image = `assets/images/${image}_${teamType}.png`;
            }
            results.push(piece);

            return results;
        }, [] as Piece[])

        setPieces(updatedPieces);

        modalRef.current?.classList.add("hidden");
    }

    function promotionTeamType(){
        return (promotionPawn?.team === TeamType.OUR) ? "w" : "b";
    }
    let board = [];

    for(let j = VERTICAL_AXIS.length - 1 ; j >= 0 ; j--){
        for(let i = 0 ; i < HORIZONTAL_AXIS.length ; i++){

            const number = i + j + 2;
            const piece = pieces.find(p => samePosition(p.position, {x: i, y: j}));
            let image = piece ? piece.image : undefined;

            board.push(<Tile key = {`${j},${i}`} image = {image} number= {number} />)
        }
    }
    return (
            <>
                <div id = "pawn-promotion-modal" className="hidden" ref={modalRef}>
                    <div className='modal-body'>

                  <img onClick={() => promotePawn(PieceType.ROOK)} src = {`/assets/images/rook_${promotionTeamType()}.png`}/>
                  <img onClick={() => promotePawn(PieceType.BISHOP)} src = {`/assets/images/bishop_${promotionTeamType()}.png`}/>
                  <img onClick={() => promotePawn(PieceType.KNIGHT)}  src = {`/assets/images/knight_${promotionTeamType()}.png`}/>
                  <img onClick={() => promotePawn(PieceType.QUEEN)}  src = {`/assets/images/queen_${promotionTeamType()}.png`}/>
                </div>

                </div>
                    <div onMouseMove={(e) => movepiece(e)} 
                        onMouseDown={(e) => grabPiece(e)} 
                        onMouseUp = {(e) => dropPiece(e)}
                        id = "chessboard" 
                        ref = {chessboardRef}
                        >
                        {board}
                        </div>
            </>
    );
};