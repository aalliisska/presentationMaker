import { Slide, TextObject, Background, Position, Size, ImageObject, FigureObject, Editor } from './type.js'
import { v4 as uuidv4 } from 'uuid'
import { SetSelectionAction, DeselectSelectionAction, СhangeSlideIndexAction, RenamePresentationTitleAction, ChangeObjectPositionAction, ChangeObjectSizeAction, ChangeBackgroundAction } from './redux/action.js';

// изменение названия презентации
function renamePresentationTitle(editor: Editor, action: RenamePresentationTitleAction): Editor {
  return {
    ...editor,
    presentation: {
      ...editor.presentation,
      title: action.payload.title,
    }
  }
}

// удаление слайда
function deleteSlide(editor: Editor): Editor {
  const newEditor: Editor = {
    ...editor
  };
  const slideId = newEditor.selection.selectedSlides;
  if (newEditor.presentation.slides.length <= 1) {
    console.warn("Cannot delete the last remaining slide.");
    return newEditor;
  }
  const updatedSlides = newEditor.presentation.slides.filter(
    (slide) => slide.id !== slideId
  );
  newEditor.presentation.slides = updatedSlides;
  if (updatedSlides.length > 0) {
    newEditor.selection.selectedSlides = updatedSlides[0].id;
  } else {
    newEditor.selection.selectedSlides = '';
  }
  return newEditor;
}

// добавление слайда
function addSlide(editor: Editor): Editor {
  const newEditor: Editor = {
    ...editor
  }
  const newSlide: Slide = {
    id: uuidv4(),
    contentObjects: [],
    background: setDefaultBackground(),
    position: null
  }
  newEditor.presentation.slides = [...editor.presentation.slides, newSlide]
  return newEditor
}

// изменение позиции слайда
function slidePosition(editor: Editor, { id, position }: { id: string; position: Position | null }) {
  const newEditor = { ...editor }
  const slide = findSlide(newEditor.presentation.slides, id)
  if (slide) {
    slide.position = position
  }
  return { ...newEditor }
}

// изменение позиции слайда в списке
function changeSlideIndex(editor: Editor, action: СhangeSlideIndexAction,): Editor {
  const newEditor = { ...editor }
  const collection: Slide[] = newEditor.presentation.slides
  const slideToMove = collection.find((s) => s.id === action.payload.id)
  if (!slideToMove) {
    console.error(`Slide with id ${action.payload.id} not found`)
    return newEditor
  }

  const baseIndex = collection.indexOf(slideToMove)

  newEditor.presentation.slides.splice(baseIndex, 1)
  newEditor.presentation.slides.splice(action.payload.index, 0, slideToMove)
  return newEditor
}

// добавление/удаление текста
function addText(editor: Editor): Editor {
  const newTextObject = setDefaultText()

  const addTextToSlide = editor.presentation.slides.map(slide =>
    slide.id === editor.selection.selectedSlides
      ? {
        ...slide,
        contentObjects: [...slide.contentObjects, newTextObject],
      }
      : slide)

  return {
    ...editor,
    presentation: {
      ...editor.presentation,
      slides: addTextToSlide,
    },
  }
}

// добавление/удаление картинки 
function addImage(editor: Editor, file: File): Editor {
  const newImageObject = setDefaultImage(file)

  const addImageToSlide = editor.presentation.slides.map(slide =>
    slide.id === editor.selection.selectedSlides
      ? {
        ...slide,
        contentObjects: [...slide.contentObjects, newImageObject],
      }
      : slide)

  return {
    ...editor,
    presentation: {
      ...editor.presentation,
      slides: addImageToSlide,
    },
  }
}

// изменение background
function changeBackground(editor: Editor, action: ChangeBackgroundAction): Editor {
  const { type, value } = action.payload
  console.log('Changing background:', { type, value });

  
  const changeBackgroundOnSlide = editor.presentation.slides.map(slide => slide.id === editor.selection.selectedSlides ?  setSlideBackground(slide, type, value) : slide);

  return {
    ...editor,
    presentation: {
      ...editor.presentation,
      slides: changeBackgroundOnSlide
    }
  }
}

// изменение позиции объекта 
function objectPosition(editor: Editor, action: ChangeObjectPositionAction): Editor {
  const newEditor = { ...editor }
  const slideId = findSlideByObject(editor, action.payload.id)
  const thisSlide = newEditor.presentation.slides.find((s) => s.id === slideId)!
  
  const objectToUpdate = thisSlide.contentObjects.find((o) => o.id === action.payload.id)!
  
  console.log('Old Position:', objectToUpdate.position)

  const maxWidth = 1100
  const maxHeight = (1100 * 9) / 16

  objectToUpdate.position = {
    x: Math.max(0, Math.min(action.payload.position.x, maxWidth)),
    y: Math.max(0, Math.min(action.payload.position.y, maxHeight)),
  };

  console.log('New Position:', objectToUpdate.position)

  return newEditor
}

// изменение размера картинки
function changeObjectSize(editor: Editor, action: ChangeObjectSizeAction): Editor {
  const newEditor = { ...editor }
  const slideId = findSlideByObject(editor, action.payload.id)
  const thisSlide = newEditor.presentation.slides.find((s) => s.id === slideId)!
  
  const objectToUpdate = thisSlide.contentObjects.find((o) => o.id === action.payload.id)!

  console.log('Old Size:', objectToUpdate.size);
  
  objectToUpdate.size = {
    width: Math.max(0, action.payload.size.width), 
    height: Math.max(0, action.payload.size.height), 
  };

  console.log('New Size:', objectToUpdate.size);

  return newEditor
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
function editTextObject(editor: Editor, newValue: string, fontSize: number, textColor: string) {
  const slide = findSlide(
      editor.presentation.slides,
      editor.selection.selectedSlides
  )

  const selectedObjects = editor.selection.selectedObjects;

  const editSlide = slide ? {
      ...slide,
      contentObjects: slide.contentObjects.map(object => 
          selectedObjects.includes(object.id)
              ? { ...object, value: newValue, fontSize, textColor }
              : object
      )
  } : slide

  const updatedSlides = editor.presentation.slides.map(existingSlide => 
      existingSlide.id === slide?.id ? editSlide : existingSlide
  );

  return {
      ...editor,
      presentation: {
          ...editor.presentation,
          slides: updatedSlides,
      },
      selection: {
          ...editor.selection,
          selectedObjects: [], 
      },
  };
}

// изменение текста
function changeFontSize(editor: Editor, newSize: number) {
  const slide = findSlide(
      editor.presentation.slides,
      editor.selection.selectedSlides
  )

  const selectedObjects = editor.selection.selectedObjects;

  const editSlide = slide ? {
      ...slide,
      contentObjects: slide.contentObjects.map(object => 
          selectedObjects.includes(object.id)
              ? { ...object, fontSize: newSize }
              : object
      )
  } : slide

  const updatedSlides = editor.presentation.slides.map(existingSlide => 
      existingSlide.id === slide?.id ? editSlide : existingSlide
  );

  return {
      ...editor,
      presentation: {
          ...editor.presentation,
          slides: updatedSlides,
      },
      selection: {
          ...editor.selection,
          selectedObjects: [], 
      },
  };
}

// изменение текста
function changeFontFamily(editor: Editor, newFontFamily: string) {
  const slide = findSlide(
      editor.presentation.slides,
      editor.selection.selectedSlides
  )

  const selectedObjects = editor.selection.selectedObjects;

  const editSlide = slide ? {
      ...slide,
      contentObjects: slide.contentObjects.map(object => 
          selectedObjects.includes(object.id)
              ? { ...object, fontFamily: newFontFamily }
              : object
      )
  } : slide

  const updatedSlides = editor.presentation.slides.map(existingSlide => 
      existingSlide.id === slide?.id ? editSlide : existingSlide
  );

  return {
      ...editor,
      presentation: {
          ...editor.presentation,
          slides: updatedSlides,
      },
      selection: {
          ...editor.selection,
          selectedObjects: [], 
      },
  };
}

// изменение цвета текста
function changeFontColor(editor: Editor, newFontColor: string) {
  const slide = findSlide(
      editor.presentation.slides,
      editor.selection.selectedSlides
  )

  const selectedObjects = editor.selection.selectedObjects;

  const editSlide = slide ? {
      ...slide,
      contentObjects: slide.contentObjects.map(object => 
          selectedObjects.includes(object.id)
              ? { ...object, textColor: newFontColor }
              : object
      )
  } : slide

  const updatedSlides = editor.presentation.slides.map(existingSlide => 
      existingSlide.id === slide?.id ? editSlide : existingSlide
  );

  return {
      ...editor,
      presentation: {
          ...editor.presentation,
          slides: updatedSlides,
      },
      selection: {
          ...editor.selection,
          selectedObjects: [], 
      },
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
function setSlideBackground(slide: Slide, type: string, value: string): Slide {
  let newBackground: Background
  switch (type) {
    case 'solid':
      newBackground = {
        type: 'solid',
        color: value
      }
      return {
        ...slide,
        background: newBackground
      };
    case 'image':
      newBackground = {
        type: 'image',
        src: value,
      }
      return {
        ...slide,
        background: newBackground
      };
    default:
      return {
        ...slide
      }


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

// текст по умолчанию
function setDefaultText(): TextObject {
  const defaultText: TextObject = {
    id: uuidv4(),
    position: {
      x: 100,
      y: 100,
    },
    size: {
      width: 100,
      height: 25,
    },
    borderColor: 'none',
    borderWidth: 0,
    type: 'text',
    value: 'New Text',
    textColor: '#000000',
    fontSize: 14,
    fontBold: 'normal',
    fontFamily: 'Roboto',
  }
  return defaultText
}

// картинка по умолчанию 
function setDefaultImage(file: File): ImageObject {
  const defaultImage: ImageObject = {
    id: uuidv4(),
    position: {
      x: 0,
      y: 0
    },
    size: {
      width: 300,
      height: 300
    },
    borderColor: 'none',
    borderWidth: 0,
    type: 'image',
    src: URL.createObjectURL(file),
    alt: file.name
  }
  return defaultImage
}

// найти нужный слайд
function findSlide(slides: Slide[], id: string): Slide {
  const slide = slides.find(slide => slide.id === id)
  if (!slide) {
    throw new Error('Слайд не найден')
  }
  return slide
}

// найти нужный слайд по объекту
function findSlideByObject(editor: Editor, id: string,): string | undefined {
  return editor.presentation.slides.find((s) => {
    return !!s.contentObjects.find((o) => o.id === id)
  })?.id
}

function setSelection(
  editor: Editor,
  action: SetSelectionAction,
): Editor {
  switch (action.payload.type) {
    case 'slide':
      return {
        ...editor,
        selection: {
          ...editor.selection,
          selectedSlides: action.payload.id,
        },
      }
    case 'object':
      return {
        ...editor,
        selection: {
          ...editor.selection,
          selectedObjects: [...editor.selection.selectedObjects, action.payload.id],
        },
      }
    default:
      return { ...editor }
  }
}

function deselectSelection(
  editor: Editor,
  action: DeselectSelectionAction,
): Editor {
  switch (action.payload.type) {
    case 'slide':
      return {
        ...editor,
        selection: {
          ...editor.selection,
          selectedSlides: '',
        },
      }
    case 'object':
      return {
        ...editor,
        selection: {
          ...editor.selection,
          selectedObjects: [],
        },
      }
    default:
      return { ...editor }
  }
}

// удалить объект
function deleteObject(editor: Editor) {
  const slide = findSlide(
    editor.presentation.slides,
    editor.selection.selectedSlides
  )

  const selectedObjects = editor.selection.selectedObjects

  const editSlide =  slide ? {
    ...slide,
    contentObjects: slide.contentObjects.filter(object => !selectedObjects.includes(object.id))
  } : slide

  const withoutObjects = editor.presentation.slides.map(existingSlide => existingSlide.id === slide.id ? editSlide : existingSlide)

  return {
    ...editor,
    presentation: {
      ...editor.presentation,
      slides: withoutObjects, 
    },
    selection: {
      ...editor.selection,
      selectedObjects: [], 
    },
  };
  }

export {
  renamePresentationTitle,
  deleteSlide,
  addSlide,
  slidePosition,
  changeSlideIndex,
  addText,
  addImage,
  setDefaultImage,
  changeBackground,
  objectPosition,
  changeObjectSize,
  setPosition,
  setSize,
  editTextObject,
  changeFontSize,
  changeFontFamily,
  changeFontColor,
  setTextObjectFontSize,
  setTextObjectFontFamily,
  setSlideBackground,
  setDefaultBackground,
  setDefaultText,
  findSlide,
  findSlideByObject,
  setSelection,
  deselectSelection,
  deleteObject
}