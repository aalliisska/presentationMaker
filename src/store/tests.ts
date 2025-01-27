import { Presentation, Slide, TextObject, BackgroundSolid, BackgroundGradient, BackgroundImage, Position, Size, ImageObject, FigureObject, Circle } from './type.js';
import { renamePresentationTitle, deleteSlide, addSlide, slidePosition, addText, addImage, setPosition, setSize, setTextObject, setTextObjectFontSize, setTextObjectFontFamily, setSlideBackground } from './functiontest.js';

const position: Position = {
  x: 100,
  y: 100,
};

const changePosition: Position = {
  x: 50,
  y: 200,
};

const size: Size = {
  width: 100,
  height: 100,
};

const changeSize: Size = {
  width: 20,
  height: 10,
};

let textObject1: TextObject = {
  id: 'textObject1',
  position: position,
  size: size,
  borderColor: 'black',
  borderWidth: 3,
  type: 'text',
  value: 'new text',
  textColor: 'blue',
  fontSize: 14,
  fontBold: 'normal',
  fontFamily: 'Arial',
};

const textObject2: TextObject = {
  id: 'textObject2',
  position: position,
  size: size,
  borderColor: 'red',
  borderWidth: 6,
  type: 'text',
  value: 'new text 2',
  textColor: 'yellow',
  fontSize: 4,
  fontBold: 'bold',
  fontFamily: 'Roboto',
};

const backgroundSolid: BackgroundSolid = {
  type: 'solid',
  color: 'green',
};

const backgroundImage: BackgroundImage = {
  type: 'image',
  src: '/cat.jpg',
};

const backgroundGradient: BackgroundGradient = {
  type: 'gradient',
  colors: [
    {
      color: 'white',
    },
    {
      color: 'blue',
    }
  ],
};

const imageObject: ImageObject = {
  id: 'image object',
  position: position,
  size: size,
  borderColor: 'black',
  borderWidth: 3,
  type: 'image',
  src: './dog.jpg',
  alt: 'dog',
};

const circle: Circle = {
  type: 'circle',
}

const figureObject: FigureObject = {
  id: 'image object',
  position: position,
  size: size,
  borderColor: 'black',
  borderWidth: 3,
  type: 'figure',
  shape: circle,
  backgroundColor: backgroundSolid,
};

let minDataSlide: Slide = {
  id: 'minDataSlide',
  contentObjects: [],
  background: backgroundSolid,
};

let maxDataSlide1: Slide = {
  id: 'maxDataSlide1',
  contentObjects: [textObject1, figureObject],
  background: backgroundImage,
};

let maxDataSlide2: Slide = {
  id: 'maxDataSlide2',
  contentObjects: [textObject2, imageObject],
  background: backgroundGradient,
};

let minDataPresentation: Presentation = {
  title: '',
  slides: [minDataSlide]
};

let maxDataPresentation: Presentation = {
  title: 'max data presentation',
  slides: [maxDataSlide1, maxDataSlide2]
};

function renamePresentationTitleTest() {
  console.log('Test function renamePresentationTitle');
  console.log('Title before: ', minDataPresentation.title);
  minDataPresentation = renamePresentationTitle(minDataPresentation, 'new min data presentation');
  console.log('Title after: ', minDataPresentation.title);
  console.log('\n');

  console.log('Title before: ', maxDataPresentation.title);
  maxDataPresentation = renamePresentationTitle(maxDataPresentation, 'new max data presentation');
  console.log('Title after: ', maxDataPresentation.title);
  console.log('\n');
};
renamePresentationTitleTest()

function deleteSlideTest() {
  console.log('Test function deleteSlide');
  console.log('Slides before: ', minDataPresentation.slides);
  minDataPresentation.slides = deleteSlide(minDataPresentation.slides, minDataPresentation.slides[0].id);
  console.log('Slides after: ', minDataPresentation.slides);
  console.log('\n');

  console.log('Slides before: ', maxDataPresentation.slides);
  maxDataPresentation.slides = deleteSlide(maxDataPresentation.slides, maxDataPresentation.slides[0].id);
  console.log('Slides after: ', maxDataPresentation.slides);
  console.log('\n');
};
deleteSlideTest()

function addSlideTest() {
  console.log('Test function addSlide');
  console.log('Slides before: ', minDataPresentation.slides);
  minDataPresentation.slides = addSlide(minDataPresentation.slides, minDataPresentation.slides[0]);
  console.log('Slides after: ', minDataPresentation.slides);
  console.log('\n');

  console.log('Slides before: ', maxDataPresentation.slides);
  maxDataPresentation.slides = addSlide(maxDataPresentation.slides, maxDataPresentation.slides[0]);
  console.log('Slides after: ', maxDataPresentation.slides);
  console.log('\n');
};
addSlideTest()

function slidePositionTest() {
  console.log('Test function slidePosition');
  console.log('Slides before: ', minDataPresentation.slides);
  if (!minDataPresentation.slides || minDataPresentation.slides.length < 2) {
    console.log('Slides after: ', minDataPresentation.slides);
  } else {
    minDataPresentation.slides = slidePosition(minDataPresentation.slides, minDataPresentation.slides[0].id, minDataPresentation.slides[1].id);
    console.log('Slides after: ', minDataPresentation.slides);
  }
  console.log('\n');

  console.log('Slides before: ', maxDataPresentation.slides);
  maxDataPresentation.slides = slidePosition(maxDataPresentation.slides, maxDataPresentation.slides[0].id, maxDataPresentation.slides[1].id);
  console.log('Slides after: ', maxDataPresentation.slides);
  console.log('\n');
};
slidePositionTest()

function addTextTest() {
  console.log('Test function addText');
  console.log('TextObject before: ', minDataSlide.contentObjects);
  minDataSlide = addText(minDataSlide);
  console.log('TextObject after: ', minDataSlide.contentObjects);
  console.log('\n');

  console.log('TextObject before: ', maxDataSlide1.contentObjects);
  maxDataSlide1 = addText(maxDataSlide1);
  console.log('TextObject after: ', maxDataSlide1.contentObjects);
  console.log('\n');
};
addTextTest()

function addImageTest() {
  console.log('Test function addImage');
  console.log('ImageObject before: ', minDataSlide.contentObjects);
  minDataSlide = addImage(minDataSlide, './new-min.jpg', 'new-min');
  console.log('ImageObject after: ', minDataSlide.contentObjects);
  console.log('\n');

  console.log('ImageObject before: ', maxDataSlide1.contentObjects);
  maxDataSlide1 = addImage(maxDataSlide1, './new-max.jpg', 'new-max');
  console.log('ImageObject after: ', maxDataSlide1.contentObjects);
  console.log('\n');
};
addImageTest()

function setPositionTest() {
  console.log('Test function setPosition');
  console.log('textObject1 position before: ', textObject1.position);
  textObject1 = setPosition(textObject1, changePosition);
  console.log('textObject1 position after: ', textObject1.position);
  console.log('\n');
};
setPositionTest()

function setSizeTest() {
  console.log('Test function setSize');
  console.log('textObject1 size before: ', textObject1.size);
  textObject1 = setSize(textObject1, changeSize);
  console.log('textObject1 size after: ', textObject1.size);
  console.log('\n');
};
setSizeTest()

function setTextObjectTest() {
  console.log('Test function setTextObject');
  console.log('textObject1 value before: ', textObject1.value);
  textObject1 = setTextObject(textObject1, 'new value for text object');
  console.log('textObject1 value after: ', textObject1.value);
  console.log('\n');
};
setTextObjectTest()

function setTextObjectFontSizeTest() {
  console.log('Test function setTextObjectFontSize');
  console.log('textObject1 fontSize before: ', textObject1.fontSize);
  textObject1 = setTextObjectFontSize(textObject1, 20);
  console.log('textObject1 fontSize after: ', textObject1.fontSize);
  console.log('\n');
};
setTextObjectFontSizeTest()

function setTextObjectFontFamilyTest() {
  console.log('Test function setTextObjectFontFamily');
  console.log('textObject1 fontFamily before: ', textObject1.fontFamily);
  textObject1 = setTextObjectFontFamily(textObject1, 'Times New Roman');
  console.log('textObject1 fontFamily after: ', textObject1.fontFamily);
  console.log('\n');
};
setTextObjectFontFamilyTest()

function setSlideBackgroundTest() {
  console.log('Test function setSlideBackground');
  console.log('SlideBackground before: ', minDataSlide.background);
  minDataSlide = setSlideBackground(minDataSlide, backgroundGradient);
  console.log('SlideBackground after: ', minDataSlide.background);
  console.log('\n');

  console.log('SlideBackground before: ', maxDataSlide1.background);
  maxDataSlide1 = setSlideBackground(maxDataSlide1, backgroundSolid);
  console.log('SlideBackground after: ', maxDataSlide1.background);
  console.log('\n');
};
setSlideBackgroundTest()

export {
  renamePresentationTitleTest,
  deleteSlideTest,
  addSlideTest,
  slidePositionTest,
  addTextTest,
  addImageTest,
  setPositionTest,
  setSizeTest,
  setTextObjectTest,
  setTextObjectFontSizeTest,
  setTextObjectFontFamilyTest,
  setSlideBackgroundTest
};






