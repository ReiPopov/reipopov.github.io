// Текстовое поле

fetch('text.txt')
.then(response => response.text())
.then(text => {
  const lines = text.split('\n');
  let title = '';
  let descriptionLines = [];
  let foundTitle = false;

  for (let line of lines) {
    const trimmed = line.trim();

    if (!foundTitle && trimmed !== '') {
      title = trimmed;
      foundTitle = true;
    } else if (foundTitle) {
      descriptionLines.push(line);
    }
  }

  document.getElementById('title').textContent = title;

  const descriptionHtml = descriptionLines
  .join('\n')
  .split(/\n\s*\n/)
  .map(paragraph => `<p>${paragraph.trim()}</p>`)
  .join('');

  document.getElementById('description').innerHTML = descriptionHtml;
})
.catch(err => {
  console.error('Ошибка загрузки:', err);
});


// Слайд

let slide1 = document.querySelector('.slider');
let left = document.querySelector('.fa-solid.fa-arrow-left');
let right = document.querySelector('.fa-solid.fa-arrow-right');

let slideCount = 1;
let maxSlideCount = 0;

(function checkSlides() {
  const basePath = 'slide';
  const ext = '.webp';
  let index = 1;

  function checkNext() {
    const img = new Image();
    img.onload = function () {
      let newImg = document.createElement('img');
      newImg.src = img.src;
      newImg.id = `slide-${index}`;
      slide1.appendChild(newImg);

      maxSlideCount = index;
      index++;
      checkNext();
    };
    img.onerror = function () {
      console.log(`Загружено изображений: ${maxSlideCount}`);
    };
    img.src = `slide${index}${ext}`;
  }

  checkNext();
})();

function leftBtn() {
  if (slideCount > 1) {
    slideCount--;
    sliding();
  }
}

function rightBtn() {
  if (slideCount < maxSlideCount) {
    slideCount++;
    sliding();
  }
}

function sliding() {
  document.getElementById('slide-1').style.marginLeft = `-${(slideCount - 1) * 100}%`;
}


// Проверка существование изображении

document.querySelectorAll('img').forEach(img => {
  const checkImg = new Image();
  checkImg.onerror = function () {
    img.style.display = 'none';
  };
});

// Зум изображении

const header = document.getElementById('header');
const body = document.getElementById('body');
const fullScreen = document.querySelector('.fullScreen');
const fullScreenImage = document.getElementById('fullScreen__image');
const fullScreenBtnZoom = document.getElementById('fullScreenBtn__zoom');
const fullScreenBtnClose = document.getElementById('fullScreenBtn__close');
const fullScreen__bottom = document.querySelector('.fullScreen__bottom');

const fullScreenWindow = document.querySelector('.fullScreen__window');
let zoom_block = document.getElementById('zoom_block');

let currentImageIndex;
let lastImageIndex = 5;

document.querySelectorAll('.item').forEach((item, index) => {
  item.addEventListener('click', () => {
    currentImageIndex = index + 1;
    header.style.display = 'none';
    body.style.overflow = 'hidden';
    fullScreen.style.display = '';
    fullScreenImage.src = item.src;
    document.documentElement.requestFullscreen();

    fullScreenImage.style.width = 'auto';
    fullScreenImage.style.height = 'auto';
    fullScreenImage.style.maxWidth = '100%';
    fullScreenImage.style.maxHeight = '100%';
  });
});

function ArrowToLeft(){
  if(currentImageIndex === 1){
    currentImageIndex = currentImageIndex;
    fullScreenImage.src = '' + currentImageIndex + '.webp';
  }else{
    currentImageIndex = currentImageIndex - 1;
    fullScreenImage.src = '' + currentImageIndex + '.webp';
  }
}

function ArrowToRight(){
  if(currentImageIndex === lastImageIndex){
    currentImageIndex = currentImageIndex;
    fullScreenImage.src = '' + currentImageIndex + '.webp';
  }else{
    currentImageIndex = currentImageIndex + 1;
    fullScreenImage.src = '' + currentImageIndex + '.webp';
  }
}

fullScreenBtnClose.addEventListener('click', function() {
  fullScreenClose()
})

function fullScreenClose(){
  header.style.display = '';
  body.style.overflow = 'visible';
  fullScreen.style.display = 'none';
  document.exitFullscreen();

  zoomBlockVisible = false;

  document.getElementById('zoom_block').style.display = 'none';
  fullScreenImage.removeEventListener('mousedown', startDragging);
  document.removeEventListener('mousemove', dragElement);
  document.removeEventListener('mouseup', stopDragging);

  fullScreenImage.style.top = '';
  fullScreenImage.style.left = '';
  document.getElementById("size").value = '0'

  fullScreenImage.style.cursor = 'default';

  fullScreenImage.style.width = 'auto';
  fullScreenImage.style.height = 'auto';
  fullScreenImage.style.maxWidth = '100%';
  fullScreenImage.style.maxHeight = '100%';
}

document.addEventListener('keydown', function(e) {
  if (e.key === "Escape"){
    fullScreenClose()
  }
});

let zoomBlockVisible = false;
function zoomBlock() {
  if (zoomBlockVisible === false) {
    document.getElementById('zoom_block').style.display = '';
    zoomBlockVisible = true;

    fullScreenImage.addEventListener('mousedown', startDragging);

    document.addEventListener('mousemove', dragElement);
    document.addEventListener('mouseup', stopDragging);

    fullScreenImage.style.cursor = 'grab';
    fullScreenImage.style.width = '100%';
    fullScreenImage.style.height = '';
    fullScreenImage.style.maxWidth = '';
    fullScreenImage.style.maxHeight = '';
  } else {
    zoomBlockVisible = false;
    document.getElementById('zoom_block').style.display = 'none';
    fullScreenImage.removeEventListener('mousedown', startDragging);
    
    document.removeEventListener('mousemove', dragElement);
    document.removeEventListener('mouseup', stopDragging);

    fullScreenImage.style.top = '';
    fullScreenImage.style.left = '';
    document.getElementById("size").value = '0'

    fullScreenImage.style.cursor = 'default';
    fullScreenImage.style.width = 'auto';
    fullScreenImage.style.height = 'auto';
    fullScreenImage.style.maxWidth = '100%';
    fullScreenImage.style.maxHeight = '100%';
  }
}

let isDragging = false;
let offsetX, offsetY;

function startDragging(e) {
  isDragging = true;
  offsetX = e.clientX - fullScreenImage.getBoundingClientRect().left;
  offsetY = e.clientY - fullScreenImage.getBoundingClientRect().top;
  fullScreenImage.style.cursor = 'grabbing';
  e.preventDefault();
}

function dragElement(e) {
  if (isDragging) {
    fullScreenImage.style.left = `${e.clientX - offsetX}px`;
    fullScreenImage.style.top = `${e.clientY - offsetY}px`;
    e.preventDefault()
  }
}

function stopDragging() {
  isDragging = false;
  fullScreenImage.style.cursor = 'grab';
}


function sizePic() {
  size = document.getElementById("size").value;
  fullScreenImage.style.width = 100 + 10*size + '%';
}