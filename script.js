const images = ['image1.jpg', 'image2.jpg'];
const divisions = [[4, 4], [9, 9]]; // 各画像の分割数
let currentIndex = 0;
let locked = false;
let cells = [];

function createGrid(imageSrc, rows, cols) {
  const container = document.getElementById('image-container');
  container.innerHTML = '';
  const img = new Image();
  img.src = imageSrc;
  img.onload = () => {
    container.style.width = img.width + 'px';
    container.style.height = img.height + 'px';
    container.appendChild(img);

    const cellWidth = img.width / cols;
    const cellHeight = img.height / rows;
    cells = [];
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const div = document.createElement('div');
        div.className = 'cell';
        div.style.width = cellWidth + 'px';
        div.style.height = cellHeight + 'px';
        div.style.left = (c * cellWidth) + 'px';
        div.style.top = (r * cellHeight) + 'px';
        div.dataset.hidden = 'false';
        div.addEventListener('click', () => {
          if (!locked) {
            const hidden = div.classList.toggle('hidden');
            div.dataset.hidden = hidden ? 'true' : 'false';
          }
        });
        container.appendChild(div);
        cells.push(div);
      }
    }
  };
}

function hideAll() {
  cells.forEach(cell => {
    cell.classList.add('hidden');
    cell.dataset.hidden = 'true';
  });
}

function showAll() {
  cells.forEach(cell => {
    cell.classList.remove('hidden');
    cell.dataset.hidden = 'false';
  });
}

function toggleLock() {
  locked = !locked;
}

function nextImage() {
  currentIndex = (currentIndex + 1) % images.length;
  const [rows, cols] = divisions[currentIndex];
  document.getElementById("question-number").textContent = `第${currentIndex + 1}問目`;
  createGrid(images[currentIndex], rows, cols);
}

window.onload = () => {
  const [rows, cols] = divisions[0];
  createGrid(images[0], rows, cols);
};
