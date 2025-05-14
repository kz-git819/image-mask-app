
const images = ["image-mask-app/photo1.jpg", "image-mask-app/photo2.jpg"];
let currentImageIndex = 0;
let locked = false;

function createGrid(rows, cols) {
  const container = document.getElementById("grid-container");
  container.innerHTML = "";
  container.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
  container.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const cell = document.createElement("div");
      cell.className = "grid-cell";
      const img = document.createElement("img");
      img.src = images[currentImageIndex];
      const mask = document.createElement("div");
      mask.className = "mask";
      cell.appendChild(img);
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
  const rows = parseInt(document.getElementById("rows").value);
  const cols = parseInt(document.getElementById("cols").value);
  createGrid(rows, cols);
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
