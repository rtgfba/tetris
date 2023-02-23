// This allows the html file to read the javascript code, note-- all the code will be inside the event listener parentheses()
document.addEventListener('DOMContentLoaded', function(){

    // queryselector allows js to look inside of our html file and look for the class grid and we assign a constant variable in js as grid
    // querySelector is an inbuilt js method 
    const grid = document.querySelector('.grid')

    // start off by telling our js file the width of our grid is 10
    const width = 10

    //This creates  a const variable that asigns the html score element to js, we use the hash since it was an id 
    const ScoreDisplay = document.querySelector('#score')

    //This creates  a const variable that asigns the html score element to js, we use the hash since it was an id 
    const StartBtn = document.querySelector('#start-button')

    //querySelectorAll in this case allows us to communicate with all 200 divs in our html file which we already turned into squares. 
    //Array.from in this case will turn all of the 200 individual squares into an array, thus, now we have an array that goes from 0-199 which represents individual squares
    // squares = [<div>,<div>,<div>,<div>,<div>,<div>... etc]
    // squares = [0,1,2,3,4,5,6...etc]
    let squares = Array.from(document.querySelectorAll('.grid div'))


   




































})