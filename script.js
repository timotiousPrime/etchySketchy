// Slider value

const SLIDER = document.getElementById('sizeRangeSlider');
console.log(`The grid size is ${SLIDER.value}`)

SLIDER.oninput = function() {
    console.log(`The grid has been changed to the size of ${SLIDER.value}`)
}

