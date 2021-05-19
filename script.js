// Slider value
const SLIDER = document.getElementById('sizeRangeSlider');

// Display size of sketch pad under the slider input
function displayGridSize(){
    const gridInfo = document.querySelector('.sketchPadSizeInfo')
    gridInfo.textContent = `The sketch pad size is ${SLIDER.value}x${SLIDER.value}`    
}
//


// Determine the number of pixels
let sketchPadSize = SLIDER.value * SLIDER.value;
console.log(`The start sketch pad has ${sketchPadSize} pixels`);

const sketchPixel = document.createElement('div');
const sketchPadArea = document.querySelector('.sketchPadArea');

function addPixels() {
    for (let i=1; i <= sketchPadSize; i++) {
        const newDiv = document.createElement('div');
        sketchPadArea.appendChild(newDiv);
        sketchPixel.textContent = i;
        newDiv.classList.add('sketchPixel');
        let idName = 'pixel' + `${i}`;
        newDiv.setAttribute('id', `${idName}`);
    }
}
//

// Set the number of columns for the sketch pad pixels
function addGridColumns() {
    let gridColumns = '';
    for (let i=0; i < SLIDER.value; i++) {
        gridColumns += ' auto';
    }
    return gridColumns;
}
//

// Removes the divs in the sketch area
function removeDivs() {
    const existingPixels = document.querySelectorAll('.sketchPixel')
    existingPixels.forEach(deleteDiv)
}

function deleteDiv(pixel) {
    pixel.remove()
}
//

// Function to create sketch pad
function updateSketchPad(){
    // Removed previous Divs
    removeDivs()
    // Display the size of the grid
    console.log(`The total grid size is ${SLIDER.value}x${SLIDER.value}`)
    displayGridSize(); // Update to the new size of the sketch pad under the slider
    // Set the number of columns the grid needs
    gridColumns = addGridColumns();
    // Update the sketch pad properties to grid size
    sketchPadArea.setAttribute('style', `grid-template-columns: ${gridColumns}`);
    //Set number of pixels the grid needs
    sketchPadSize = SLIDER.value * SLIDER.value
    console.log(`The sketch pad has ${sketchPadSize} pixels`);
    // add the pixels to the grid
    addPixels()
}
//

// Display the size when the page loads
document.addEventListener('load', displayGridSize()); 

// Set the sketch pad when the page loads
document.addEventListener('load', updateSketchPad())

// Update the sketch pad each time the value of the slider changes
SLIDER.addEventListener('input', updateSketchPad)
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
        const pixel = document.querySelector('#' + pixelName);
        pixel.setAttribute('style', 'background: white');
    }
}
//


// Get the color set by user/ default color
function getColorValue(){
    const colorInput = document.getElementById('colorInput');
    let colorValue = colorInput.value
    return colorValue
}


//listens for when the mouse is over an of the sketch pixels and sets default color
sketchPadArea.addEventListener('mouseover', (e) => {
    let pixelId = e.target.id;
    const pixel = document.getElementById(pixelId);
    pixel.setAttribute('style', `background: ${setColor()}`)
});
//


// listens for when the rainbow button is pressed and then applies random color to pixels
rainbowColors.addEventListener('click', activateRainbow);
// 

const clearSketch = document.getElementById('clearSketch')
clearSketch.addEventListener('click', clearSketchColor)
