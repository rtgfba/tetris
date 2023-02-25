// This allows the html file to read the javascript code, note-- all the code will be inside the event listener parentheses()
document.addEventListener('DOMContentLoaded', function(){

    // queryselector allows js to look inside of our html file and look for the class grid and we assign a constant variable in js as grid
    // querySelector is an inbuilt js method 
    const grid = document.querySelector('.grid');

    // start off by telling our js file the width of our grid is 10
    const width = 10;

    //This creates  a const variable that asigns the html score element to js, we use the hash since it was an id 
    const scoreDisplay = document.querySelector('#score');

    //This creates  a const variable that asigns the html score element to js, we use the hash since it was an id 
    const startBtn = document.querySelector('#start-button');

    //querySelectorAll in this case allows us to communicate with all 200 divs in our html file which we already turned into squares. 
    //Array.from in this case will turn all of the 200 individual squares into an array, thus, now we have an array that goes from 0-199 which represents individual squares
    // squares = [<div>,<div>,<div>,<div>,<div>,<div>... etc]
    // squares = [0,1,2,3,4,5,6...etc]
    let squares = Array.from(document.querySelectorAll('.grid div'));

    //show the next random tetromino on the mini grid
    let nextRandom = 0  ;

    //Create a timer ID
    let timerID ;

    //score
    let score = 0;

    //tetromino colors
    const colors = [
        'orange',
        'red',
        'purple',
        'green',
        'blue'
    ]


    //Creating the tetrominoes, I drew a diagram to visually see how I would draw the tetrominoes in the array.
    //Since the array we created is 10x20 and is now stacked properly because of the flex wrap feature, we can create each rotation of the tetrimino by making an array of the four possible 
    //squares by refering to the diagram and inputing the index, if we need to move down a row  we use width which will go down a whole row

    const lTetromino = [
        [1,2,width+1,width*2+1],
        [width,width+1,width+2, width*2+2],
        [1,width+1,width*2,width*2+1],
        [width,width*2,width*2+1,width*2+2]
    ];

    const sTetromino = [
        [width+1,width+2,width*2,width*2+1],
        [0,width,width+1,width*2+1],
        [width+1, width+2, width*2, width*2+1],
        [1, width+1, width+2, width*2+2]
    ];

    const tTetromino = [
        [1,width,width+1,width+2],
        [1,width+1,width+2,width*2+1],
        [width,width+1,width+2,width*2+1],
        [1,width,width+1,width*2+1]
    ];

    const bTetromino = [
        [0,1,width,width+1],
        [0,1,width,width+1],
        [0,1,width,width+1],
        [0,1,width,width+1]
    ];

    //This is my own creation, not a regular tetris element but i wanted  to encoperate it because why not- Remi
    // const cTetromino = [
    //     [width, width+2, width*2, width*2+1, width*2+2],
    //     [0,1,width,width*2,width*2+1],
    //     [0,1,2,width,width+1],
    //     [1,2,width+2,width*2+1,width*2+2]
    // ];

    const iTetromino = [
        [1,width+1,width*2+1,width*3+1],
        [width,width+1,width+2,width+3],
        [1,width+1,width*2+1,width*3+1],
        [width,width+1,width+2,width+3]
    ];


    //Create an array of all the tetromino pieces, an array in an array
    const theTetrominoes = [lTetromino,sTetromino,tTetromino,bTetromino,iTetromino]


    //Decide where we want to draw the tetromino on the 10x20 grid
    //Where the position of the first square of the first tetromino rotation will be 
    //the starting rotation will always be 0
    
    let currentPosition = 4;
    let currentRotation = 0;


    //Pick a tetromino at random, tetrominoes.length gives us the length of the array, multiply this by math random will randomize the tetromino selection, math floor will round down

    let random = Math.floor(Math.random()*theTetrominoes.length);

    // //Pick a tetromino and its first rotation, the first array is thetetrominoes array, the second one is rotation of the tetromino we always want the first rotation to be the same
    let current = theTetrominoes[random][currentRotation];


    //draw the first rotation in the first tetromino
    //colorTetromino is the required function for the "forEach method", the v represents the first parameter, value, which is the value of each tetrimno position 
    //which we will then use to locate the correct current position in the square array , we also add current position because it places 
    //it in the middle of the grid instead of the left side, .forEach (function aName(value,index,array))
    //We access stylesheet to color the tetromino through .classList.add
    function draw() {
        current.forEach(index => {
          squares[currentPosition + index].classList.add('tetromino')
          squares[currentPosition + index].style.backgroundColor = colors[random]
        })
      };



    //undraw the tetromino to make it seem like it is moving
    function undraw() {
        current.forEach(index => {
          squares[currentPosition + index].classList.remove('tetromino')
          squares[currentPosition + index].style.backgroundColor = ''
    
        })
      };



    //make the tetromino move down, we use timerID so in the future we can stop 
    // timerID = setInterval(moveDown, 300)

    //assign functions ot keyCodes
    function control(e){
        if(e.keyCode === 37){
            moveLeft();
        } else if (e.keyCode === 38){
            rotate();
        } else if (e.keyCode === 39){
            moveRight();
        }else if (e.keyCode === 40){
            moveDown();
        }
        };

    document.addEventListener('keyup', control)

    //create the movdown function using the Draw and Undraw functions
    function moveDown(){
        undraw()
        currentPosition += width
        draw()
        freeze();
    };


    //create the freeze function, we use an if statement, saying if current (which are the 4 pieces of the tetrominoes) have any true statement
    //in this case its if any of the mare touching the div with the class taken, then turn all 4 pieces into the class taken
    //then right after that, create a new randomized tetromino, we will pass this function into our moveDown function
    function freeze(){
        if(current.some(index => squares[currentPosition + index + width].classList.contains('taken'))){
            current.forEach(index => squares[currentPosition + index].classList.add('taken'))
            random = nextRandom
            nextRandom = Math.floor(Math.random() * theTetrominoes.length)
            current = theTetrominoes[random][currentRotation]
            currentPosition = 4
            draw()
            displayShape()
            addScore()
            gameOver()
        };
    };



    //create a rule to allow the tetrominoes to know which indexed square they are at inside of the array
    //essentially move the tetromino left, unless it is at an edge or there is a blockage from another tetromino
    function moveLeft(){
        undraw()

        // some is a method that looks at each item in the array and checks if the statement is true for at least one of the items
        //if it is, the whole statement is true, the call back function could be written differntly but i choose to write it this way to grasp the concept more
        const isAtLeftEdge = current.some(function leftEdge(v){

            return (currentPosition + v) % width === 0})

            // this function actually makes the current position move 1 unit to the left
            if(!isAtLeftEdge) currentPosition -=1 
            
            if(current.some(index => squares[currentPosition + index].classList.contains('taken'))){
                currentPosition +=1
            }
       draw()  
    };

    
    //move right, same thing like move right but the i am finding a remainder of 9 since the right side of the array falls on 9, n+9, etc..
    function moveRight(){
        undraw()
        
        const isAtRightEdge = current.some(function rightEdge (v){
            return(currentPosition + v) % width === width - 1})
        if(!isAtRightEdge) currentPosition +=1

        if(current.some(index => squares[currentPosition + index].classList.contains('taken'))){
            currentPosition -=1
        }
        draw()
    };


      //Write a function to rotate the tetromino, this is achieved by skipping to the next index in the double array,
      // theTetrominoes[1][0], in this case the one identifies which tetromino we are going to choose from, the [0] identifies the rotation, 
      //with  every tetromino we start off at index [0] so in order to rotate them we have to cycle through 0-4 which are the four rotations
      // note that when we cycle to the right we go 0-4 and when we cycle to the left we go 4-0 and connect them  with  the controls
      function rotate(){
        undraw()
        currentRotation ++
        if (currentRotation === current.length){  //when the current rotation gets to 4
            currentRotation = 0
        }
        current = theTetrominoes[random][currentRotation]
        draw()
      };


 

 //show up-next tetromino in mini-grid display
 const displaySquares = document.querySelectorAll('.mini-grid div')
 const displayWidth = 4
 const displayIndex = 0


 //the Tetrominos without rotations
 const upNextTetrominoes = [
   [1, displayWidth+1, displayWidth*2+1, 2], //lTetromino
   [0, displayWidth, displayWidth+1, displayWidth*2+1], //zTetromino
   [1, displayWidth, displayWidth+1, displayWidth+2], //tTetromino
   [0, 1, displayWidth, displayWidth+1], //oTetromino
   [1, displayWidth+1, displayWidth*2+1, displayWidth*3+1] //iTetromino
 ];

 //display the shape in the mini-grid display
 function displayShape() {

   //remove any trace of a tetromino form the entire grid
   displaySquares.forEach(square => {
     square.classList.remove('tetromino')
     square.style.backgroundColor = ''
   })
   upNextTetrominoes[nextRandom].forEach( index => {
     displaySquares[displayIndex + index].classList.add('tetromino')
     displaySquares[displayIndex + index].style.backgroundColor = colors[nextRandom]
   })
 };


    startBtn.addEventListener('click', () =>{
        if(timerID){
            clearInterval(timerID)
            timerID = null
        } else{
            draw()
            timerID = setInterval (moveDown, 1000)
            nextRandom = Math.floor(Math.random()* theTetrominoes.length)
            // displayShape()

        };

    })



    //add score
    function addScore() {
        for (let i = 0; i < 199; i +=width) {
          const row = [i, i+1, i+2, i+3, i+4, i+5, i+6, i+7, i+8, i+9]
    
          if(row.every(index => squares[index].classList.contains('taken'))) {
            score +=10
            scoreDisplay.innerHTML = score
            row.forEach(index => {
              squares[index].classList.remove('taken')
              squares[index].classList.remove('tetromino')
              squares[index].style.backgroundColor = ''
            })
            const squaresRemoved = squares.splice(i, width)
            squares = squaresRemoved.concat(squares)
            squares.forEach(cell => grid.appendChild(cell))
          };
        };
      };


  //game over

  //game over
  function gameOver() {
    if(current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
      scoreDisplay.innerHTML = 'end'
      clearInterval(timerID)
    };
  };


























});





