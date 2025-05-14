
const images = [
  { src: "photo1.jpg", rows: 4, cols: 4 },
  { src: "photo2.jpg", rows: 9, cols: 9 }
];

let currentImageIndex = 0;
let locked = false;

function createGrid(imageData) {
  const container = document.getElementById("grid-container");
  container.innerHTML = "";
  container.style.gridTemplateRows = `repeat(${imageData.rows}, 1fr)`;
  container.style.gridTemplateColumns = `repeat(${imageData.cols}, 1fr)`;

  for (let r = 0; r < imageData.rows; r++) {
    for (let c = 0; c < imageData.cols; c++) {
      const cell = document.createElement("div");
      cell.className = "grid-cell";
      const xPos = (c / (imageData.cols - 1 || 1)) * 100;
      const yPos = (r / (imageData.rows - 1 || 1)) * 100;
      cell.style.backgroundImage = `url(${imageData.src})`;
      cell.style.backgroundSize = `${imageData.cols * 100}% ${imageData.rows * 100}%`;
      cell.style.backgroundPosition = `${xPos}% ${yPos}%`;

      const mask = document.createElement("div");
      mask.className = "mask";
      cell.appendChild(mask);

      cell.addEventListener("click", () => {
        if (!locked) {
          mask.style.display = mask.style.display === "none" ? "block" : "none";
        }
      });

      container.appendChild(cell);
    }
  }
  updateTitle();
}

function updateTitle() {
  document.getElementById("title").textContent = `第${currentImageIndex + 1}問目`;
}

function applyGrid() {
  const imageData = images[currentImageIndex];
  createGrid(imageData);
}

function hideAll() {
  document.querySelectorAll(".mask").forEach(m => m.style.display = "block");
}

function showAll() {
  document.querySelectorAll(".mask").forEach(m => m.style.display = "none");
}

function toggleLock() {
  locked = !locked;
}

function nextImage() {
  currentImageIndex = (currentImageIndex + 1) % images.length;
  applyGrid();
}

window.onload = () => {
  applyGrid();
};
