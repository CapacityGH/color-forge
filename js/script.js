"use strict";

const generateBtn = document.querySelector(".generate-btn");
const resetBtn = document.querySelector(".reset-btn");
const generatedColorsBox = document.querySelector(".generated-colors-box");
const saveButton = document.querySelector(".save-txt-btn");
const colorModels = document.getElementById("color-models");

const numberOfColors = document.getElementById("numberInput");

let rgbColorsArray = [];
let hexColorsArray = [];
let hslColorsArray = [];

function getRandomNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function generateColorsBoxes() {
    generatedColorsBox.innerHTML = "";
    const colorsNumber = getColorsNumber();
    const colorModel = colorModels.value;

    const colorArrays = {
        rgb: rgbColorsArray,
        hex: hexColorsArray,
        hsl: hslColorsArray,
    };
    const selectedArray = colorArrays[colorModel];

    resetColorsArray(selectedArray);
    getColorsArray(selectedArray, colorModel, colorsNumber);
    addColorsToBoxToHTML(selectedArray, colorsNumber);
}

function addColorsToBoxToHTML(colorsArray, colorsNumber) {
    for (let i = 0; i < colorsNumber; i++) {
        const colorBox = document.createElement("div");

        colorBox.classList.add("box");
        colorBox.classList.add(`box-${i}`);
        colorBox.style.backgroundColor = colorsArray[i];
        colorBox.textContent = colorsArray[i];

        generatedColorsBox.appendChild(colorBox);
    }
}

function getColorsNumber() {
    return Number(numberOfColors.value);
}

function getRandomRGBColor() {
    return `rgb(${getRandomNum(0, 255)}, ${getRandomNum(
        0,
        255
    )}, ${getRandomNum(0, 255)})`;
}

function getColorsArray(colorsArray, colorModel, colorsNumber) {
    let getColorFunction;

    if (colorModel === "rgb") {
        getColorFunction = getRandomRGBColor;
    } else if (colorModel === "hex") {
        getColorFunction = getRandomHexColor;
    } else if (colorModel === "hsl") {
        getColorFunction = getRandomHSLColor;
    } else {
        console.error("Invalid color model selected");
        return;
    }

    for (let i = 0; i < colorsNumber; i++) {
        colorsArray.push(getColorFunction());
    }
    return colorsArray;
}

function getBlobURL(array) {
    const blob = new Blob([array.join("\n")], { type: "text/plain" });
    const blobURL = URL.createObjectURL(blob);
    return blobURL;
}

function saveColorsToFile(colorsArray) {
    if (colorsArray.length >= 1) {
        const a = document.createElement("a");
        a.href = getBlobURL(colorsArray);
        a.download = "colors.txt";
        a.click();
    } else {
        alert("There is no colors in array!");
    }
}

function getRandomHexColor() {
    let hexNumber = "";
    for (let i = 0; i < 6; i++) {
        hexNumber += `0123456789abcdef`[Math.floor(Math.random() * 16)];
    }
    const fullHexNumber = `#${hexNumber}`;
    return fullHexNumber;
}

function getRandomHSLColor() {
    return `hsl(${getRandomNum(0, 360)}, ${getRandomNum(
        0,
        100
    )}%, ${getRandomNum(0, 100)}%)`;
}

function resetColorsArray(colorArray) {
    colorArray.length = 0;
}

function resetAllColorsArrays() {
    rgbColorsArray = [];
    hexColorsArray = [];
    hslColorsArray = [];
}

// Generate Button Logic
generateBtn.addEventListener("click", function () {
    generateColorsBoxes();
});

// Reset Button Logic
resetBtn.addEventListener("click", function () {
    generatedColorsBox.innerHTML = "";
    resetAllColorsArrays();
});

// Save As TXT Button Logic
saveButton.addEventListener("click", function () {
    if (colorModels.value == "rgb") {
        saveColorsToFile(rgbColorsArray);
    } else if (colorModels.value == "hex") {
        saveColorsToFile(hexColorsArray);
    } else if (colorModels.value == "hsl") {
        saveColorsToFile(hslColorsArray);
    }
});

// Copy The Color
generatedColorsBox.addEventListener("click", function (e) {
    const target = window.getComputedStyle(e.target);
    console.log(target);

    const color = target.backgroundColor;
    navigator.clipboard.writeText(color);

    // TODO: Make the browser to not evaluate hex to rgb
    // const hexColor = e.target.getAttribute("data-hex");

    // if (hexColor) {
    //     navigator.clipboard.writeText(hexColor).then(() => {
    //         console.log(`Copied: ${hexColor}`);
    //     }).catch(err => {
    //         console.error("Failed to copy: ", err);
    //     });
    // }
});
