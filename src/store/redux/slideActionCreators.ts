import { ActionType } from "./action"
import { ImageObject } from "../type"
import { setDefaultImage } from "../functions"

function addSlide() {
  return {
    type: ActionType.ADD_SLIDE
  }
}

function deleteSlide() {
  return {
    type: ActionType.DELETE_SLIDE
  }
}

function changeSlideIndex(payload: {id: string, index: number}) {
  return {
    type: ActionType.CHANGE_SLIDE_INDEX,
    payload: payload
  }
}

function addText() {
  return {
    type: ActionType.ADD_TEXT
  }
}

function editTextObject(newValue: string, fontSize: number, textColor: string) {
  return {
    type: ActionType.EDIT_TEXT_OBJECT,
    payload: {newValue, fontSize, textColor}
  }
}

function changeFontSize(newSize: number) {
  return {
    type: ActionType.CHANGE_FONT_SIZE,
    payload: {newSize}
  }
}

function changeFontFamily(newFontFamily: string) {
  return {
    type: ActionType.CHANGE_FONT_FAMILY,
    payload: {newFontFamily}
  }
}

function changeFontColor(newFontColor: string) {
  return {
    type: ActionType.CHANGE_FONT_COLOR,
    payload: {newFontColor}
  }
}

function addImage(file: File) {
  const imageObject: ImageObject = setDefaultImage(file); 
  return {
    type: ActionType.ADD_IMAGE,
    payload: imageObject
  }
}

function deleteObject() {
  return {
    type: ActionType.DELETE_OBJECT
  }
}

function changeObjectPosition({ id, position }: { id: string, position: { x: number, y: number }}) {
  return {
    type: ActionType.CHANGE_OBJECT_POSITION,
    payload: {
      id: id,
      position: {
        x: position.x,
        y: position.y
      }
    }
  }
}

function changeObjectSize({ id, size }: { id: string, size: { width: number; height: number }}) {
  return {
    type: ActionType.CHANGE_OBJECT_SIZE,
    payload: {
      id: id,
      size: {
        width: size.width,
        height: size.height
      }
    }
  }
}

function changeBackground({ type, value }: {type: string, value: string} ) {
  return {
    type: ActionType.CHANGE_BACKGROUND,
    payload: {
      type: type, 
      value: value}
  }
}
  


export {
  addSlide,
  deleteSlide,
  changeSlideIndex,
  addText,
  editTextObject,
  changeFontSize,
  changeFontFamily,
  changeFontColor,
  addImage,
  deleteObject,
  changeObjectPosition,
  changeObjectSize,
  changeBackground
}