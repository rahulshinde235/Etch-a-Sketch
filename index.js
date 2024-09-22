// Constants and Variables
const container = document.querySelector(".container");
const userInput = document.querySelector("#input-slider");
const gridValContainer = document.querySelector(".input-slider-val");
const colorSelector = document.querySelector("#color-selector");
const colorbtn = document.querySelector(".colorbtn");
const rainbowbtn = document.querySelector(".rainbowbtn");
const eraserbtn = document.querySelector(".eraserbtn");
const clearbtn = document.querySelector(".clearbtn");
const btnArr = [colorbtn, rainbowbtn, eraserbtn, clearbtn];

let currColor = "#000000";
const activeBtn = "#000000";

const rainbowColors = [
  "#FF0000", // Red
  "#FF7F00", // Orange
  "#FFFF00", // Yellow
  "#00FF00", // Green
  "#0000FF", // Blue
  "#4B0082", // Indigo
  "#9400D3", // Violet
];

let numOfColumns = userInput?.value ?? 16;
let currRainbowColorIndex = 0;
let isRainbowMode = false;
let opacity = 0.1;
let isDragging = false;
let isErasing = false;

// Setup Functions
function initialGameSetup() {
  setBtnColor(colorbtn, activeBtn);
  createGrid(numOfColumns);
}

// Grid Creation Functions
function createRow(num, cellDimension) {
  const divRow = document.createElement("div");
  divRow.classList.add("gridRow");

  for (let j = 0; j < num; j++) {
    const gridCell = document.createElement("div");
    gridCell.classList.add("gridCell");
    gridCell.style.width = `${cellDimension}px`;
    gridCell.style.height = `${cellDimension}px`;
    divRow.appendChild(gridCell);
  }
  return divRow;
}

function createGrid(num) {
  const fragment = document.createDocumentFragment();
  const containerWidth = container.offsetWidth;
  const cellDimension = Math.floor(containerWidth / num);
  const gridRowTemplate = createRow(num, cellDimension);

  for (let index = 0; index < num; index++) {
    const rowClone = gridRowTemplate.cloneNode(true);
    fragment.appendChild(rowClone);
  }

  container.appendChild(fragment);
}

// Event Handling Functions
function resetValues() {
  opacity = 0.1;
  container.classList.remove("no-cursor");
}

function resetDrawingSettings() {
  numOfColumns = 16;
  isErasing = false;
  isRainbowMode = false;
  currColor = colorSelector.value;
  userInput.value = numOfColumns;
}
function colorCell(event) {
  const element = event.target;
  opacity = opacity <= 1 ? opacity + 0.1 : 0.1;
  element.style.opacity = `${opacity}`;

  if (isRainbowMode) {
    currRainbowColorIndex = (currRainbowColorIndex + 1) % rainbowColors.length;
    element.style.backgroundColor = isErasing ? "#fefefe" : `${rainbowColors[currRainbowColorIndex]}`;
  } else {
    element.style.backgroundColor = isErasing ? "#fefefe" : `${currColor}`;
  }
}

// User Interaction Functions
function updateGridSize(numOfColumns) {
  container.replaceChildren();
  createGrid(numOfColumns);
  gridValContainer.textContent = `${numOfColumns} * ${numOfColumns}`;
}

function toggleRainbowMode(event) {
  isErasing = false;
  isRainbowMode = true;

  setBtnColor(rainbowbtn, activeBtn);
}

function clearGrid() {
  resetValues();
  resetDrawingSettings();
  updateGridSize(numOfColumns);
  setBtnColor(colorbtn, activeBtn);
}

function setColor() {
  const color = colorSelector.value;
  currColor = color;
  colorBtn(color);
}

function getColor(event) {
  currColor = event.target.value;
  setBtnColor(colorbtn, activeBtn);
}

// Button Handling Functions
function setBtnColor(btnElement, color = "#ededed") {
  btnArr.forEach((btn) => {
    btn.style.backgroundColor = btn === btnElement ? color : "#ededed";
    btn.style.color = btn === btnElement ? "white" : "unset";
  });
}

function toggleColorMode() {
  isErasing = false;
  isRainbowMode = false;
  setBtnColor(colorbtn, activeBtn);
}

function toggleEraserMode() {
  isErasing = !isErasing;
  isRainbowMode = false;

  setBtnColor(eraserbtn, activeBtn);
}

// Event Listeners
container.addEventListener("mousedown", (event) => {
  if (event.button === 0 && event.target.classList.contains("gridCell")) {
    container.classList.add("no-cursor");
    isDragging = true;
    colorCell(event);
    event.preventDefault();
  }
});

container.addEventListener("mouseover", (event) => {
  if (isDragging && event.target.classList.contains("gridCell")) {
    colorCell(event);
  }
});

container.addEventListener("mouseup", () => {
  isDragging = false;
  resetValues();
});

// Initial Setup
initialGameSetup();
