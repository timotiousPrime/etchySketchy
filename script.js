// Slider value
const SLIDER = document.getElementById('sizeRangeSlider');

// Display size of sketch pad under the slider input
let gridInfo = document.querySelector('.sketchPadSizeInfo')
gridInfo.textContent = `The sketch pad size is ${SLIDER.value}x${SLIDER.value}` 

let sketchPadSize = SLIDER.value * SLIDER.value;
console.log(`The start sketch pad has ${sketchPadSize} pixels`);

let sketchPixel = document.createElement('div');
let sketchPadArea = document.querySelector('.sketchPadArea');

// Set the number of columns for the sketch pad pixels
let gridColumns = '';

function addGridColumns() {
    for (let i=0; i < SLIDER.value; i++) {
        gridColumns += ' auto';
    }
    return gridColumns;
}

gridColumns = addGridColumns();

// add pixels per number set by slider

function displayGridSize(){
    let gridInfo = document.querySelector('.sketchPadSizeInfo')
    gridInfo.textContent = `The sketch pad size is ${SLIDER.value}x${SLIDER.value}`    
}

SLIDER.addEventListener('input', () => {
    console.log(`The total grid size is ${SLIDER.value}x${SLIDER.value}#####`)
    displayGridSize(); // Update to the new size of the sketch pad
    
    gridColumns = addGridColumns();

    sketchPadSize = SLIDER.value * SLIDER.value;
    console.log(`The sketch pad has ${sketchPadSize} pixels####`);

        
    for (let i=1; i <= sketchPadSize; i++) {
        let newDiv = document.createElement('div');
        sketchPadArea.appendChild(newDiv);
        sketchPixel.textContent = `${i}`;
        newDiv.classList.add('sketchPixel');
        let idName = 'pixel' + `${i}`;
        newDiv.setAttribute('id', `${idName}`);
    }


    sketchPadArea.setAttribute('style', `grid-template-columns: ${gridColumns}`);

    
})
//


// returns a random color 
function randomColor() {
    randomColorPart1 = Math.floor((Math.random() * 256) + 1);
    randomColorPart2 = Math.floor((Math.random() * 256) + 1);
    randomColorPart3 = Math.floor((Math.random() * 256) + 1);
    return `rgb(${randomColorPart1}, ${randomColorPart2}, ${randomColorPart3})`;
}
//

// Listens for when rainbow mode has been activated
let rainbowColors = document.getElementById('colorRandomizer');

function activateRainbow(){
    rainbowColors.classList.toggle('active');
}
//

// sets the colour to rainbow is rainbow mode is active
// otherwise it uses the users settings
function setColor(){
    if (rainbowColors.classList.value === 'active') {
        return randomColor();
    } else {
        return getColorValue();
    }
}
//


// Clears the sketch of colors
function clearSketchColor() {
    console.log('Sketch is cleared');
    for (let i=1; i <= sketchPadSize; i++) {
        let pixelName = 'pixel' + `${i}`;
        let pixel = document.querySelector('#' + pixelName);
        pixel.setAttribute('style', 'background: white');
    }
}
//


// Get the color set by user/ default color
function getColorValue(){
    let colorInput = document.getElementById('colorInput');
    let colorValue = colorInput.value
    return colorValue
}


//listens for when the mouse is over an of the sketch pixels and sets default color
sketchPadArea.addEventListener('mouseover', (e) => {
    let pixelId = e.target.id;
    let pixel = document.getElementById(pixelId);
    pixel.setAttribute('style', `background: ${setColor()}`)
});
//


// listens for when the rainbow button is pressed and then applies random color to pixels
rainbowColors.addEventListener('click', activateRainbow);
// 

let clearSketch = document.getElementById('clearSketch')
clearSketch.addEventListener('click', clearSketchColor)
