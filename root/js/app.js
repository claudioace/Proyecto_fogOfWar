const divider = document.querySelector('#divider');
const sectionA = document.querySelector('#section-a');
const sectionB = document.querySelector('#section-b');
const container = document.querySelector('#container');
const imageInput = document.querySelector('#image-input');
const slider = document.querySelector('#slider');
const magnifier = document.querySelector('#lupa');
const magnifierImage = document.querySelector('#magnifier-image');

let imageFile = null;

imageInput.addEventListener('change', () => {
  imageFile = imageInput.files[0];
  magnifierImage.src = URL.createObjectURL(imageFile);
});

let isDragging = false;

divider.addEventListener('mousedown', () => {
  isDragging = true;
});

document.addEventListener('mouseup', () => {
  isDragging = false;
});

container.addEventListener('mousemove', (event) => {
  if (!isDragging) return;
  const dividerWidth = window.getComputedStyle(divider).getPropertyValue('width');
  const containerRect = container.getBoundingClientRect();
  const xPos = event.clientX - containerRect.left;
  const containerWidth = container.offsetWidth;
  const minLeft = containerWidth * 0.1;
  const maxRight = containerWidth * 0.9;
  const dividerPosition = xPos / containerWidth;

  if (xPos > minLeft && xPos < maxRight) {
    sectionA.style.width = dividerPosition * 100 + '%';
    sectionB.style.width = (1 - dividerPosition) * 100 + '%';
    divider.style.left = xPos - (parseInt(dividerWidth) / 2) + 'px';

    const magnifierSize = magnifier.offsetWidth;
    const magnifierPositionX = event.clientX - magnifierSize / 2 - containerRect.left;
    const magnifierPositionY = event.clientY - magnifierSize / 2 - containerRect.top;
    magnifier.style.left = magnifierPositionX + 'px';
    magnifier.style.top = magnifierPositionY + 'px';

    if (imageFile) {
      const magnifierZoom = 2;
      const magnifierImageWidth = magnifierImage.naturalWidth * magnifierZoom;
      const magnifierImageHeight = magnifierImage.naturalHeight * magnifierZoom;
      const magnifierImageX = -((magnifierPositionX / containerWidth) * magnifierImageWidth - magnifierSize / 2);
      const magnifierImageY = -((magnifierPositionY / containerRect.height) * magnifierImageHeight - magnifierSize / 2);
      magnifierImage.style.left = magnifierImageX + 'px';
      magnifierImage.style.top = magnifierImageY + 'px';
    }
  }
});

slider.addEventListener('input', () => {
  const size = slider.value + 'px';
  magnifier.style.width = size;
  magnifier.style.height = size;
});
sectionB.addEventListener('mousemove', (event) => {
  const sectionBRect = sectionB.getBoundingClientRect();
  const cursorX = event.clientX - sectionBRect.left;
  const cursorY = event.clientY - sectionBRect.top;
  const magnifierSize = magnifier.offsetWidth;
  const magnifierPositionX = cursorX; 
  const magnifierPositionY = cursorY;
  const maxLeft = 0;
  const maxTop = 0;
  const maxRight = sectionBRect.width - magnifierSize;
  const maxBottom = sectionBRect.height - magnifierSize;
  
  if (magnifierPositionX < maxLeft) {
    magnifierPositionX = maxLeft;
  } else if (magnifierPositionX > maxRight) {
    magnifierPositionX = maxRight;
  }
  
  if (magnifierPositionY < maxTop) {
    magnifierPositionY = maxTop;
  } else if (magnifierPositionY > maxBottom) {
    magnifierPositionY = maxBottom;
  }
  
  magnifier.style.left = magnifierPositionX + 'px';
  magnifier.style.top = magnifierPositionY + 'px';
  
  
});
