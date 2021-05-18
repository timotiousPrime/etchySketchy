// Slider value

const SLIDER = document.getElementById('sizeRangeSlider');
console.log(`The grid size is ${SLIDER.value}x${SLIDER.value}`);

let sketchPadSize = SLIDER.value * SLIDER.value;
console.log(`The sketch pad has ${sketchPadSize} pixels`);

SLIDER.oninput = function() {
    console.log(`The grid has been changed to the size of ${SLIDER.value}`);
}

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
console.log(`The grid should be ${sketchPadSize} pixels`);

for (let i=1; i <= sketchPadSize; i++) {
    let newDiv = document.createElement('div');
    sketchPadArea.appendChild(newDiv);
    sketchPixel.textContent = `${i}`;
    newDiv.classList.add('sketchPixel');
    let idName = 'pixel' + `${i}`;
    newDiv.setAttribute('id', `${idName}`);
}


sketchPadArea.setAttribute('style', `grid-template-columns: ${gridColumns}`);
//

function randomColor() {
    randomColorPart1 = Math.floor((Math.random() * 256) + 1);
    randomColorPart2 = Math.floor((Math.random() * 256) + 1);
    randomColorPart3 = Math.floor((Math.random() * 256) + 1);
    return `rgb(${randomColorPart1}, ${randomColorPart2}, ${randomColorPart3})`;
}

let rainbowColors = document.getElementById('colorRandomizer');

function activateRainbow(){
    rainbowColors.classList.toggle('active');
    if (rainbowColors.classList.value === 'active') {
        applyRandomColor();
    } else {
        addColor();
    };

}

// Applies a random color to each pixel
function applyRandomColor() {
    console.log('rainbow mode has been activated');
    sketchPadArea.addEventListener('mouseover', (e) => {
        pixelId = '#' + e.target.id;
        console.log('The ID of the pixel to change color is ' + pixelId)
        let pixel = document.querySelector(pixelId);
        console.log(`the color of the pixel is ${randomColor}`)
        pixel.setAttribute('style', `background: ${randomColor()}`);
    })
}
//

// Adds colour to each pixel that your mouse goes over
function addColor() {
    sketchPadArea.addEventListener('mouseover', (e) => {
        let pixelId = '#' + e.target.id;
        //console.log('The ID of the pixel to change color is ' + pixelId)
        let pixel = document.querySelector(pixelId);
        //console.log(`the color of the pixel is ${getColorValue}` )
        pixel.setAttribute('style', `background: ${getColorValue()}`);
    })
    
}


// Applies a random color to each pixel
function clearSketchColor() {
    console.log('Sketch is cleared');
    for (let i=1; i <= sketchPadSize; i++) {
        let pixelName = 'pixel' + `${i}`;
        let pixel = document.querySelector('#' + pixelName);
        pixel.setAttribute('style', 'background: white');
    }
    //let pixels = document.querySelectorAll('.sketchPixels');
    //pixels.setAttribute('style', `background: rgb(0,0,0)`);
}

//

// Get the color set by user/ default color
function getColorValue(){
    let colorInput = document.getElementById('colorInput');
    let colorValue = colorInput.value
    return colorValue
}


//listens for when the mouse is over an of the sketch pixels and sets default color
sketchPadArea.addEventListener('mouseover', addColor);
//


// listens for when the rainbow button is pressed and then applies random color to pixels
rainbowColors.addEventListener('click', activateRainbow);
// 

let clearSketch = document.getElementById('clearSketch')
clearSketch.addEventListener('click', clearSketchColor)
