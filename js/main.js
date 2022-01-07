$(function(){
    init();
    console.log("Main is called ");
	ParseFen(START_FEN);
	PrintBoard();
});

function InitSq100To64() {

	var index = 0;
	var file = FILES.FILE_A;
	var rank = RANKS.RANK_1;
	var sq = SQUARES.A1;
	var sq64 = 0;

	for(index = 0; index < BRD_SQ_NUM; ++index) {
		Sq100ToSq64[index] = 65;
	}
	
	for(index = 0; index < 64; ++index) {
		Sq64ToSq100[index] = 100;
	}
	
	for(rank = RANKS.RANK_1; rank <= RANKS.RANK_8; ++rank) {
		for(file = FILES.FILE_A; file <= FILES.FILE_H; ++file) {
			sq = FR2SQ(file,rank);
			Sq64ToSq100[sq64] = sq;
			Sq100ToSq64[sq] = sq64;
			sq64++;
		}
	}

}

function InitFilesRanksBrd() {
	
	var index = 0;
	var file = FILES.FILE_A;
	var rank = RANKS.RANK_1;
	var sq = SQUARES.A1;
	
	for(index = 0; index < BRD_SQ_NUM; ++index) {
		FilesBrd[index] = SQUARES.OFFBOARD;
		RanksBrd[index] = SQUARES.OFFBOARD;
	}
	
	for(rank = RANKS.RANK_1; rank <= RANKS.RANK_8; ++rank) {
		for(file = FILES.FILE_A; file <= FILES.FILE_H; ++file) {
			sq = FR2SQ(file,rank);
			FilesBrd[sq] = file;
			RanksBrd[sq] = rank;			
		}
	}
}

function InitHashKeys() {
    var index = 0;
	
	for(index = 0; index < 5 * 100; ++index) {				
		PieceKeys[index] = RAND_32();
	}
	
	SideKey = RAND_32();
}

function init(){
	
    console.log("init() called");
	InitFilesRanksBrd();
	InitHashKeys();
	InitSq100To64();

}