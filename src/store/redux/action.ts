import { Editor, ImageObject } from "../type"

enum ActionType {
  ADD_SLIDE = 'addSlide',
  DELETE_SLIDE = 'deleteSlide',

  SET_SELECTION = 'setSelection',
  DESELECT_SELECTION = 'deselectSelection',

  ADD_TEXT = 'addText',
  EDIT_TEXT_OBJECT='editTextObject',
  CHANGE_FONT_SIZE='changeFontSize',
  CHANGE_FONT_FAMILY='changeFontFamily',
  CHANGE_FONT_COLOR='changeFontColor',

  ADD_IMAGE = 'addImage',
  DELETE_OBJECT = 'deleteObject',
  CHANGE_BACKGROUND = 'changeBackground',

  CHANGE_SLIDE_INDEX = 'changeSlideIndex',

  CHANGE_OBJECT_POSITION = 'changeObjectPosition',
  CHANGE_OBJECT_SIZE = 'changeObjectSize',

  SET_EDITOR = 'setEditor',
  RENAME_PRESENTATION_TITLE = 'renamePresentationTitle'
}

type AddSlideAction = {
  type: ActionType.ADD_SLIDE
}

type DeleteSlideAction = {
  type: ActionType.DELETE_SLIDE
}

type SetSelectionAction = {
  type: ActionType.SET_SELECTION,
  payload: {
    type: 'slide' | 'object',
    id: string
  }
}

type DeselectSelectionAction = {
  type: ActionType.DESELECT_SELECTION,
  payload: {
    type: 'slide' | 'object',
    id?: string;
  }
}

type AddTextAction = {
  type: ActionType.ADD_TEXT
}

type EditTextObjectAction = {
  type: ActionType.EDIT_TEXT_OBJECT,
  payload: {
    id: string,
    newValue: string,
    fontSize: number,
    textColor: string,
  }
}

type ChangeFontSizeAction = {
  type: ActionType.CHANGE_FONT_SIZE,
  payload: {
    id: string,
    newSize: number,
  }
}

type ChangeFontFamilyAction = {
  type: ActionType.CHANGE_FONT_FAMILY,
  payload: {
    id: string,
    newFontFamily: string,
  }
}

type ChangeFontColorAction = {
  type: ActionType.CHANGE_FONT_COLOR,
  payload: {
    id: string,
    newFontColor: string,
  }
}

type AddImageAction = {
  type: ActionType.ADD_IMAGE,
  payload: ImageObject
}

type DeleteObjectAction = {
  type: ActionType.DELETE_OBJECT
}

type ChangeBackgroundAction = {
  type: ActionType.CHANGE_BACKGROUND,
  payload: { 
    type: string, 
    value: string 
  }
}

type СhangeSlideIndexAction = {
  type: ActionType.CHANGE_SLIDE_INDEX,
  payload: {
    id: string,
    index: number
  }
}

type ChangeObjectPositionAction = {
  type: ActionType.CHANGE_OBJECT_POSITION,
  payload: { id: string, position: { x: number, y: number } }
}

type ChangeObjectSizeAction = {
  type: ActionType.CHANGE_OBJECT_SIZE,
  payload: { id: string; size: { width: number, height: number } }
}


type SetEditorAction = {
  type: ActionType.SET_EDITOR,
  payload: Editor
}

type RenamePresentationTitleAction = {
  type: ActionType.RENAME_PRESENTATION_TITLE,
  payload: {
    title: string
  }
}

type EditorAction =
  AddSlideAction |
  DeleteSlideAction |
  SetSelectionAction |
  DeselectSelectionAction |
  AddTextAction |
  EditTextObjectAction |
  ChangeFontSizeAction |
  ChangeFontFamilyAction |
  ChangeFontColorAction |
  AddImageAction |
  DeleteObjectAction |
  ChangeBackgroundAction |
  СhangeSlideIndexAction |
  ChangeObjectPositionAction |
  ChangeObjectSizeAction |
  SetEditorAction |
  RenamePresentationTitleAction

export { ActionType }
export type {
  AddSlideAction,
  DeleteSlideAction,
  SetSelectionAction,
  DeselectSelectionAction,
  AddTextAction,
  EditTextObjectAction,
  ChangeFontSizeAction,
  ChangeFontFamilyAction,
  ChangeFontColorAction,
  AddImageAction,
  DeleteObjectAction,
  ChangeBackgroundAction,
  СhangeSlideIndexAction,
  ChangeObjectPositionAction,
  ChangeObjectSizeAction,
  SetEditorAction,
  RenamePresentationTitleAction,
  EditorAction
}

