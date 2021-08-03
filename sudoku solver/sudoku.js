var arr = [[],[],[],[],[],[],[],[],[]]
var temp = [[],[],[],[],[],[],[],[],[]]

for(var i = 0; i<9; i++){
    for(var j = 0; j<9; j++){
        arr[i][j] = document.getElementById(i*9 + j);
    }
}

function initTemp(temp){
    for(var i = 0; i<9; i++){
        for(var j = 0; j<9; j++){
            temp[i][j] = false;
        }
    }
}
function setTemp(board,temp){
    for(var i=0; i<9; i++){
        for(var j=0; j<9; j++){
            if(board[i][j] != 0){
                temp[i][j] = true;
            }
        }
    }
}
function setColor(temp){
    for(var i = 0; i<9; i++){
        for(var j=0; j<9; j++){
            if(temp[i][j] == true){
                arr[i][j].style.color = "#DC#3545";
            }
        }
    }
}
function resetColor(){
    for(var i = 0; i<9; i++){
        for(var j=0; j<9; j++){
            arr[i][j].style.color = "green";
        }
    }
}
function changeBoard(board){
    for(var i = 0; i<9; i++){
        for(var j = 0; j<9; j++){
            if(board[i][j] !=0){
                arr[i][j].innerText = board[i][j];
            }
            else arr[i][j].innerText = "";
        }
    }
}
board = [[],[],[],[],[],[],[],[],[]]
let button = document.getElementById('generate-sudoku');
let solve = document.getElementById('solve');

console.log(arr);
button.onclick = function(){
    var xhrRequest = new XMLHttpRequest()
    xhrRequest.onload = function (){
       var respone = JSON.parse(xhrRequest.response);
       console.log(respone);
       initTemp(temp);
       resetColor();

       board = respone.board;
       setTemp(board,temp);
       setColor(temp);
       changeBoard(board);
    }
    xhrRequest.open('get','https://sugoku.herokuapp.com/board?difficulty=easy');
    xhrRequest.send();
}


function is_possible(board,i,j,val){
    for(var r = 0; r < 9; r++){
        if(board[r][j] == val)
          return false;
    }

    for(var c = 0; c<9; c++){
        if(board[i][c] == val)
         return false;
    }

    var r = i - i % 3;
    var c = j - j % 3;

    for(var a = r; a < r + 3; a++){
        for(var b = c; b < c + 3; b++){
            if(board[a][b] == val)
              return false;
        }
    }

    return true;
}
function solve_board(board,i,j){
    //console.log("sudoku solver");
    if(i == 9){
        changeBoard(board);
        return ;
    }
    if(j == 9){
        solve_board(board,i+1,0);
        return ;
    }
    if(board[i][j] !=0){
        solve_board(board,i,j+1);
        return;
    }
    
    for(var a = 1; a<=9; a++){
        if(is_possible(board,i,j,a)){
            board[i][j] = a;
            solve_board(board,i,j+1);
            board[i][j] = 0;
        }
    }
}
solve.onclick = function(){
    solve_board(board,0,0);
}


