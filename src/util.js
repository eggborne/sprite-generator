export const setDimensions = () => { 
  document.documentElement.style.setProperty('--actual-height', window.innerHeight + 'px'); 
};
export const pause = (ms) => new Promise(resolve => setTimeout(resolve, ms));
export const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

const imagePaths = [
  'media/images/kirby.png',
  'media/images/waddledee.png',
  'media/images/numbers.png',
  'media/images/1000.png',
  'media/images/3000.png',
  'media/images/5000.png',
];

function preload(arr) {
  let images = [];
  for (let p = 0; p < arr.length; p++) {
    let path = arr[p];
    images[p] = new Image();
    images[p].src = path;
    images[p].style.display = 'none';
    document.body.appendChild(images[p]);
  }
}
export function preloadImages() {
  return new Promise((resolve) => {
    preload(imagePaths);
    resolve();
  });
}