import { Presentation, Slide, TextObject, Background, Position, Size, ImageObject, FigureObject } from './type.js';
import { v4 as uuidv4 } from 'uuid';

// изменение названия презентации
function renamePresentationTitle(presentation: Presentation, newTitle: string): Presentation {
  return {
    ...presentation,
    title: newTitle,
  }
}

//удаление слайда
function deleteSlide(slides: Array<Slide>, slideIdToDelete: string): Slide[] {
  return slides.filter(function (slide) {
    return slide.id !== slideIdToDelete;
  });
}

// добавление слайда
function addSlide(slides: Array<Slide>, newSlide: Slide): Slide[] {
  return [...slides, newSlide];
}

// изменение позиции слайда
function slidePosition(slides: Array<Slide>, firstSlideId: string, secondSlideId: string): Slide[] {
  const firstSlideIndex = slides.findIndex(slide => slide.id === firstSlideId);
  const secondSlideIndex = slides.findIndex(slide => slide.id === secondSlideId);
  if (firstSlideIndex === -1 || secondSlideIndex === -1) {
    throw new Error('Слайды не найдены');
  }

  if (firstSlideIndex === secondSlideIndex) {
    return slides;
  }

  const temp = slides[firstSlideIndex];
  slides[firstSlideIndex] = slides[secondSlideIndex];
  slides[secondSlideIndex] = temp;
  return slides;
}

// добавление/удаление текста
function addText(slide: Slide): Slide {
  const newTextObject: TextObject = {
    id: uuidv4(),
    position: {
      x: 0,
      y: 0,
    },
    size: {
      width: 100,
      height: 30,
    },
    borderColor: 'black',
    borderWidth: 3,
    type: 'text',
    value: 'Новый текст',
    textColor: '#000000',
    fontSize: 20,
    fontBold: 'normal',
    fontFamily: 'Arial'
  };
  return {
    ...slide,
    contentObjects: [...slide.contentObjects, newTextObject]
  }
}

// добавление/удаление картинки 
function addImage(slide: Slide, src: string, alt: string): Slide {
  const newImg: ImageObject = {
    id: uuidv4(),
    position: {
      x: 0,
      y: 0,
    },
    size: {
      width: 100,
      height: 30,
    },
    borderColor: 'black',
    borderWidth: 1,
    type: 'image',
    src: src,
    alt: alt,
  };
  return {
    ...slide,
    contentObjects: [...slide.contentObjects, newImg]
  }
}

// добавление/удаление фигуры
function addFigure(slide: Slide): Slide {
  const newFigure: FigureObject = {
    id: uuidv4(),
    position: {
      x: 0,
      y: 0,
    },
    size: {
      width: 30,
      height: 30,
    },
    borderColor: 'green',
    borderWidth: 1,
    type: 'figure',
    shape: {
      type: 'rectangle'
    },
    backgroundColor: {
      type: 'solid',
      color: 'blue'
    },
  };
  return {
    ...slide,
    contentObjects: [...slide.contentObjects, newFigure]
  }
}

// изменение позиции текста/картинки
function setPosition<T extends ImageObject | TextObject | FigureObject>(object: T, position: Position): T {
  return {
    ...object,
    position: position
  };
}

// изменение размера текста/картинки
function setSize<T extends ImageObject | TextObject | FigureObject>(object: T, size: Size): T {
  return {
    ...object,
    size: size
  };
}

// изменение текста
function setTextObject(text: TextObject, newText: string): TextObject {
  return {
    ...text,
    value: newText
  };
}

// изменение размера текста
function setTextObjectFontSize(text: TextObject, newFont: number): TextObject {
  return {
    ...text,
    fontSize: newFont
  }
}

// изменение семейства шрифтов у текста
function setTextObjectFontFamily(text: TextObject, newFontFamily: string): TextObject {
  return {
    ...text,
    fontFamily: newFontFamily
  }
}

// изменение фона слайда
function setSlideBackground(slide: Slide, newBackground: Background): Slide {
  return {
    ...slide,
    background: newBackground
  }
}

// фон по умолчанию
function setDefaultBackground(): Background {
  const defaultSolid: Background = {
    type: 'solid',
    color: '#FFFFFF'
  };
  return defaultSolid
}


export {
  renamePresentationTitle,
  deleteSlide,
  addSlide,
  slidePosition,
  addText,
  addImage,
  addFigure,
  setPosition,
  setSize,
  setTextObject,
  setTextObjectFontSize,
  setTextObjectFontFamily,
  setSlideBackground,
  setDefaultBackground
}