import './css/styles.css';
import { preloadImages, setDimensions, pause, randomInt } from './util.js';
import SpriteGenerator from './sprite-generator.js';
import kirbyPNG from './kirbywaiting.png';

window.addEventListener('load', async () => {
  preloadImages();
  setDimensions();
  document.body.classList.add('loaded');
  await pause(800); // expanded

  let spriteGenerator = new SpriteGenerator();
  let arr = await spriteGenerator.getImageArray(kirbyPNG, 16, 16);
  console.log('arr?', arr);
  spriteGenerator.spritePatterns.kirby.pattern = arr;
  // spriteGenerator.createSpriteElement('kirby', '16px');
});