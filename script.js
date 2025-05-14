const images = [
  { src: "image-mask-app/photo1.jpg", rows: 4, cols: 4 },
  { src: "image-mask-app/photo2.jpg", rows: 9, cols: 9 }
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
      const img = document.createElement("img");
      img.src = imageData.src;
      img.style.objectFit = "cover";
      img.style.width = `${100 * imageData.cols}%`;
      img.style.height = `${100 * imageData.rows}%`;
      img.style.transform = `translate(-${(100 / (imageData.cols - 1 || 1)) * c}%, -${(100 / (imageData.rows - 1 || 1)) * r}%)`;
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
  const imageData = images[currentImageIndex];
  createGrid(imageData);
  // プレイヤーが変更できないよう入力欄を無効化
  document.getElementById("rows").value = imageData.rows;
  document.getElementById("cols").value = imageData.cols;
  document.getElementById("rows").disabled = true;
  document.getElementById("cols").disabled = true;
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
