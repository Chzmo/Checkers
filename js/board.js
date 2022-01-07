var GameBoard = {};

GameBoard.pieces = new Array(BRD_SQ_NUM);
GameBoard.side = COLOURS.WHITE;
GameBoard.hisPly = 0;
GameBoard.ply = 0;
GameBoard.material = new Array(2); // WHITE,BLACK material of pieces
GameBoard.pceNum = new Array(5); // indexed by Pce
GameBoard.pList = new Array(5 * 12);
GameBoard.posKey = 0;
GameBoard.moveList = new Array(MAXDEPTH * MAXPOSITIONMOVES);
GameBoard.moveScores = new Array(MAXDEPTH * MAXPOSITIONMOVES);
GameBoard.moveListStart = new Array(MAXDEPTH);

function PrintBoard() {
	var sq,file,rank,piece;

	[
	11,	12,	13,	14,	15,	16,	17,	18,
	21,	22,	23,	24,	25,	26,	27,	28,
	31,	32,	33,	34,	35,	36,	37,	38,
	41,	42,	43,	44,	45,	46,	47,	48,
	51,	52,	53,	54,	55,	56,	57,	58,
	61,	62,	63,	64,	65,	66,	67,	68,
	71,	72,	73,	74,	75,	76,	77,	78,
	81,	82,	83,	84,	85,	86,	87,	88,
	]

	console.log("\nGame Board:\n");
	for(rank = RANKS.RANK_1; rank <= RANKS.RANK_8; rank++) {
		var line =(RankChar[rank] + "  ");
		for(file = FILES.FILE_A; file <= FILES.FILE_H; file++) {
			sq = FR2SQ(file,rank);
			piece = GameBoard.pieces[sq];

			 if (piece == SQUARES.OFFBOARD){
				piece = PIECES.EMPTY;
			}
			line += (" " + PceChar[piece] + " ");
		}
		console.log(line);
	}
	
	console.log("");
	var line = "   ";
	for(file = FILES.FILE_A; file <= FILES.FILE_H; file++) {
		line += (' ' + FileChar[file] + ' ');	
	}
	
	console.log(line);
	console.log("side:" + SideChar[GameBoard.side] );
	line = "";	
	console.log("key:" + GameBoard.posKey.toString(16));
}

function GeneratePosKey() {
	var sq = 0;
	var finalKey = 0;
	var piece = PIECES.EMPTY;
	for(sq = 0; sq < BRD_SQ_NUM; ++sq) {
		piece = GameBoard.pieces[sq];
		if(piece != PIECES.EMPTY && piece != SQUARES.OFFBOARD) {			
			finalKey ^= PieceKeys[(piece * 100) + sq];
		}		
	}

	if(GameBoard.side == COLOURS.WHITE) {
		finalKey ^= SideKey;
	}
	
	return finalKey;
	
}

function PrintPieceLists() {

	var piece, pceNum;
	
	for(piece = PIECES.WM; piece <= PIECES.BK; ++piece) {
		for(pceNum = 0; pceNum < GameBoard.pceNum[piece]; ++pceNum) {
			console.log('Piece ' + PceChar[piece] + ' on ' + PrSq( GameBoard.pList[PCEINDEX(piece,pceNum)] ));
		}
	}

}

function UpdateListsMaterial() {	
	
	var piece,sq,index,colour;

	for(index = 0; index < 5 * 100; ++index) {
		GameBoard.pList[index] = PIECES.EMPTY;
	}
	
	for(index = 0; index < 2; ++index) {		
		GameBoard.material[index] = 0;		
	}	
	
	for(index = 0; index < 5; ++index) {
		GameBoard.pceNum[index] = 0;
	}

	for(index = 0; index < 64; ++index) {
		sq = SQ100(index);
		piece = GameBoard.pieces[sq];

		if(piece != PIECES.EMPTY && piece != SQUARES.OFFBOARD) {

			colour = PieceCol[piece];		
			
			GameBoard.material[colour] += PieceVal[piece];
			GameBoard.pList[PCEINDEX(piece,GameBoard.pceNum[piece])] = sq;
			GameBoard.pceNum[piece]++;			
		}
	}
	PrintPieceLists();	
}

function ResetBoard() {
	
	var index = 0;
	
	for(index = 0; index < BRD_SQ_NUM; ++index) {
		GameBoard.pieces[index] = SQUARES.OFFBOARD;
	}

	for(index = 0; index < 64; ++index) {
		GameBoard.pieces[SQ100(index)] = PIECES.EMPTY;
	}

	GameBoard.side = COLOURS.BOTH;	
	GameBoard.ply = 0;
	GameBoard.hisPly = 0;
	GameBoard.posKey = 0;
	GameBoard.moveListStart[GameBoard.ply] = 0;
	
}

function ParseFen(fen) {

	ResetBoard();
	
	var rank = RANKS.RANK_1;
    var file = FILES.FILE_A;
    var piece = 0;
    var count = 0;
    var i = 0;  
	var sq100 = 0;
	var fenCnt = 0; // fen[fenCnt]

	//M_M_M_M_/_M_M_M_M/M_M_M_M_/8/8/_m_m_m_m/m_m_m_m_/_m_m_m_m w 


	while ((rank <= RANKS.RANK_8) && fenCnt < fen.length) {
	    count = 1;
		switch (fen[fenCnt]) {
			case 'm': piece = PIECES.BM; break;
            case 'k': piece = PIECES.BK; break;
            case 'M': piece = PIECES.WM; break;
            case 'K': piece = PIECES.WK; break;
            case '_': piece = SQUARES.OFFBOARD; break;

            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
                piece = PIECES.EMPTY;
                count = fen[fenCnt].charCodeAt() - '0'.charCodeAt();
                break;
            
            case '/':
            case ' ':
                rank++;
                file = FILES.FILE_A;
                fenCnt++;
                continue;  
            default:
                console.log("FEN error");
                return;

		}
		
		for (i = 0; i < count; i++) {	
			sq100 = FR2SQ(file,rank);            
            GameBoard.pieces[sq100] = piece;
			file++;
        }
		fenCnt++;
		GameBoard.side = (fen[fenCnt + 1] == 'w') ? COLOURS.WHITE : COLOURS.BLACK;
	}
	GameBoard.posKey = GeneratePosKey();
	UpdateListsMaterial();
}
