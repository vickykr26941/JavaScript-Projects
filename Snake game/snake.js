/*
 auther : vicky kumar
 created : 30-06-2021
 javascript Snake game
*/

function init(){
   canvas = document.getElementById('my_canvas');
   H = canvas.height = 600;
   W = canvas.width = 600;
   pen = canvas.getContext('2d');
   cell_size = 15;
   game_over = false;
   score = 5;
   

   food = getRandomFood();

   snake = {
       intit_len : 5,
       color : "white",
       cells : [],
       direction : "right",
       
       careateSnake : function(){
           for(var i = this.intit_len; i>0; i--){
               this.cells.push({x:i,y:0});
           }
       },

       drawSnake : function(){
           for(var i = 0; i<this.cells.length; i++){
               pen.fillStyle = this.color;
               pen.fillRect(this.cells[i].x * cell_size,this.cells[i].y * cell_size,cell_size-2,cell_size-2);
           }
       },
       updateSnake : function(){
        //    console.log('upating snake');
        var head_x = this.cells[0].x;
        var head_y = this.cells[0].y;

        if(head_x == food.x && head_y==food.y){
            console.log('Food eaten by snake');
            food = getRandomFood();
            score = score + 1;
            speed += 5;
        }
        else{
            this.cells.pop();
        }
        var new_x, new_y;

        if(this.direction == "right"){
            new_x = head_x + 1;
            new_y = head_y;
        }
        else if(this.direction == "left"){
            new_x = head_x - 1;
            new_y = head_y;
        }
        else if(this.direction == "down"){
            new_y = head_y + 1;
            new_x = head_x;
        }
        else if(this.direction == "up"){
            new_y = head_y - 1;
            new_x = head_x;
        }
        this.cells.unshift({x:new_x,y:new_y});

        // logic for prevent snake from goint out
        var last_x = Math.round(W/cell_size);
        var last_y = Math.round(H/cell_size);
        if(this.cells[0].y<0 || this.cells[0].x < 0 || this.cells[0].x > last_x || this.cells[0].y > last_y){
            game_over = true;
        }
       },
    
   };
   snake.careateSnake();

   function keyPressed(e){
       if(e.key =="ArrowRight")
         snake.direction = "right";
       else if(e.key=="ArrowLeft")
        snake.direction = "left";
       else if(e.key == "ArrowDown")
         snake.direction = "down";
       else 
         snake.direction = "up"; 

     console.log("snake direction");
   }

   document.addEventListener('keydown',keyPressed);

}
function draw(){
    pen.clearRect(0,0,W,H);
    snake.drawSnake();
    pen.fillRect(food.x * cell_size,food.y * cell_size,cell_size,cell_size);

    pen.fillStyle = "white";
    pen.font = 'bold 20px serif';
    var string_x = 'Score :';
    pen.fillText(string_x + score,50,50);
}
function update(){
    snake.updateSnake();

}
function getRandomFood(){
    var foodX = Math.round(Math.random() * (W - cell_size)/cell_size);
    var foodY = Math.round(Math.random() * (H - cell_size)/cell_size);

    var food = {
        x : foodX, 
        y : foodY,
        color : "white",
    }
    return food;
}
function gameloop(){
  if(game_over == true){
      clearInterval(f);

      return;
  }
   draw();
   update();
}
init();
var f = setInterval(gameloop,50);



