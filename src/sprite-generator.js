export default class SpriteGenerator {
  constructor() {
    this.spritePatterns = {
      kirby: {
        colorKey: {
          0: 'transparent',
          1: '#00aa00',
        },
        pattern: [
          [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        ]
      },
    };
  }

  createSpriteElement(patternName, pixelSize) {
    let pattern = this.spritePatterns[patternName].pattern;
    let patternRows = pattern.length;
    let patternColumns = pattern[0].length;
    console.log(`making ${patternColumns} x ${patternRows} pattern for ${patternName}`);
    let element = document.createElement('div');
    element.classList.add('sprite-grid');
    element.style.gridTemplateRows = `${(pixelSize + ' ').repeat(patternRows)}`;
    element.style.gridTemplateColumns = `${(pixelSize + ' ').repeat(patternColumns)}`;
    pattern.forEach((row, r) => {
      row.forEach((cell, c) => {
        let cellColor = this.spritePatterns[patternName].colorKey[cell];
        element.innerHTML += `
          <div class="sprite-pixel" style="background-color: ${cellColor}"></div>
        `;
        if (cellColor === 'transparent') {
          element.classList.add('blank');
        }
      });
    });
    document.getElementById('game-screen').append(element);
  }

  async getImageArray(imagePath, width, height) {
    let canvas = document.getElementById('image-canvas');
    let context = canvas.getContext("2d");
    let img = new Image();
    img.crossOrigin = "Anonymous";
    img.src = imagePath;
    return new Promise(resolve => {
      img.onload = async function() {
        context.drawImage(img, 0, 0, width, height);
        let imageData = context.getImageData(0, 0, width, height);
        let arr = await getPixelArray(imageData, width, height);
        resolve(arr);
      };
    });
  }

  showEditor(width, height) {

  }
}

function getPixelArray(imgData, width, height) {
  // get colors rgba (4 pix sequentially)
  let pixelArray = new Array(width);
  pixelArray.fill([], 0, width);
  console.log('empty is', [...pixelArray])
  let currentRow = 0;
  let currentColumn = 0;
  let cellCount = 0;
  for (let i = 0; i < imgData.data.length; i += 4) {
    let red = imgData.data[i];
    let green = imgData.data[i + 1];
    let blue = imgData.data[i + 2];
    let alpha = imgData.data[i + 3];
    console.log('adding string at row', currentRow, 'column', currentColumn,)
    pixelArray[currentRow][currentColumn] = (`rgba(${red}, ${green}, ${blue}, ${alpha})`);
    // console.log('arr row', currentRow, 'lenghth?', pixelArray[currentRow].length);
    if (pixelArray[currentRow].length === width) {
      currentRow++;
      currentColumn = 0;
      console.warn('new row');
    } else {
      console.log('same row');
      currentColumn++;
    }
    cellCount++;
  }
  console.log('cell count', cellCount);
  console.log('arr row 0 lenghth', pixelArray[0].length);
  return pixelArray;
}