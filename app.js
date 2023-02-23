// This allows the html file to read the javascript code, note-- all the code will be inside the event listener parentheses()
document.addEventListener('DOMContentLoaded', function(){

    // queryselector allows js to look inside of our html file and look for the class grid and we assign a constant variable in js as grid
    // querySelector is an inbuilt js method 
    const grid = document.querySelector('.grid');

    // start off by telling our js file the width of our grid is 10
    const width = 10;

    //This creates  a const variable that asigns the html score element to js, we use the hash since it was an id 
    const ScoreDisplay = document.querySelector('#score');

    //This creates  a const variable that asigns the html score element to js, we use the hash since it was an id 
    const StartBtn = document.querySelector('#start-button');

    //querySelectorAll in this case allows us to communicate with all 200 divs in our html file which we already turned into squares. 
    //Array.from in this case will turn all of the 200 individual squares into an array, thus, now we have an array that goes from 0-199 which represents individual squares
    // squares = [<div>,<div>,<div>,<div>,<div>,<div>... etc]
    // squares = [0,1,2,3,4,5,6...etc]
    let squares = Array.from(document.querySelectorAll('.grid div'));


    //Creating the tetrominoes, I drew a diagram to visually see how I would draw the tetrominoes in the array.
    //Since the array we created is 10x20 and is now stacked properly because of the flex wrap feature, we can create each rotation of the tetrimino by making an array of the four possible 
    //squares by refering to the diagram and inputing the index, if we need to move down a layer we use width which will go down a whole row

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
    const cTetromino = [
        [width, width+2, width*2, width*2+1, width*2+2],
        [0,1,width,width*2,width*2+1],
        [0,1,2,width,width+1],
        [1,2,width+2,width*2+1,width*2+2]
    ];

    const iTetromino = [
        [1,width+1,width*2+1,width*3+1],
        [width,width+1,width+2,width+3],
        [1,width+1,width*2+1,width*3+1],
        [width,width+1,width+2,width+3]
    ];
































});








//understanding the .forEach method for arrays :)
// let testArray = [55, 747, 353, 8]
// testArray.forEach((v,i)=>{
//     console.log(v,i-1)
// });
// let testArray = [55, 747, 353, 8]
// testArray.forEach(function n(v,i){
//     console.log(v,i-1)
// });
// function hello(){
// alert('hello world');
// };

// console.log(hello());
