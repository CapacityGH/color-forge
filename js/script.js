"use strict";

// TODO: make 2 functions(getRGBColorsList and getHexColorsList) in 1 (getColorsList)

const generateBtn = document.querySelector(".generate-btn");
const resetBtn = document.querySelector(".reset-btn");
const generatedColorsBox = document.querySelector(".generated-colors-box");
const saveButton = document.querySelector(".save-txt-btn");
const colorModels = document.getElementById("color-models");

const numberOfColors = document.getElementById("numberInput");

let rgbColorsList = [];
let hexColorsList = [];
// let hslColorsList = [];

function getRandomNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function generateColorsBoxes() {
    generatedColorsBox.innerHTML = "";
    const colorsNumber = getColorsNumber();

    if (colorModels.value == "rgb") {
        rgbColorsList = [];
        getRGBColorsList(colorsNumber);

        addColorsToBoxToHTML(rgbColorsList, colorsNumber);
    } else if (colorModels.value == "hex") {
        hexColorsList = [];
        getHexColorsList(colorsNumber);

        addColorsToBoxToHTML(hexColorsList, colorsNumber);
    }
}

function addColorsToBoxToHTML(colorsList, colorsNumber) {
    for (let i = 0; i < colorsNumber; i++) {
        const colorBox = document.createElement("div");

        colorBox.classList.add("box");
        colorBox.classList.add(`box-${i}`);
        colorBox.style.backgroundColor = colorsList[i];
        colorBox.textContent = colorsList[i];

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

function getRGBColorsList(colorsNumber) {
    for (let i = 0; i < colorsNumber; i++) {
        rgbColorsList.push(getRandomRGBColor());
    }
    return rgbColorsList;
}

function getBlobURL(array) {
    const blob = new Blob([array.join("\n")], { type: "text/plain" });
    const blobURL = URL.createObjectURL(blob);
    return blobURL;
}

function getRandomHexColor() {
    let hexNumber = [];
    for (let i = 0; i < 6; i++) {
        hexNumber.push(
            [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "a", "b", "c", "d", "e", "f"][
                Math.floor(Math.random() * 16)
            ]
        );
    }
    const fullHexNumber = `#${hexNumber.join("")}`;
    return fullHexNumber;
}

function getHexColorsList(colorsNumber) {
    for (let i = 0; i < colorsNumber; i++) {
        hexColorsList.push(getRandomHexColor());
    }
    return hexColorsList;
}

// Generate Button Logic
generateBtn.addEventListener("click", function () {
    generateColorsBoxes();
});

// Reset Button Logic
resetBtn.addEventListener("click", function () {
    generatedColorsBox.innerHTML = "";
});

// Save As TXT Button Logic
saveButton.addEventListener("click", function () {
    if (rgbColorsList.length >= 1) {
        const a = document.createElement("a");
        a.href = getBlobURL(rgbColorsList);
        a.download = "rbg-colors.txt";
        a.click();
    } else {
        alert("There is no colors in array!");
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
