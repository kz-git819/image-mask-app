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
      img.style.width = `${imageData.cols * 100}%`;
      img.style.height = `${imageData.rows * 100}%`;
      img.style.transform = `translate(-${(100 / imageData.cols) * c}%, -${(100 / imageData.rows) * r}%)`;
      const mask = document.createElement("div");
      mask.className = "mask";
      cell.appendChild(img);
      cell.append
