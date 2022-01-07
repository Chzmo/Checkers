/* var gameBoard = [
    [0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0, 1, 0, 1],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [2, 0, 2, 0, 2, 0, 2, 0],
    [0, 2, 0, 2, 0, 2, 0, 2],
    [2, 0, 2, 0, 2, 0, 2, 0]
];
 */

var PIECES = {EMPTY:0, WM:1, WK:2, BM:3, BK:4};
var BRD_SQ_NUM = 100;

var FILES =  { FILE_A:0, FILE_B:1, FILE_C:2, FILE_D:3, 
	FILE_E:4, FILE_F:5, FILE_G:6, FILE_H:7, FILE_NONE:8 };

var RANKS =  { RANK_1:0, RANK_2:1, RANK_3:2, RANK_4:3, 
	RANK_5:4, RANK_6:5, RANK_7:6, RANK_8:7, RANK_NONE:8 };

var COLOURS = { WHITE:0, BLACK:1, BOTH:2 };

var SQUARES = {
    A1:11, B1:12, C1:13, D1:14, E1:15, F1:16, G1:17, H1:18,  
    A8:81, B8:82, C8:83, D8:84, E8:85, F8:86, G8:87, H8:88, 
    NO_SQ:89, OFFBOARD:100
};
  
var BOOL = { FALSE:0, TRUE:1 };

var FilesBrd = new Array(BRD_SQ_NUM);
var RanksBrd = new Array(BRD_SQ_NUM);

var START_FEN = "_m_m_m_m/m_m_m_m_/_m_m_m_m/8/8/M_M_M_M_/_M_M_M_M/M_M_M_M_ w";
//var START_FEN = "M_M_M_M_/_M_M_M_M/M_M_M_M_/8/8/_m_m_m_m/m_m_m_m_/_m_m_m_m w ";

var PceChar = ".MKmk"
var SideChar = "wb-";
var RankChar = "12345678";
var FileChar = "abcdefgh";

function FR2SQ(f,r) {
    return ( (11 + (f) ) + ( (r) * 10 ) );
}
  
var MAXGAMEMOVES = 2048;
var MAXPOSITIONMOVES = 256;
var MAXDEPTH = 64;

var PieceBig = [ BOOL.FALSE, BOOL.FALSE, BOOL.TRUE, BOOL.FALSE, BOOL.TRUE];
var PieceVal= [ 0, 100, 325, 100, 325];
var PieceCol = [ COLOURS.BOTH, COLOURS.WHITE, COLOURS.WHITE, COLOURS.BLACK, COLOURS.BLACK ];
var PieceKing = [ BOOL.FALSE, BOOL.FALSE, BOOL.TRUE,BOOL.FALSE, BOOL.TRUE ];

var PieceKeys = new Array(5 * 100);
var SideKey;

var Sq100ToSq64 = new Array(BRD_SQ_NUM); 
var Sq64ToSq100 = new Array(64);

function RAND_32() {

	return (Math.floor((Math.random()*255)+1) << 23) | (Math.floor((Math.random()*255)+1) << 16)
		 | (Math.floor((Math.random()*255)+1) << 8) | Math.floor((Math.random()*255)+1);

}

function SQ64(sq100) { 
	return Sq100ToSq64[(sq100)];
}

function SQ100(sq64) {
	return Sq64ToSq100[(sq64)];
}

function PCEINDEX(pce, pceNum){
    return (pce * 12 + pceNum);
}