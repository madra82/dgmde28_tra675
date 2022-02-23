function makeGrid(){
    var grid = "";
        for (let i=0; i<=2; i++)
    {
        let cells = "";
        for (let x=0; x<=2; x++)

        {
            cells = "<div class = 'cells'></div>" + cells;
        }

         grid += cells + "<br/>"
    }
    
    document.write(grid);
};

document.addEventListener("DOMContentLoaded",function(){

var startBtn = document.getElementById("playBtn");
var messageBox = document.getElementById("messageBox");
var cells = document.querySelectorAll(".cells");
var winCombos = [[0,4,8],[0,3,6],[0,1,2],[1,4,7],[2,5,8],[2,4,6],[3,4,5],[6,7,8]];
var moves = 0;
var player = "X";

 startBtn.addEventListener("click", function clearAll(){

    cells.forEach(function(cell){
        cell.removeEventListener("click", makeMove),
        cell.innerHTML="",
        cell.classList.remove("CatX"),
        cell.classList.remove("CatO")
        cell.addEventListener("click", makeMove, {once:true})
    })

    messageBox.innerHTML="Player X, please select a cell."
    moves = 0
    player = "X"

})

function makeMove() {

    player == "X" ? this.classList.add("CatX") : this.classList.add("CatO");
    this.innerHTML = player; moves += 1;

    moves < 4 ? changePlayer() : checkWin()

 }

function checkWin() {

    let win = false;
    
    for (let i=0; i < winCombos.length; i++) {

        if (cells[winCombos[i][0]].innerHTML != "" && cells[winCombos[i][0]].innerHTML == cells[winCombos[i][1]].innerHTML && cells[winCombos[i][1]].innerHTML == cells[winCombos[i][2]].innerHTML) {win = true; break;}
    }

    win == true? gameWon() : checkDraw()
}

function gameWon() {

    messageBox.innerHTML = "Player " + player + " Wins!"
    cells.forEach(function(cell){
    cell.removeEventListener("click", makeMove)}) 
} 

function checkDraw() {

    let draw = true

    for (let i=0; i < cells.length; i++) {
        if (cells[i].innerHTML == "") {draw = false; break;} 
    }

    draw == false ? changePlayer() : messageBox.innerHTML = "Game Over with No Win"
}
     
function changePlayer () {

    player = player == "X" ? "O" : "X";
    messageBox.innerHTML="Player " + player + ", please select a cell."
} 

})
